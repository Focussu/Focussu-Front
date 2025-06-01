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

      <div className="flex w-full justify-center items-start mt-4">
        <div>
          <div className="flex ml-[28px] mb-1">
            {months.map((month, idx) => (
              <div
                key={idx}
                className="w-[14px] h-[14px] mr-[60px] text-[10px] text-gray-500 text-center"
              >
                {month}
              </div>
            ))}
          </div>

          <div className="flex">
            <div className="flex flex-col justify-between h-[115px] mr-[5px] text-[10px] text-gray-500">
              {weekdayLabels.map((label, idx) => (
                <div key={idx} className="h-[14px]">
                  {label}
                </div>
              ))}
            </div>

            {columns.map((week, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-[3px] mr-[3px]">
                {week.map((date, rowIdx) => {
                  const formatted = format(date, "yyyy-MM-dd");
                  const minutes = dateToMinutes[formatted] || 0;
                  const hour = Math.floor(minutes / 60);
                  const min = minutes % 60;
                  const label = `${formatted} • ${hour}시간 ${min}분`;

                  return (
                    <div
                      key={rowIdx}
                      className={`w-[14px] h-[14px] rounded-[2px] ${getColor(
                        getLevel(minutes)
                      )} relative group`}
                    >
                      <div
                        className="absolute -top-[42px] left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-[6px] bg-black text-white text-[12px] rounded-md opacity-0 group-hover:opacity-100 z-50 pointer-events-none"
                        style={{ transition: "opacity 0.1s ease-in-out" }}
                      >
                        {label}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="ml-6 mt-2">
          <div className="flex flex-col gap-2 mt-2">
            {yearOptions.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-3 py-1 rounded border text-sm font-medium ${
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
    </div>
  );
}
