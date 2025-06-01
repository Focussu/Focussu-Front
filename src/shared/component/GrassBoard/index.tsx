"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

import { format, subDays, startOfWeek, isSameDay } from "date-fns";
import { DailyTimeResponse } from "@/shared/type/forAPI/StudyType";
import { FindMyDailyTime } from "@/shared/hook/api/useStudyPart";

const today = new Date();
const totalDays = 7 * 53;
const startDate = subDays(today, totalDays - 1);
const allDates = Array.from({ length: totalDays }, (_, i) =>
  subDays(today, totalDays - 1 - i)
);

const dummyData = allDates.map(() => Math.floor(Math.random() * 5));

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

export default function GrassBoard() {
  const { data: dailyTime } = useQuery<DailyTimeResponse>({
    queryKey: ["My-Daily-Time"],
    queryFn: () => FindMyDailyTime(),
    staleTime: 5 * 1000,
  });

  console.log(dailyTime);

  const columns = Array.from({ length: 53 }, (_, colIdx) => {
    return allDates.slice(colIdx * 7, (colIdx + 1) * 7);
  });

  const monthLabels: Record<number, string> = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
  };

  const weekdayLabels = ["Mon", "Wed", "Fri"];

  return (
    <div className="bg-white border-0 rounded-lg w-full h-full flex flex-col items-center px-[10px]">
      <div className="w-full font-bold text-[15px] mt-[16px] ml-[25px] flex justify-start">
        나의 집중 잔디
      </div>
      <div className="w-full border-t-1 mt-[10px] mx-[18px]" />

      <div className="w-full flex items-center justify-center mt-[15px] ml-[30px]">
        <div className="w-[28px]" />
        {columns.map((days, colIdx) => {
          const firstDay = days[0];
          const showMonth = colIdx === 0 || firstDay.getDate() <= 7;
          return (
            <div
              key={colIdx}
              className="w-[14px] h-[14px] mr-[3px] text-[10px] text-gray-500 text-center"
            >
              {showMonth ? monthLabels[firstDay.getMonth()] : ""}
            </div>
          );
        })}
      </div>

      <div className="w-full flex items-center justify-center mt-[5px]">
        <div className="flex flex-col justify-between h-[100px] mr-[5px] text-[10px] text-gray-500">
          {weekdayLabels.map((label, idx) => (
            <div key={idx} className="h-[14px]">
              {label}
            </div>
          ))}
        </div>

        {columns.map((week, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-[3px] mr-[3px]">
            {week.map((date, rowIdx) => (
              <div
                key={rowIdx}
                className={`w-[14px] h-[14px] rounded-[2px] ${getColor(
                  dummyData[colIdx * 7 + rowIdx] || 0
                )}`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* <div className="w-full justify-items-end">
        <div className="text-[10px] text-gray-500 mt-2 flex gap-2">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((lv) => (
            <div
              key={lv}
              className={`w-[11px] h-[11px] ${getColor(lv)} rounded-[2px]`}
            ></div>
          ))}
          <span>More</span>
        </div>
      </div> */}
    </div>
  );
}
