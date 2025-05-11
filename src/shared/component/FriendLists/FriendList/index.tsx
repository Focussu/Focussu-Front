import React from "react";

export default function FriendList() {
  return (
    <div className="w-full h-full border-b flex flex-row items-center py-[15px]">
      <div className="w-[60px] h-[50px] mx-[10px] bg-gray-400 rounded-lg"></div>
      <div className="flex justify-between w-full">
        <div className="flex flex-row gap-[20px]">
          <div className="text-[15px] font-semibold">19학번</div>
          <div className="w-[80px] h-[25px] text-[10px] rounded-lg border-1 border-gray-400 justify-center flex items-center">
            ✅ 현재 활동 중
          </div>
        </div>
        <div className="w-[40px] h-[25px] text-[10px] mr-[30px] rounded-lg  bg-[#E6E6E6] justify-center flex items-center">
          채팅
        </div>
      </div>
    </div>
  );
}
