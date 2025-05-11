import React from "react";

export default function CurrentStudyList() {
  return (
    <div className="w-full max-w-[clamp(320px,50vw,740px)] flex flex-col text-[clamp(16px,1.5vw,24px)] gap-[clamp(4px,1vw,10px)]">
      <div className="text-black font-semibold">UMC Workbook Study</div>
      <div className="text-gray-400 truncate">
        이번 8기 진행하시는 분들 급하게 구합니다 ㅜ...
      </div>
      <div className="text-gray-500 mb-[clamp(24px,4vw,48px)]">
        총 인원 : 1/30
      </div>
    </div>
  );
}
