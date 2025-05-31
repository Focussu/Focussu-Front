"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { useWebRTC } from "@/shared/context/webRTCContext";
import { FindStudyRoom } from "@/shared/hook/api/useStudyRoom";
import { HitSuccessStudyRoomResponse } from "@/shared/type/forAPI/RoomType";

export default function RoomHeader() {
  const router = useRouter();
  const { leaveRoom, remoteStreams } = useWebRTC();

  const { roomID } = useParams();
  const roomIdNum = Number(roomID);

  const { data: roomInfo } = useQuery<HitSuccessStudyRoomResponse>({
    queryKey: ["Find-Room"],
    queryFn: () => FindStudyRoom(roomIdNum),
    staleTime: 5 * 1000,
  });

  console.log(roomInfo);

  return (
    <div className="w-full bg-[#E0E0E0] h-[75px] flex items-center justify-center">
      <div className="flex-1 ml-[30px]">
        <button
          onClick={() => {
            leaveRoom();
            router.push("/mypage");
          }}
          className="bg-black text-white font-semibold w-[80px] h-[30px] flex justify-center items-center rounded-lg "
        >
          돌아가기
        </button>
      </div>
      <div className="flex-1 flex justify-center items-center text-[25px]">
        {roomInfo?.name}
      </div>
      <div className="flex-1 flex justify-end items-center mr-[30px]">
        <div className="w-[144px] h-[45px] flex justify-center items-center rounded-lg border-1 bg-white text-black">
          인원수 : {remoteStreams.length + 1} / {roomInfo?.maxCapacity}
        </div>
      </div>
    </div>
  );
}
