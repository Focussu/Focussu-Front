import React from "react";
import Image from "next/image";

export default function MyRanking() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="relative w-[70px] h-[70px] sm:w-[130px] sm:h-[130px]">
        <Image
          className="object-contain"
          src="/Challenger.svg"
          alt="Personal Ranking"
          fill
          priority
        />
      </div>

      <div className="w-full flex flex-col justify-center items-center px-2">
        <div className="text-base sm:text-lg font-semibold text-center">
          이번주 총 공부시간
        </div>
        <div className="w-[120px] border-t border-gray-300 mt-2 mb-3" />
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-xs sm:text-sm">
          <div>현재 랭킹 : 15등</div>
          <div>(상위 0.00001%)</div>
        </div>
      </div>
    </div>
  );
}
