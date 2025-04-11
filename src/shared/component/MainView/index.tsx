import React from "react";
import WelcomeMessage from "@/shared/component/MainView/WelcomeMessage";
import TodayFocusTime from "@/shared/component/MainView/TodayFocusTime";
import ThisWeekGroup from "./ThisWeekGroup";

export default function StudyOverview() {
  return (
    <>
      <div className="mx-auto ml-[75px] mr-[90px] mt-[120px] space-y-6 text-gray-800 flex justify-between">
        <WelcomeMessage />
        <TodayFocusTime />
      </div>
      <div className="mx-auto ml-[75px] mr-[90px] mt-[120px] space-y-6 text-gray-800 flex justify-between">
        <ThisWeekGroup />
      </div>
    </>
  );
}
