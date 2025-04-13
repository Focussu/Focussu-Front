import React from "react";
import FriendList from "@/shared/component/FriendLists/FriendList";

export default function FriendLists() {
  return (
    <div className="bg-[#FFFFFF] rounded-lg w-[420px] h-[345px]">
      <div className="font-bold text-[15px] mt-[16px] ml-[25px]">내 친구</div>
      <div className="w-[380px] border-t-1 mt-[10px] ml-[18px]"></div>
      <div className="h-[275px] flex flex-col overflow-y-auto overflow-x-hidden box-border">
        <FriendList />
        <FriendList />
        <FriendList />
        <FriendList />
        <FriendList />
        <FriendList />
        <FriendList />
      </div>
    </div>
  );
}
