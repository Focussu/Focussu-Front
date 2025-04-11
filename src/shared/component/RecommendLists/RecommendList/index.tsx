import React from "react";
import MainImage from "../../MainImage";

export default function RecommendList() {
  return (
    <div className="flex flex-col">
      <MainImage />
      <div className="text-[24px] font-bold mt-[24px] mb-[5px]">
        JavaScript 같이 공부해요
      </div>
      <div className="text-[24px] text-zinc-400">총 인원 : 45 / 50</div>
      <div className="text-[24px] text-zinc-400">평균 집중점수 : 76.2점</div>
    </div>
  );
}
