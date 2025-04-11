import React from "react";
import NewStudyList from "./NewStudyList";

export default function NewStudyRecommend() {
  return (
    <div>
      <div className="text-[48px] mb-[48px] font-bold">
        새로운 스터디 찾기 🔎
      </div>
      <NewStudyList />
      <NewStudyList />
      <NewStudyList />
    </div>
  );
}
