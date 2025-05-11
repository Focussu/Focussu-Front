import React from "react";
import FriendList from "@/shared/component/FriendLists/FriendList";

export default function FriendLists() {
  return (
    <div className="bg-white border-0 rounded-lg w-full h-full flex flex-col justify-start items-center px-[10px]">
      <div className="w-full font-bold text-[15px] mt-[16px] ml-[25px]">
        내 친구
      </div>
      <div className="w-full border-t-1 mt-[10px] mx-[18px]"></div>
      <div className="w-full h-full flex flex-col overflow-y-auto overflow-x-hidden box-border ">
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
