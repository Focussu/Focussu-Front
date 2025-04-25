"use client";

import React from "react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { initCam } from "@/shared/hook/useGetWebCam";

export default function MyRoom() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    initCam(videoRef);
  }, []);

  return (
    <Link
      href="/studyroom/1/1"
      className="w-[415px] h-[225px] rounded-lg bg-white flex flex-col justify-center items-center"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        className="mt-[15px] max-w-[260px] max-h-[160px]"
      ></video>
      <div className="w-[260px] flex flex-row justify-between mt-[10px] mb-[10px]">
        <div className="flex flex-row gap-[12px] items-center justify-center">
          <div className="text-[15px] font-semibold">오승민</div>
          <div className="text-[13px]">2h 30m 20s</div>
        </div>
        <div className="w-[80px] h-[25px] text-[10px] rounded-lg border-1 border-gray-400 justify-center flex items-center ">
          ✅ 현재 활동 중
        </div>
      </div>
    </Link>
  );
}
