import React from "react";

export default function RoomHeader() {
  return (
    <div className="w-full bg-[#E0E0E0] h-[75px] flex items-center justify-center">
      <div className="flex-1 ml-[30px]">
        <div className="bg-black text-white font-semibold w-[80px] h-[30px] flex justify-center items-center rounded-lg">
          돌아가기
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center text-[25px]">
        JavaScript 잡아라
      </div>
      <div className="flex-1 flex justify-end items-center mr-[30px]">
        <div className="w-[144px] h-[45px] flex justify-center items-center rounded-lg border-1 bg-white text-black">
          인원수 : 10 / 30
        </div>
      </div>
    </div>
  );
}
