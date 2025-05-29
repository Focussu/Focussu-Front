"use client";

import { useQuery } from "@tanstack/react-query";

import { ThisWeekStudyTime } from "@/shared/type/forAPI/StudyType";

export default function TodayFocusTime() {
  return (
    <div className="w-full max-w-[clamp(800px,2.5vw,1200px)] aspect-[2/1] p-6 md:p-10 border-[3px] rounded-lg shadow-sm">
      <div className="bg-white border rounded-lg flex flex-col justify-center px-[clamp(24px,3vw,80px)] py-[clamp(24px,3vw,80px)]">
        <h2 className="text-[clamp(20px,2.5vw,30px)] font-bold mb-6">
          이번주 총 집중 시간
        </h2>
        <p className="text-[clamp(34px,3.5vw,52px)] font-extrabold mb-6 flex justify-center">
          12h 30m 20s
        </p>
        <p className="text-[clamp(16px,2.5vw,22px)] text-gray-600 flex justify-center mb-2">
          지난주 보다 30m 12s 더 많이 공부했어요!
        </p>
        <p className="text-[clamp(16px,2.5vw,22px)] text-gray-600 flex justify-center">
          JS에 대해 알아보자! - 에서 가장 많이 공부했어요
        </p>
      </div>
    </div>
  );
}
