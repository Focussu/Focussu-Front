"use client";

import React, { useEffect, useRef } from "react";
import { initCam, captureCam } from "@/shared/hook/useGetWebCam";

export default function IndivGroupStudy() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    initCam(videoRef);
    captureCam(videoRef, imgRef);
  }, []);

  return (
    <div className="bg-white w-full h-full rounded-lg p-4 md:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row gap-6 w-full h-full">
        <div className="w-full lg:w-2/3">
          <video
            ref={videoRef}
            autoPlay
            muted
            className="w-full aspect-video bg-gray-500 rounded-md object-cover"
          />
        </div>

        <div className="flex flex-col justify-between w-full lg:w-1/3">
          <div>
            <div className="flex flex-wrap gap-3 items-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold">오승민</h2>
              <span className="px-2 py-1 text-xs sm:text-sm rounded-md border border-gray-400">
                ✅ 현재 활동 중
              </span>
            </div>
            <div className="space-y-1 text-sm sm:text-base">
              <p>금주 집중시간 : 32h 29m 31s</p>
              <p>오늘 집중시간 : 2h 30m 20s</p>
              <p>현재 집중도 : 87점</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-sm sm:text-base mb-2">
              오승민 님의 공부 습관 분석지
            </h3>
            <hr className="border-gray-300 mb-4" />
            <img
              ref={imgRef}
              className="w-full aspect-video bg-gray-200 rounded-md object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
