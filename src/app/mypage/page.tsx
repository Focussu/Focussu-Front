import React from "react";
import UserProfile from "@/shared/component/UserProfile";
import ParticipateStudy from "@/shared/component/ParticipateStudy";

export default function MyPage() {
  return (
    <div className="flex">
      <div className="flex-1 bg-[#E6E6E6] flex flex-col justify-center items-center pt-[30px] pb-[30px] gap-[30px]">
        <UserProfile />
        <ParticipateStudy />
      </div>
      <div className="flex-1 bg-green-200"></div>
      <div className="flex-1 bg-blue-200 "></div>
    </div>
  );
}
