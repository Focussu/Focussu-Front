import React from "react";

export default function TodayFocusTime() {
  return (
    <div className="w-[788px] h-[441px] p-6 border rounded-lg bg-gray-50 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">이번주 총 집중 시간</h2>
      <p className="text-3xl font-bold mb-2">12h 30m 20s</p>
      <p className="text-sm text-gray-600 mb-1">
        지난주 보다 <span className="font-semibold">30m 12s</span> 더 많이
        공부했어요!
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-semibold">JS에 대해 알아보자 -</span> 에서 가장
        많이 공부했어요
      </p>
    </div>
  );
}
