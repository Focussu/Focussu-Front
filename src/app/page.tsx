import React from "react";
import WelcomeMessage from "@/shared/component/MainView/WelcomeMessage";
import TodayFocusTime from "@/shared/component/MainView/TodayFocusTime";
import ThisWeekGroup from "@/shared/component/MainView/ThisWeekGroup";
import MainImage from "@/shared/component/MainImage";
import RecommendLists from "@/shared/component/MainView/RecommendLists";
import SmallHeader from "@/shared/component/48pxHeader";

export default function Home() {
  return (
    <>
      <div className="mx-auto ml-[75px] mr-[90px] mt-[120px] space-y-6 text-gray-800 flex justify-between">
        <WelcomeMessage />
        <TodayFocusTime />
      </div>
      <div className="mx-auto ml-[75px] mr-[90px] mt-[200px] space-y-6 text-gray-800 flex justify-between">
        <ThisWeekGroup />
        <MainImage />
      </div>
      <div className="mx-auto ml-[75px] mr-[90px] mt-[200px] space-y-6 text-gray-800">
        <div className="text-[48px] font-bold">00 님을 위한 추천 스터디</div>
        <div className="flex justify-between">
          <RecommendLists />
        </div>
      </div>
    </>
  );
}
