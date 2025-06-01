"use client";

import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { initCam } from "@/shared/hook/function/useGetWebCam";
import { useUserStore } from "@/shared/store/setUserStore";

import { TodayStudyTime } from "@/shared/type/forAPI/StudyType";
import { FindTodayStudyTime } from "@/shared/hook/api/useStudyPart";
import { formatDate } from "@/shared/util/formatDate";

export default function MyRoom({ stream }: { stream: MediaStream | null }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { user } = useUserStore();

  useEffect(() => {
    initCam(videoRef);
  }, []);

  const { data: todayTime } = useQuery<TodayStudyTime>({
    queryKey: ["Today-Study-Time"],
    queryFn: () => FindTodayStudyTime(),
    staleTime: 5 * 1000,
  });

  return (
    <Link
      href="/studyroom/1/1"
      className="w-full aspect-[415/225] rounded-lg bg-white flex flex-col justify-center items-center shadow-sm"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-[65%] h-[70%] mt-4 rounded-md object-cover bg-gray-500"
      ></video>
      <div className="w-[65%] flex justify-between mt-3 mb-4 text-sm">
        <div className="flex gap-3 items-center">
          <div className="font-semibold">{user?.name}</div>
          {todayTime && (
            <div className="text-xs text-gray-600">
              {formatDate(todayTime.seconds)}
            </div>
          )}
        </div>
        <div className="px-2 py-1 text-[10px] rounded border border-gray-400">
          ✅ 현재 활동 중
        </div>
      </div>
    </Link>
  );
}
