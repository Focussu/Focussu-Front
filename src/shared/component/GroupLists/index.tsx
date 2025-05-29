"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

import { CallAllStudyRoom } from "@/shared/hook/api/useStudyRoom";
import {
  ForCallAllStudyRooms,
  CallAllStudyRoomResponse,
} from "@/shared/type/forAPI/RoomType";

import GroupList from "@/shared/component/GroupLists/GroupList";
interface GroupListsProps {
  handleOpen: () => void;
}

export default function GroupLists({ handleOpen }: GroupListsProps) {
  const { data: allRoom } = useQuery<CallAllStudyRoomResponse>({
    queryKey: ["AllStudyRooms"],
    queryFn: () => CallAllStudyRoom(),
    staleTime: 5 * 1000,
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[clamp(20px,4vw,48px)] px-[clamp(16px,5vw,80px)]">
      {allRoom?.map((room: ForCallAllStudyRooms) => (
        <GroupList key={room.id} room={room} handleOpen={handleOpen} />
      ))}
    </div>
  );
}
