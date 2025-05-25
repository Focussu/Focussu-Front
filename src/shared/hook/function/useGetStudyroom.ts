"use client";

import { useEffect, useRef, useState } from "react";

const token = localStorage.getItem("token");

const SIGNAL_SERVER = `${process.env.NEXT_PUBLIC_SIGNAL_SERVER_URL}?token=${token}`;
const iceServers = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

interface PeerStream {
  type: string;
  roomId: string;
  payload: string;
}

export function useWebRTC(localStream: MediaStream | null) {
  const [peers, setPeers] = useState<PeerStream[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  const connections = useRef<Record<string, RTCPeerConnection>>({});

  useEffect(() => {
    if (!localStream) return;

    socketRef.current = new WebSocket(SIGNAL_SERVER);

    socketRef.current.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      const { from, type, offer, answer, candidate } = data;

      if (type === "join") {
        const pc = createPeerConnection(from);
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        sendMessage({ to: from, type: "answer", answer });
      }

      if (type === "answer") {
        await connections.current[from]?.setRemoteDescription(
          new RTCSessionDescription(answer)
        );
      }

      if (type === "ice" && candidate) {
        await connections.current[from]?.addIceCandidate(
          new RTCIceCandidate(candidate)
        );
      }
    };

    return () => {
      socketRef.current?.close();
    };
  }, [localStream]);

  const createPeerConnection = (id: string) => {
    const pc = new RTCPeerConnection(iceServers);

    localStream
      ?.getTracks()
      .forEach((track) => pc.addTrack(track, localStream));

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        sendMessage({ to: id, type: "ice", candidate: e.candidate });
      }
    };

    // pc.ontrack = (e) => {
    //   const stream = new MediaStream([e.track]);
    //   setPeers((prev) => [
    //     ...prev.filter((p) => p.id !== id),
    //     {
    //       id,
    //       name: `참가자 ${prev.length + 1}`,
    //       time: "00:10:00",
    //       stream,
    //     },
    //   ]);
    // };

    connections.current[id] = pc;
    return pc;
  };

  const sendMessage = (msg: any) => {
    socketRef.current?.send(JSON.stringify(msg));
  };

  const callUser = (id: string) => {
    const pc = createPeerConnection(id);
    pc.createOffer().then((offer) => {
      pc.setLocalDescription(offer);
      sendMessage({ to: id, type: "offer", offer });
    });
  };

  return { peers, callUser };
}
