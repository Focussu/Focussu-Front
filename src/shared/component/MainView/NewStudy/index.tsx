import React from "react";
import NewStudyList from "./NewStudyList";

export default function NewStudyRecommend() {
  return (
    <div className="flex-1 min-w-[clamp(300px,40vw,740px)]">
      <div className="text-[clamp(24px,3vw,48px)] mb-[clamp(24px,4vw,48px)] font-bold">
        새로운 스터디 찾기 🔎
      </div>
      <NewStudyList />
      <NewStudyList />
      <NewStudyList />
    </div>
  );
}
