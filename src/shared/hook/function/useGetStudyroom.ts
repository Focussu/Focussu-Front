"use client";

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

  useEffect(() => {
    initWebSocket();
    return () => leaveRoom(); // 클린업 시 퇴장
  }, []);

  const initWebSocket = () => {
    const socket = new WebSocket(
      `${socketUrl}?token=${localStorage.getItem("token")}`
    );
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("✅ WS connected");
      joinRoom();
    };

    socket.onmessage = async (event) => {
      const msg = JSON.parse(event.data);

      switch (msg.type) {
        case "JOINED":
          msg.payload.peers.forEach(async (peerId: string) => {
            const peer = createPeer(peerId);
            peersRef.current[peerId] = { peer, stream: new MediaStream() };

            localStream?.getTracks().forEach((track) => {
              peer.addTrack(track, localStream);
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

          localStream?.getTracks().forEach((track) => {
            newPeer.addTrack(track, localStream);
          });
          break;

        case "OFFER":
          const from = msg.payload.from;
          const incomingPeer = createPeer(from);
          peersRef.current[from] = {
            peer: incomingPeer,
            stream: new MediaStream(),
          };

          localStream?.getTracks().forEach((track) => {
            incomingPeer.addTrack(track, localStream);
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
          await peersRef.current[msg.payload.from]?.peer.setRemoteDescription(
            new RTCSessionDescription(msg.payload.answer)
          );
          break;

        case "CANDIDATE":
          await peersRef.current[msg.payload.from]?.peer.addIceCandidate(
            new RTCIceCandidate(msg.payload.candidate)
          );
          break;

        case "PEER_LEFT":
          const peerLeft = msg.payload.from;
          peersRef.current[peerLeft]?.peer.close();
          delete peersRef.current[peerLeft];
          setRemoteStreams((prev) => prev.filter((s) => s.id !== peerLeft));
          break;
      }
    };
  };

  const createPeer = (peerId: string) => {
    const peer = new RTCPeerConnection();

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
      setRemoteStreams((prev) => {
        const exists = prev.some((s) => s.id === peerId);
        if (exists) return prev;
        return [...prev, { id: peerId, stream: incoming }];
      });
    };

    return peer;
  };

  const joinRoom = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setLocalStream(stream);

    socketRef.current?.send(
      JSON.stringify({
        type: "JOIN",
        roomId,
      })
    );
  };

  const leaveRoom = () => {
    socketRef.current?.send(
      JSON.stringify({
        type: "LEAVE",
        roomId,
      })
    );

    Object.values(peersRef.current).forEach(({ peer }) => peer.close());
    peersRef.current = {};
    setRemoteStreams([]);
    localStream?.getTracks().forEach((t) => t.stop());
    socketRef.current?.close();
  };

  return {
    localStream,
    remoteStreams,
    joinRoom,
    leaveRoom,
  };
}
