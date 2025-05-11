import React from "react";
import PersonalList from "@/shared/component/ParticipateStudy/PersonalList";

export default function ParticipateStudy() {
  return (
    <div className="bg-white border-0 rounded-lg w-full h-full flex flex-col justify-start items-center px-[10px]">
      <div className="w-full justify-start flex font-bold text-[15px] mt-[16px] ml-[25px]">
        내가 참여중인 스터디
      </div>
      <div className="w-full border-t-1 mt-[10px]"></div>
      <div className="w-full overflow-y-auto overflow-x-hidden flex flex-col">
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
