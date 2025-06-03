import React from "react";
import Link from "next/link";
import { ForCallAllMyStudyrooms } from "@/shared/type/forAPI/RoomType";

export default function PersonalList({
  room,
}: {
  room: ForCallAllMyStudyrooms;
}) {
  return (
    <div className="w-full border-b-1 flex flex-row items-start pl-[10px] pr-[15px] pt-[15px] pb-[15px]">
      <img
        src={room?.profileImageUrl}
        alt="이미지 없음"
        className="w-[70px] h-[70px] bg-gray-400 rounded-lg object-cover shrink-0"
      />
      <div className="flex justify-between w-full ml-[20px]">
        <div className="flex justify-between w-full ml-[20px] items-center">
          {/* 텍스트 영역 */}
          <div className="flex flex-col max-w-[calc(100%-80px)] pr-2">
            <div
              className="font-medium text-[15px] leading-snug whitespace-nowrap overflow-hidden text-ellipsis"
              title={room?.name}
            >
              {room?.name}
            </div>
            <div
              className="text-[12px] text-gray-600 mt-[4px] line-clamp-1"
              title={room?.description}
            >
              {room?.description}
            </div>
            <div className="text-[12px] text-gray-800 mt-[2px]">
              정원 : {room?.maxCapacity}
            </div>
          </div>

          {/* 버튼 영역 - 중앙 정렬됨 */}
          <div className="flex flex-col gap-[6px] items-end min-w-[50px] ml-2">
            <Link
              onClick={() => sessionStorage.removeItem("ticketNumber")}
              href={`/studyroom/${room?.id}`}
              className="bg-black text-white text-[10px] rounded-lg flex justify-center items-center w-[50px] h-[20px]"
            >
              참여
            </Link>
            <div className="bg-gray-400 text-black text-[10px] rounded-lg flex justify-center items-center w-[50px] h-[20px]">
              나가기
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
