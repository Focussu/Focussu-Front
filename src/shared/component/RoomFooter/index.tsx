"use client";

import React from "react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RoomFooter() {
  const router = useRouter();

  const [isPause, setIsPause] = useState<boolean>(false);

  // 임시 함수
  const handlePlay = (): void => setIsPause((prev) => !prev);

  return (
    <div className="w-full bg-[#E0E0E0] h-[125px] flex items-center justify-center">
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
            <div className="text-[15px] font-bold">오승민</div>
            <div className="w-[80px] h-[22px] text-[10px] rounded-lg border-1 border-gray-400 justify-center flex items-center ">
              ✅ 현재 활동 중
            </div>
          </div>
          <div className="flex h-full mx-[10px] mt-[5px]">
            <div className="flex-1 flex flex-col gap-[5px]">
              <div className="text-[13px]">총 집중시간 : 10293h 29m 31s</div>
              <div className="text-[13px]">금주 집중시간 : 12h 30m 20s</div>
            </div>
            <div className="flex-1 flex flex-col gap-[5px] ml-[20px]">
              <div className="text-[13px]">오늘 집중시간 : 2h 30m 20s</div>
              <div className="text-[13px]">현재 집중도 : 87점</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
