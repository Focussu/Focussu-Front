import React from "react";
import Image from "next/image";

export default function MyRanking() {
  return (
    <div className="w-full flex flex-col justify-center items-center mt-[10px]">
      <Image
        className="dark:invert"
        src="/Challenger.svg"
        alt="Personal Ranking"
        width={220}
        height={200}
        priority
      />
      <div className="w-full flex flex-col justify-center items-center">
        <div className="text-[16px] font-semibold">이번주 총 공부시간</div>
        <div className="w-[170px] border-t ml-[20px] mb-[10px] mt-[3px]"></div>
        <div className="flex flex-row justify-center gap-[30px]">
          <div>현재 랭킹 : 15등</div>
          <div>(상위 0.00001%)</div>
        </div>
      </div>
    </div>
  );
}
