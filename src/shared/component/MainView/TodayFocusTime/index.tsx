"use client";

import { FindThisWeekStudyTime } from "@/shared/hook/api/useStudyPart";
import { ThisWeekStudyTime } from "@/shared/type/forAPI/StudyType";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "@/shared/util/formatDate";

export default function TodayFocusTime() {
  const { data: weekTime, isLoading } = useQuery<ThisWeekStudyTime>({
    queryKey: ["This-Week-Time"],
    queryFn: () => FindThisWeekStudyTime(),
    staleTime: 5 * 1000,
  });

  if (isLoading || !weekTime || !("seconds" in weekTime)) return null;

  return (
    <div className="w-full max-w-[clamp(800px,2.5vw,1200px)] aspect-[2/1] p-6 md:p-10 border-[3px] rounded-lg shadow-sm">
      <div className="bg-white border rounded-lg flex flex-col justify-center px-[clamp(24px,3vw,80px)] py-[clamp(24px,3vw,80px)]">
        <h2 className="text-[clamp(20px,2.5vw,30px)] font-bold mb-6">
          {weekTime.seconds ? " " : "이번주 공부 시간"}
        </h2>

        <p className="text-[clamp(34px,3.5vw,52px)] font-extrabold mb-6 flex justify-center">
          {weekTime.seconds
            ? "아직 공부시간이 없어요!"
            : formatDate(weekTime.seconds)}
        </p>

        <p className="text-[clamp(16px,2.5vw,22px)] text-gray-600 flex justify-center mb-2">
          ---
        </p>
        <p className="text-[clamp(16px,2.5vw,22px)] text-gray-600 flex justify-center">
          지금 바로 시작해보세요!
        </p>
      </div>
    </div>
  );
}
