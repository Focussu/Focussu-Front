import React from "react";

export default function RecommendList() {
  return (
    <div className="flex flex-col w-[clamp(200px,25vw,405px)]">
      <div className="w-full aspect-square bg-zinc-400 rounded" />
      <div className="text-[clamp(18px,2vw,24px)] font-bold mt-[clamp(16px,2vw,24px)] mb-[5px]">
        JavaScript 같이 공부해요
      </div>
      <div className="text-[clamp(14px,1.6vw,20px)] text-zinc-400">
        총 인원 : 45 / 50
      </div>
      <div className="text-[clamp(14px,1.6vw,20px)] text-zinc-400">
        평균 집중점수 : 76.2점
      </div>
    </div>
  );
}
