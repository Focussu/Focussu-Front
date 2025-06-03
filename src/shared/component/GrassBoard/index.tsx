"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format, subDays } from "date-fns";
import { DailyTimeResponse } from "@/shared/type/forAPI/StudyType";
import { FindMyDailyTime } from "@/shared/hook/api/useStudyPart";

const getLevel = (minutes: number): number => {
  if (minutes === 0) return 0;
  if (minutes <= 30) return 1;
  if (minutes <= 60) return 2;
  if (minutes <= 90) return 3;
  return 4;
};

const getColor = (level: number): string => {
  switch (level) {
    case 0:
      return "bg-[#ebedf0]";
    case 1:
      return "bg-[#9be9a8]";
    case 2:
      return "bg-[#40c463]";
    case 3:
      return "bg-[#30a14e]";
    case 4:
      return "bg-[#216e39]";
    default:
      return "bg-[#ebedf0]";
  }
};

const yearOptions = [2025, 2024, 2023];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const weekdayLabels = ["Mon", "Wed", "Fri", "Sun"];

export default function GrassBoard() {
  const [selectedYear, setSelectedYear] = useState<number>(2025);

  const { data: dailyTime } = useQuery<DailyTimeResponse>({
    queryKey: ["My-Daily-Time", selectedYear],
    queryFn: () => FindMyDailyTime(),
    staleTime: 5 * 1000,
  });

  const today = new Date(`${selectedYear}-12-31`);
  const totalDays = 7 * 53;
  const allDates = Array.from({ length: totalDays }, (_, i) =>
    subDays(today, totalDays - 1 - i)
  );

  const dateToMinutes: Record<string, number> = {};
  dailyTime?.forEach(({ date, time }) => {
    dateToMinutes[date] = Math.floor(time / 1000 / 60);
  });

  const columns = Array.from({ length: 53 }, (_, colIdx) =>
    allDates.slice(colIdx * 7, (colIdx + 1) * 7)
  );

  return (
    <div className="bg-white border-0 rounded-lg w-full h-full flex flex-col items-center px-[10px] relative">
      <div className="w-full font-bold text-[15px] mt-[16px] ml-[25px] flex justify-start">
        나의 집중 잔디
      </div>
      <div className="w-full border-t-1 mt-[10px] mx-[18px]" />

      <div className="flex w-full justify-center items-start mt-2 overflow-x-auto">
        <div className="min-w-[700px]">
          {/* 월 이름 */}
          <div className="flex ml-[25px] mb-1 text-[10px] text-gray-500">
            {months.map((month, idx) => (
              <div key={idx} className="w-[11px] mr-[42px] text-center">
                {month}
              </div>
            ))}
          </div>

          <div className="flex">
            {/* 요일 라벨 */}
            <div className="flex flex-col justify-between h-[90px] mr-[5px] text-[9px] text-gray-500">
              {weekdayLabels.map((label, idx) => (
                <div key={idx} className="h-[12px] ">
                  {label}
                </div>
              ))}
            </div>

            {/* 잔디 그래프 */}
            {columns.map((week, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-[2px] mr-[2px]">
                {week.map((date, rowIdx) => {
                  const formatted = format(date, "yyyy-MM-dd");
                  const minutes = dateToMinutes[formatted] || 0;
                  const hour = Math.floor(minutes / 60);
                  const min = minutes % 60;
                  const label = `${formatted} • ${hour}시간 ${min}분`;

                  return (
                    <div
                      key={rowIdx}
                      className={`w-[11px] h-[11px] rounded-[1px] ${getColor(
                        getLevel(minutes)
                      )} relative group`}
                    >
                      <div className="absolute -top-[40px] left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-[4px] bg-black text-white text-[10px] rounded opacity-0 group-hover:opacity-100 z-50 pointer-events-none transition-opacity duration-100 ">
                        {label}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* 연도 선택 버튼 */}
        <div className="ml-3 mt-1 flex flex-col gap-1">
          {yearOptions.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-2 py-[2px] text-xs rounded border font-medium ${
                selectedYear === year
                  ? "bg-black text-white"
                  : "bg-white text-black border-gray-300"
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
