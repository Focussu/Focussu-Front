"use client";

import React from "react";
import Image from "next/image";
import { useState } from "react";

export default function RoomFooter() {
  const [isPause, setIsPause] = useState<boolean>(false);

  // 임시 함수
  const handlePlay = (): void => setIsPause((prev) => !prev);

  return (
    <div className="w-full bg-[#E0E0E0] h-[125px] flex items-center justify-center">
      <div className="flex-1 h-full flex ml-[30px] justify-start items-center">
        <Image
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
      <div className="flex-1 h-full"></div>
    </div>
  );
}
