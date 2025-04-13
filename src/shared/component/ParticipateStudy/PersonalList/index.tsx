import React from "react";

export default function PersonalList() {
  return (
    <div className="w-[390px] h-[100px] border-b-1 flex flex-row pl-[10px] pr-[15px] pt-[15px] pb-[15px]">
      <div className="w-[76px] h-[70px] bg-gray-400 rounded-lg"></div>
      <div className="flex justify-between w-full">
        <div className="flex flex-col ml-[20px]">
          <div className="font-medium text-[15px] mb-[10px]">
            JavaScript 잡아라
          </div>
          <div className="text-[10px] text-gray-600 mb-[5px]">
            총 집중시간 : 12h 1m 20s
          </div>
          <div className="text-[10px] text-gray-600">
            금주 집중시간 : 12h 1m 20s
          </div>
        </div>
        <div className="flex flex-col gap-[10px] mt-[10px]">
          <div className="bg-black text-white text-[10px] rounded-lg flex justify-center pl-[10px] pr-[10px] pt-[3px] pb-[3px]">
            참여
          </div>
          <div className="bg-gray-400 text-black text-[10px] rounded-lg flex justify-center pl-[10px] pr-[10px] pt-[3px] pb-[3px]">
            나가기
          </div>
        </div>
      </div>
    </div>
  );
}
