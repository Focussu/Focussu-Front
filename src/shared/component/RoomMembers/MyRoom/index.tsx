"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { initCam } from "@/shared/hook/function/useGetWebCam";

export default function MyRoom() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const token = localStorage.getItem("token");

  const SIGNAL_SERVER = `${process.env.NEXT_PUBLIC_SIGNAL_SERVER_URL}?token=${token}`;

  useEffect(() => {
    initCam(videoRef);

    const socket = new WebSocket(SIGNAL_SERVER);

    socket.onopen = () => {
      console.log("✅ WebSocket 연결됨");
    };

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      console.log("📩 받은 메시지:", msg);
    };

    socket.onclose = () => {
      console.log("❌ 연결 종료됨");
    };
  }, []);

  return (
    <Link
      href="/studyroom/1/1"
      className="w-full aspect-[415/225] rounded-lg bg-white flex flex-col justify-center items-center shadow-sm"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        className="w-[65%] h-[70%] mt-4 rounded-md object-cover bg-gray-500"
      ></video>
      <div className="w-[65%] flex justify-between mt-3 mb-4 text-sm">
        <div className="flex gap-3 items-center">
          <div className="font-semibold">오승민</div>
          <div className="text-xs text-gray-600">2h 30m 20s</div>
        </div>
        <div className="px-2 py-1 text-[10px] rounded border border-gray-400">
          ✅ 현재 활동 중
        </div>
      </div>
    </Link>
  );
}
