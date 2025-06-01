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
  const pendingCandidates = useRef<Record<string, RTCIceCandidate[]>>({});
  const socketRef = useRef<WebSocket | null>(null);
  const hasSocketOpened = useRef(false);

  useEffect(() => {
    const setup = async () => {
      try {
        const { stream } = await startCam();
        setLocalStream(stream);

        const socket = new WebSocket(
          `${socketUrl}?token=${localStorage.getItem("token")}`
        );
        socketRef.current = socket;

        socket.onopen = () => {
          hasSocketOpened.current = true;
          socket.send(JSON.stringify({ type: "JOIN", roomId }));
        };

        socket.onmessage = async (event) => {
          const msg = JSON.parse(event.data);

          switch (msg.type) {
            case "NEW_PEER": {
              const peerId = msg.payload.from;
              if (peersRef.current[peerId]) return;

              const peer = createPeer(peerId);
              peersRef.current[peerId] = { peer, stream: new MediaStream() };
              stream
                .getTracks()
                .forEach((track) => peer.addTrack(track, stream));

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
              break;
            }

            case "TICKET_CREATED": {
              const from = msg.payload;
              console.log(from);

              sessionStorage.setItem("ticketNumber", from.ticketId);
            }

            case "OFFER": {
              const from = msg.payload.from;
              const peer = createPeer(from);
              peersRef.current[from] = { peer, stream: new MediaStream() };
              stream
                .getTracks()
                .forEach((track) => peer.addTrack(track, stream));

              await peer.setRemoteDescription(
                new RTCSessionDescription(msg.payload.offer)
              );
              const answer = await peer.createAnswer();
              await peer.setLocalDescription(answer);
              socket.send(
                JSON.stringify({
                  type: "ANSWER",
                  roomId,
                  to: from,
                  payload: { answer: peer.localDescription },
                })
              );

              if (pendingCandidates.current[from]) {
                for (const c of pendingCandidates.current[from]) {
                  await peer.addIceCandidate(c);
                }
                delete pendingCandidates.current[from];
              }

              break;
            }

            case "ANSWER": {
              const from = msg.payload.from;
              const peer = peersRef.current[from]?.peer;
              if (!peer) {
                console.warn("Peer not found for ANSWER:", from);
                return;
              }

              await peer.setRemoteDescription(
                new RTCSessionDescription(msg.payload.answer)
              );

              if (pendingCandidates.current[from]) {
                for (const c of pendingCandidates.current[from]) {
                  await peer.addIceCandidate(c);
                }
                delete pendingCandidates.current[from];
              }

              break;
            }

            case "CANDIDATE": {
              const from = msg.payload.from;
              const candidate = new RTCIceCandidate(msg.payload.candidate);
              const peer = peersRef.current[from]?.peer;

              if (peer?.remoteDescription) {
                await peer.addIceCandidate(candidate);
              } else {
                if (!pendingCandidates.current[from]) {
                  pendingCandidates.current[from] = [];
                }
                pendingCandidates.current[from].push(candidate);
              }

              break;
            }

            case "PEER_LEFT": {
              const peerLeft = msg.payload.from;
              peersRef.current[peerLeft]?.peer.close();
              delete peersRef.current[peerLeft];
              setRemoteStreams((prev) => prev.filter((s) => s.id !== peerLeft));
              break;
            }
          }
        };
      } catch (err) {
        console.error("초기화 실패", err);
      }
    };

    setup();
  }, [roomId, socketUrl]);

  const createPeer = (peerId: string) => {
    const peer = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
        { urls: "stun:stun2.l.google.com:19302" },
        { urls: "stun:stun3.l.google.com:19302" },
        { urls: "stun:stun4.l.google.com:19302" },
      ],
    });

    peer.onicecandidate = (e) => {
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
      const incoming = e.streams[0];

      if (peerId === userId) return;

      setRemoteStreams((prev) => {
        const exists = prev.some((s) => s.id === peerId);
        if (exists) return prev;
        return [...prev, { id: peerId, stream: incoming }];
      });
    };

    return peer;
  };

  const leaveRoom = () => {
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
