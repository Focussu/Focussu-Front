"use client";

import { startCam } from "@/shared/hook/function/useGetWebCam";
import { useEffect, useRef, useState } from "react";

type PeerRef = {
  peer: RTCPeerConnection;
  stream: MediaStream;
};

export function useWebRTCManager(
  roomId: string,
  userId: string,
  socketUrl: string
) {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<
    { id: string; stream: MediaStream }[]
  >([]);
  const peersRef = useRef<Record<string, PeerRef>>({});
  const socketRef = useRef<WebSocket | null>(null);
  const hasSocketOpened = useRef(false);

  useEffect(() => {
    const setup = async () => {
      try {
        // 🎥 1. 스트림 먼저 시작
        const { stream } = await startCam();
        setLocalStream(stream);

        // 🔌 2. WebSocket 연결
        const socket = new WebSocket(
          `${socketUrl}?token=${localStorage.getItem("token")}`
        );
        socketRef.current = socket;

        console.log("WebSocket에 연결 시도");

        socket.onopen = () => {
          hasSocketOpened.current = true;
          console.log("WebSocket 연결 완료");

          socket.send(
            JSON.stringify({
              type: "JOIN",
              roomId,
            })
          );
        };

        socket.onmessage = async (event) => {
          const msg = JSON.parse(event.data);

          switch (msg.type) {
            case "JOINED":
              console.log("Join message : ", msg);
              msg.payload.peers.forEach(async (peerId: string) => {
                const peer = createPeer(peerId);
                peersRef.current[peerId] = { peer, stream: new MediaStream() };

                stream.getTracks().forEach((track) => {
                  peer.addTrack(track, stream);
                });

                const offer = await peer.createOffer();
                await peer.setLocalDescription(offer);
                socket.send(
                  JSON.stringify({
                    type: "OFFER",
                    roomId,
                    to: peerId,
                    payload: { offer: peer.localDescription },
                  })
                );
              });
              break;

            case "NEW_PEER":
              const peerId = msg.payload.from;
              const newPeer = createPeer(peerId);
              peersRef.current[peerId] = {
                peer: newPeer,
                stream: new MediaStream(),
              };
              stream.getTracks().forEach((track) => {
                newPeer.addTrack(track, stream);
              });
              break;

            case "OFFER":
              const from = msg.payload.from;
              console.log("Offer message : ", msg);

              const incomingPeer = createPeer(from);
              peersRef.current[from] = {
                peer: incomingPeer,
                stream: new MediaStream(),
              };
              stream.getTracks().forEach((track) => {
                incomingPeer.addTrack(track, stream);
              });
              await incomingPeer.setRemoteDescription(
                new RTCSessionDescription(msg.payload.offer)
              );
              const answer = await incomingPeer.createAnswer();
              await incomingPeer.setLocalDescription(answer);
              socket.send(
                JSON.stringify({
                  type: "ANSWER",
                  roomId,
                  to: from,
                  payload: { answer: incomingPeer.localDescription },
                })
              );
              break;

            case "ANSWER":
              console.log("Answer message : ", msg);
              await peersRef.current[
                msg.payload.from
              ]?.peer.setRemoteDescription(
                new RTCSessionDescription(msg.payload.answer)
              );
              break;

            case "CANDIDATE":
              console.log("Candidate message : ", msg);
              await peersRef.current[msg.payload.from]?.peer.addIceCandidate(
                new RTCIceCandidate(msg.payload.candidate)
              );
              break;

            case "PEER_LEFT":
              console.log("Peer_LEFT message : ", msg);
              const peerLeft = msg.payload.from;
              peersRef.current[peerLeft]?.peer.close();
              delete peersRef.current[peerLeft];
              setRemoteStreams((prev) => prev.filter((s) => s.id !== peerLeft));
              break;
          }
        };
      } catch (err) {
        console.error("초기화 실패", err);
      }
    };

    setup();
  }, [roomId, socketUrl]);

  const createPeer = (peerId: string) => {
    const peer = new RTCPeerConnection();

    console.log("Create Peer : ", peer);

    peer.onicecandidate = (e) => {
      console.log("I'm in ice-Candidate");

      if (e.candidate) {
        socketRef.current?.send(
          JSON.stringify({
            type: "CANDIDATE",
            roomId,
            to: peerId,
            payload: { candidate: e.candidate },
          })
        );
      }
    };

    peer.ontrack = (e) => {
      console.log("I'm on Track");

      const incoming = e.streams[0];
      setRemoteStreams((prev) => {
        const exists = prev.some((s) => s.id === peerId);
        if (exists) return prev;
        return [...prev, { id: peerId, stream: incoming }];
      });
    };

    return peer;
  };

  const leaveRoom = () => {
    console.log("I will leave...");

    if (!hasSocketOpened.current) return;
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: "LEAVE", roomId }));
    }

    Object.values(peersRef.current).forEach(({ peer }) => peer.close());
    peersRef.current = {};
    setRemoteStreams([]);
    localStream?.getTracks().forEach((t) => t.stop());
    socketRef.current?.close();
  };

  return {
    localStream,
    remoteStreams,
    leaveRoom,
  };
}
