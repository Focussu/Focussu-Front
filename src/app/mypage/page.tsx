import React from "react";
import UserProfile from "@/shared/component/UserProfile";
import ParticipateStudy from "@/shared/component/ParticipateStudy";
import PersonalAnalysis from "@/shared/component/PersonalAnalysis";
import FriendList from "@/shared/component/FriendList";
import Ranking from "@/shared/component/Ranking";

export default function MyPage() {
  return (
    <div className="flex">
      <div className="flex-1 bg-[#E6E6E6] flex flex-col justify-center items-center pt-[30px] pb-[30px] gap-[30px]">
        <UserProfile />
        <ParticipateStudy />
      </div>
      <div className="flex-1 bg-[#E6E6E6] flex flex-col justify-center items-center">
        <PersonalAnalysis />
      </div>
      <div className="flex-1 bg-[#E6E6E6] flex flex-col justify-center items-center gap-[30px]">
        <FriendList />
        <Ranking />
      </div>
    </div>
  );
}
