"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

import PersonalList from "@/shared/component/ParticipateStudy/PersonalList";

import { CallAllMyStudyRoomResponse } from "@/shared/type/forAPI/RoomType";
import { FindMyStudyRooms } from "@/shared/hook/api/useStudyRoom";

export default function ParticipateStudy() {
  const { data: myStudyRoom } = useQuery<CallAllMyStudyRoomResponse>({
    queryKey: ["My-Study-Room"],
    queryFn: () => FindMyStudyRooms(),
    staleTime: 5 * 1000,
  });

  return (
    <div className="bg-white border-0 rounded-lg w-full h-full flex flex-col justify-start items-center px-[10px]">
      <div className="w-full justify-start flex font-bold text-[15px] mt-[16px] ml-[25px]">
        내가 참여중인 스터디
      </div>
      <div className="w-full border-t-1 mt-[10px]"></div>
      <div className="w-full overflow-y-auto overflow-x-hidden flex flex-col">
        {myStudyRoom?.length ? (
          myStudyRoom.map((room) => <PersonalList key={room.id} room={room} />)
        ) : (
          <div className="w-full items-center justify-center flex text-[15px] mt-[16px]">
            가입중인 스터디가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
