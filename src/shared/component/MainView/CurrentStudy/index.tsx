import React from "react";
import CurrentStudyList from "./CurrentStudyList";

export default function CurrentStudy() {
  return (
    <div>
      <div className="text-[48px] mb-[48px] font-bold">최근 스터디 홍보 📚</div>
      <CurrentStudyList />
      <CurrentStudyList />
      <CurrentStudyList />
    </div>
  );
}
