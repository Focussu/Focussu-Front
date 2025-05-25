"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { initCam } from "@/shared/hook/function/useGetWebCam";

export default function MyRoom() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    initCam(videoRef);
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
