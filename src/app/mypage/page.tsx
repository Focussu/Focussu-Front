import React from "react";
import UserProfile from "@/shared/component/UserProfile";
import ParticipateStudy from "@/shared/component/ParticipateStudy";
import PersonalAnalysis from "@/shared/component/PersonalAnalysis";
import FriendLists from "@/shared/component/FriendLists";
import Ranking from "@/shared/component/Ranking";

export default function MyPage() {
  return (
    <div className="h-[calc(100vh-121px)] w-full flex flex-col lg:flex-row bg-[#E6E6E6]">
      <div className="flex flex-col w-full lg:w-1/3 p-10 gap-10 overflow-hidden">
        <div className="flex flex-col bg-white rounded-xl p-4 h-1/3">
          <UserProfile />
        </div>
        <div className="flex flex-col bg-white rounded-xl p-4 pt-2 h-2/3">
          <ParticipateStudy />
        </div>
      </div>

      <div className="flex flex-col w-full lg:w-1/3 p-10 overflow-hidden">
        <div className="flex flex-col bg-white rounded-xl p-4 pt-2 h-full">
          <PersonalAnalysis />
        </div>
      </div>

      <div className="flex flex-col w-full lg:w-1/3 p-10 gap-10 overflow-hidden">
        <div className="flex flex-col bg-white rounded-xl p-4 pt-2 h-1/2">
          <FriendLists />
        </div>
        <div className="flex flex-col bg-white rounded-xl p-4 pt-1 h-1/2">
          <Ranking />
        </div>
      </div>
    </div>
  );
}
