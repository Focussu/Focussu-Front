"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import {
  ForCallAllMyStudyrooms,
  HitSuccessStudyRoomResponse,
} from "@/shared/type/forAPI/RoomType";
import { FindStudyRoom } from "@/shared/hook/api/useStudyRoom";

export default function PersonalList({
  room,
}: {
  room: ForCallAllMyStudyrooms;
}) {
  const { data: studyRoom } = useQuery<HitSuccessStudyRoomResponse>({
    queryKey: ["Indiv-Study-Room"],
    queryFn: () => FindStudyRoom(room.id),
    staleTime: 5 * 1000,
  });

  return (
    <div className="w-full h-full border-b-1 flex flex-row pl-[10px] pr-[15px] pt-[15px] pb-[15px]">
      <img
        src={studyRoom?.profileImageUrl}
        alt="이미지 없음"
        className="w-[76px] h-[70px] bg-gray-400 rounded-lg"
      />
      <div className="flex justify-between w-full">
        <div className="flex flex-col ml-[20px]">
          <div className="font-medium text-[15px] mb-[10px]">
            {studyRoom?.name}
          </div>
        </div>
        <div className="flex flex-col gap-[10px] mt-[10px]">
          <Link
            href={`/studyroom/${studyRoom?.id}`}
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
