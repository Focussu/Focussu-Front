import React from "react";
import CurrentStudyList from "./CurrentStudyList";

export default function CurrentStudy() {
  return (
    <div className="flex-1 min-w-[clamp(300px,40vw,740px)]">
      <div className="text-[clamp(24px,3vw,48px)] mb-[clamp(24px,4vw,48px)] font-bold">
        최근 스터디 홍보 📚
      </div>
      <CurrentStudyList />
      <CurrentStudyList />
      <CurrentStudyList />
    </div>
  );
}
