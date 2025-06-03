"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { initCam } from "@/shared/hook/function/useGetWebCam";
import { useUserStore } from "@/shared/store/setUserStore";
import { useElapsedTime } from "@/shared/context/ElapsedContext";

import { TodayStudyTime } from "@/shared/type/forAPI/StudyType";
import { FindTodayStudyTime } from "@/shared/hook/api/useStudyPart";
import { formatDate } from "@/shared/util/formatDate";

export default function MyRoom({ stream }: { stream: MediaStream | null }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { user } = useUserStore();
  const { elapsedTime } = useElapsedTime();

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
      className="w-full max-w-[420px] aspect-[16/10] rounded-2xl bg-white shadow-md hover:shadow-lg transition-all duration-200 flex flex-col justify-between items-center overflow-hidden"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full h-[75%] object-cover bg-gray-300"
      />

      <div className="w-full px-4 py-3 flex items-center justify-center">
        <div className="flex flex-col">
          <span className="font-semibold text-lg text-gray-900 mr-4">
            {user?.name}
          </span>
        </div>
        {todayTime && "seconds" in todayTime && (
          <span className="text-base text-gray-500 mt-[2px] mr-10">
            {formatDate(todayTime.seconds + elapsedTime)}
          </span>
        )}
        <div className="text-sm bg-green-100 text-green-700 px-3 py-[4px] rounded-full font-medium border border-green-300">
          ✅ 현재 활동 중
        </div>
      </div>
    </Link>
  );
}
