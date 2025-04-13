import React from "react";
import PersonalList from "@/shared/component/ParticipateStudy/PersonalList";

export default function ParticipateStudy() {
  return (
    <div className="bg-white rounded-lg w-[420px] h-[465px]">
      <div className="font-bold text-[15px] mt-[16px] ml-[25px]">
        내가 참여중인 스터디
      </div>
      <div className="w-[380px] border-t-1 mt-[10px] ml-[18px]"></div>
      <div className="pl-[20px] pr-[15px] h-[400px] overflow-y-auto overflow-x-hidden flex flex-col">
        <PersonalList />
        <PersonalList />
        <PersonalList />
        <PersonalList />
        <PersonalList />
        <PersonalList />
      </div>
    </div>
  );
}
