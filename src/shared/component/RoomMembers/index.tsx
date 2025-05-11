import React from "react";
import MyRoom from "@/shared/component/RoomMembers/MyRoom";
import RoomMember from "@/shared/component/RoomMembers/RoomMember";

export default function RoomMembers() {
  return (
    <div className="w-full h-full overflow-x-hidden px-4 py-6">
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(22rem,_1fr))] gap-6 sm:gap-8 lg:gap-10 w-full h-fit overflow-y-auto ">
        <MyRoom />
        <RoomMember />
        <RoomMember />
        <RoomMember />
        <RoomMember />
        <RoomMember />
        <RoomMember />
        <RoomMember />
        <RoomMember />
        <RoomMember />
      </div>
    </div>
  );
}
