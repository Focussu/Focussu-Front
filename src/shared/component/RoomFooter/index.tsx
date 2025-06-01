"use client";

import React, { useEffect } from "react";
import Image from "next/image";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { useUserStore } from "@/shared/store/setUserStore";

import { formatDate } from "@/shared/util/formatDate";
import {
  ThisWeekStudyTime,
  TodayStudyTime,
  TotalStudyTime,
} from "@/shared/type/forAPI/StudyType";
import {
  FindThisWeekStudyTime,
  FindTodayStudyTime,
  FindTotalStudyTime,
} from "@/shared/hook/api/useStudyPart";
import { useAnalyzeAI } from "@/shared/context/analyzeAIContext";
import { captureCam } from "@/shared/hook/function/useGetWebCam";

interface RoomFooterProps {
  handleStartWebcam: () => void;
  handleStopWebcam: () => void;
  handleToggleDetection: () => void;
}

export default function RoomFooter({
  handleStartWebcam,
  handleStopWebcam,
  handleToggleDetection,
}: RoomFooterProps) {
  const router = useRouter();
  const [isPause, setIsPause] = useState<boolean>(false);
  const [isFlag, setIsFlag] = useState<boolean>(false);

  const { user } = useUserStore();
  const value = useAnalyzeAI();

  useEffect(() => {
    captureCam(value.videoRef, value.imgRef, isPause, isFlag);
  }, [isPause, isFlag]);

  const { data: totalTime } = useQuery<TotalStudyTime>({
    queryKey: ["Total-Study-Time"],
    queryFn: () => FindTotalStudyTime(),
    staleTime: 5 * 1000,
  });

  const { data: thisWeekTime } = useQuery<ThisWeekStudyTime>({
    queryKey: ["This-Week-Time"],
    queryFn: () => FindThisWeekStudyTime(),
    staleTime: 5 * 1000,
  });

  const { data: todayTime } = useQuery<TodayStudyTime>({
    queryKey: ["Today-Study-Time"],
    queryFn: () => FindTodayStudyTime(),
    staleTime: 5 * 1000,
  });

  const handlePlay = (): void => {
    setIsPause((prev) => !prev);

    if (isPause) {
      handleStopWebcam();
    } else {
      handleStartWebcam();
      handleToggleDetection();
    }
  };

  console.log(value.aiResponse);

  return (
    <div className="w-full bg-[#E0E0E0] h-[125px] flex items-center justify-center z-">
      {/* 가상 캔버스 생성 */}
      <video
        ref={value.videoRef}
        autoPlay
        playsInline
        muted
        className="fixed w-[1px] h-[1px] opacity-0 pointer-events-none"
        style={{ top: 0, left: 0 }}
      />

      <canvas
        ref={value.canvasRef}
        className="fixed w-[1px] h-[1px] opacity-0 pointer-events-none"
        style={{ top: 0, left: 0 }}
      />
      <img
        ref={value.imgRef}
        className="fixed w-[1px] h-[1px] opacity-0 pointer-events-none"
        style={{ top: 0, left: 0 }}
      />

      <div className="flex-1 h-full flex ml-[30px] justify-start items-center">
        <Image
          onClick={() => router.push("/")}
          className="dark:invert"
          src="/FocuSSUlogo.svg"
          alt="Next.js logo"
          width={200}
          height={85}
          priority
        />
      </div>
      <div className="flex-1 h-full flex justify-center items-center">
        <div
          className="flex bg-white w-[90px] h-[90px] rounded-full justify-center items-center hover:opacity-50"
          onClick={() => handlePlay()}
        >
          {isPause ? (
            <Image
              className="dark:invert"
              src="/PauseButton.svg"
              alt="Pause Button"
              width={45}
              height={45}
              priority
            />
          ) : (
            <Image
              className="dark:invert ml-[7px]"
              src="/PlayButton.svg"
              alt="Play Button"
              width={45}
              height={45}
              priority
            />
          )}
        </div>
      </div>
      <div className="flex-1 h-full mr-[30px] flex justify-end items-center">
        <div className="w-[380px] h-[90px] border-[1.5] bg-white flex flex-col rounded-lg">
          <div className="flex flex-row gap-[20px] ml-[12px] mt-[7px]">
            <div className="text-[15px] font-bold">{user?.name}</div>
            <div className="w-[80px] h-[22px] text-[10px] rounded-lg border-1 border-gray-400 justify-center flex items-center ">
              ✅ 현재 활동 중
            </div>
          </div>
          <div className="flex h-full mx-[10px] mt-[5px]">
            <div className="flex-1 flex flex-col gap-[5px]">
              {totalTime && (
                <div className="text-[13px]">
                  총 집중시간 : {formatDate(totalTime.seconds)}
                </div>
              )}
              {thisWeekTime && (
                <div className="text-[13px]">
                  금주 집중시간 : {formatDate(thisWeekTime.seconds)}
                </div>
              )}
            </div>
            <div className="flex-1 flex flex-col gap-[5px] ml-[20px]">
              {todayTime && (
                <div className="text-[13px]">
                  오늘 집중시간 : {formatDate(todayTime.seconds)}
                </div>
              )}
              <div className="text-[13px]">
                현재 집중도 :
                {value.aiResponse?.confidence
                  ? Math.round(Number(value.aiResponse.confidence) * 10000) /
                    100
                  : 0}
                점
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
