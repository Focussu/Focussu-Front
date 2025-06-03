"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

import CurrentStudyList from "./CurrentStudyList";
import { CallAllStudyRoom } from "@/shared/hook/api/useStudyRoom";
import {
  CallAllStudyRoomResponse,
  HitSuccessStudyRoomResponse,
} from "@/shared/type/forAPI/RoomType";

export default function CurrentStudy() {
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
    <div className="flex-1 min-w-[clamp(300px,40vw,740px)]">
      <div className="text-[clamp(24px,3vw,48px)] mb-[clamp(24px,4vw,48px)] font-bold">
        최근 스터디 홍보 📚
      </div>
      {randomRooms.map((room) => (
        <CurrentStudyList key={room.id} room={room} />
      ))}
    </div>
  );
}
