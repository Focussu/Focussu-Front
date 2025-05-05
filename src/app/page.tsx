import React from "react";

import WelcomeMessage from "@/shared/component/MainView/WelcomeMessage";
import TodayFocusTime from "@/shared/component/MainView/TodayFocusTime";
import ThisWeekGroup from "@/shared/component/MainView/ThisWeekGroup";
import MainImage from "@/shared/component/MainImage";
import RecommendLists from "@/shared/component/MainView/RecommendLists";
import NewStudyRecommend from "@/shared/component/MainView/NewStudy";
import CurrentStudy from "@/shared/component/MainView/CurrentStudy";
import Footer from "@/shared/component/Footer";

export default function Home() {
  return (
    <>
      <div className="mx-auto w-full max-w-[1600px] px-4 md:px-12 xl:px-24 space-y-6">
        <div className="mt-[120px] text-gray-800 flex flex-col md:flex-row gap-[clamp(24px,4vw,64px)] items-center justify-between">
          <WelcomeMessage />
          <TodayFocusTime />
        </div>
        <div className="mt-[200px] text-gray-800 flex justify-between">
          <ThisWeekGroup />
          <MainImage />
        </div>
        <div className="mt-[200px] text-gray-800">
          <div className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold">
            00 님을 위한 추천 스터디
          </div>
          <div className="flex justify-between">
            <RecommendLists />
          </div>
        </div>
        <div className="mt-[180px] mb-[100px] flex">
          <NewStudyRecommend />
          <CurrentStudy />
        </div>
      </div>
      <Footer />
    </>
  );
}
