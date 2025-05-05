import React from "react";
import MyRoom from "@/shared/component/RoomMembers/MyRoom";
import RoomMember from "@/shared/component/RoomMembers/RoomMember";

export default function RoomMembers() {
  return (
    <div className="h-full w-full overflow-x-hidden overflow-y-auto bg-[#959595] px-[30px] py-[30px]">
      <div className="grid gap-x-[50px] gap-y-[50px] grid-cols-[repeat(auto-fill,_minmax(415px,_1fr))] justify-center">
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
