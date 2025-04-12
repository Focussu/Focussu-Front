import React from "react";

export default function UserProfile() {
  return (
    <div className="bg-white border-0 rounded-lg w-[420px] h-[225px]">
      <div className="flex justify-center gap-[30px] pt-[50px] pl-[30px] pr-[30px]">
        <div className="bg-gray-500 rounded-lg w-[125px] h-[125px]"></div>
        <div className="flex flex-col">
          <div className="text-[24px] font-semibold">오승민</div>
          <div className="text-[13px] text-gray-600 mt-[10px] mb-[5px]">
            총 집중시간 : 10293h 29m 31s
          </div>
          <div className="text-[13px] text-gray-600 mb-[10px]">
            금주 집중시간 : 12h 30m 20s
          </div>
          <div className="flex flex-row justify-center gap-[20px]">
            <div className="w-[80px] h-[25px] text-[10px] rounded-lg bg-gray-400 flex justify-center items-center text-">
              내 상태 설정하기
            </div>
            <div className="w-[80px] h-[25px] text-[10px] rounded-lg border-1 border-gray-400 justify-center flex items-center ">
              ✅ 현재 활동 중
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
