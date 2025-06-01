import React from "react";
import Link from "next/link";

import { ForCallAllMyStudyrooms } from "@/shared/type/forAPI/RoomType";

export default function PersonalList({
  room,
}: {
  room: ForCallAllMyStudyrooms;
}) {
  return (
    <div className="w-full h-full border-b-1 flex flex-row pl-[10px] pr-[15px] pt-[15px] pb-[15px]">
      <img
        src={room?.profileImageUrl}
        alt="이미지 없음"
        className="w-[70px] h-[70px] bg-gray-400 rounded-lg"
      />
      <div className="flex justify-between w-full">
        <div className="flex flex-col ml-[20px]">
          <div className="font-medium text-[15px] mb-[10px]">{room?.name}</div>
          <div className="text-[12px] text-gray-600 mb-[3px]">
            {room?.description}
          </div>
          <div className="text-[12px] text-gray-800">
            정원 : {room?.maxCapacity}
          </div>
        </div>
        <div className="flex flex-col gap-[10px] mt-[10px]">
          <Link
            href={`/studyroom/${room?.id}`}
            className="bg-black text-white text-[10px] rounded-lg flex justify-center pl-[10px] pr-[10px] pt-[3px] pb-[3px]"
          >
            참여
          </Link>
          <div className="bg-gray-400 text-black text-[10px] rounded-lg flex justify-center pl-[10px] pr-[10px] pt-[3px] pb-[3px]">
            나가기
          </div>
        </div>
      </div>
    </div>
  );
}
