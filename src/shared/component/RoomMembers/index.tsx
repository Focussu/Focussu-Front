import React from "react";
import RoomMember from "@/shared/component/RoomMembers/RoomMember";

export default function RoomMembers() {
  return (
    <div className="h-full w-full overflow-x-hidden overflow-y-auto bg-[#959595]">
      <div className="flex flex-row flex-wrap gap-[50px] mx-[30px] mt-[30px] mb-[30px]">
        <RoomMember />
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
