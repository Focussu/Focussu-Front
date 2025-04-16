"use client";

import React from "react";
import { useEffect, useRef } from "react";
import { initCam, captureCam } from "@/shared/hook/useGetWebCam";

export default function IndivGroupStudy() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    initCam(videoRef);
    captureCam(videoRef, imgRef);
  }, []);

  return (
    <div className="bg-white w-[1380px] h-[640px] p-[65px] rounded-lg">
      <div className="flex flex-row gap-[50px]">
        <video
          ref={videoRef}
          autoPlay
          muted
          className="w-[810px] h-[510px] border-1 bg-gray-500"
        ></video>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col">
            <div className="flex flex-row gap-[30px] mb-[15px]">
              <div className="text-[24px] font-bold">오승민</div>
              <div className="w-[80px] h-[25px] text-[10px] rounded-lg border-1 border-gray-400 justify-center flex items-center mt-[5px]">
                ✅ 현재 활동 중
              </div>
            </div>
            <div className="flex flex-col gap-[7px]">
              <div className="text-[13px]">금주 집중시간 : 32h 29m 31s</div>
              <div className="text-[13px]">오늘 집중시간 : 2h 30m 20s</div>
              <div className="text-[13px]">현재 집중도 : 87점</div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="font-bold text-[15px] mt-[16px] ml-[10px]">
              오승민 님의 공부 습관 분석지
            </div>
            <div className="w-[390px] border-t-1 mt-[10px]"></div>
            <img
              ref={imgRef}
              className="w-[390px] h-[254px] bg-[#E0E0E0] mt-[20px] rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
