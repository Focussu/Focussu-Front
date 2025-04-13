import React from "react";

export default function RoomMember() {
  return (
    <div className="w-[420px] h-[225px] rounded-lg bg-white flex flex-col justify-center items-center">
      <div className="mt-[15px] w-[260px] h-[160px] bg-gray-500"></div>
      <div className="w-[260px] flex flex-row justify-between mt-[10px] mb-[10px]">
        <div className="flex flex-row gap-[12px] items-center justify-center">
          <div className="text-[15px] font-semibold">오승민</div>
          <div className="text-[13px]">2h 30m 20s</div>
        </div>
        <div className="w-[80px] h-[25px] text-[10px] rounded-lg border-1 border-gray-400 justify-center flex items-center ">
          ✅ 현재 활동 중
        </div>
      </div>
    </div>
  );
}
