import React from "react";

export default function NewStudyList() {
  return (
    <div className="w-full max-w-[clamp(320px,50vw,740px)] flex flex-col text-[clamp(16px,1.5vw,24px)] gap-[clamp(4px,1vw,10px)]">
      <div className="text-black font-semibold">CS 마스터가 되어보자</div>
      <div className="text-gray-400 truncate">
        CS 먹는 연습 아니구요, 정말 Computer Sc...
      </div>
      <div className="text-gray-500 mb-[clamp(24px,4vw,48px)]">
        총 인원 : 2/40
      </div>
    </div>
  );
}
