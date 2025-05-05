import React from "react";
import UserProfile from "@/shared/component/UserProfile";
import ParticipateStudy from "@/shared/component/ParticipateStudy";
import PersonalAnalysis from "@/shared/component/PersonalAnalysis";
import FriendLists from "@/shared/component/FriendLists";
import Ranking from "@/shared/component/Ranking";

export default function MyPage() {
  return (
    <div className="flex flex-col lg:flex-row bg-[#E6E6E6]">
      <div className="w-full lg:w-1/3 flex flex-col justify-center items-center pt-6 pb-6 gap-6">
        <UserProfile />
        <ParticipateStudy />
      </div>

      <div className="w-full lg:w-1/3 flex justify-center items-center pt-6 pb-6">
        <PersonalAnalysis />
      </div>

      <div className="w-full lg:w-1/3 flex flex-col justify-center items-center pt-6 pb-6 gap-6">
        <FriendLists />
        <Ranking />
      </div>
    </div>
  );
}
