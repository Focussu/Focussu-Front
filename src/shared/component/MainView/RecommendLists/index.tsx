"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

import RecommendList from "./RecommendList";
import { CallAllStudyRoom } from "@/shared/hook/api/useStudyRoom";
import {
  CallAllStudyRoomResponse,
  HitSuccessStudyRoomResponse,
} from "@/shared/type/forAPI/RoomType";

export default function RecommendLists() {
  const { data: allRoom } = useQuery<CallAllStudyRoomResponse>({
    queryKey: ["AllStudyRooms"],
    queryFn: () => CallAllStudyRoom(),
    staleTime: 5 * 1000,
  });

  const getRandomRooms = (
    rooms: HitSuccessStudyRoomResponse[],
    count: number
  ) => {
    const shuffled = [...rooms].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomRooms = allRoom ? getRandomRooms(allRoom, 3) : [];

  return (
    <div className="w-full flex flex-row justify-center gap-[clamp(12px,3vw,36px)] mt-[48px]">
      {randomRooms.map((room) => (
        <RecommendList key={room.id} room={room} />
      ))}
    </div>
  );
}
