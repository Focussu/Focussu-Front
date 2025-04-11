import React from "react";

export default function TodayFocusTime() {
  return (
    <div className="w-[788px] h-[441px] p-[40px] border-[3px] rounded-lg bg-gray-300 shadow-sm">
      <div className="bg-white border-[1px] rounded-lg flex flex-col ">
        <h2 className="text-[30px] font-bold pb-[33px] pl-[42px] pt-[37px]">
          이번주 총 집중 시간
        </h2>
        <p className="text-[52px] font-extrabold pb-[47px] flex justify-center">
          12h 30m 20s
        </p>
        <p className="text-[24px] text-gray-600 flex justify-center pb-[10px]">
          지난주 보다 30m 12s 더 많이 공부했어요!
        </p>
        <p className="text-[24px] text-gray-600 flex justify-center pb-[25px]">
          JS에 대해 알아보자! - 에서 가장 많이 공부했어요
        </p>
      </div>
    </div>
  );
}
