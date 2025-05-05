import React from "react";
import RecommendList from "./RecommendList";

export default function RecommendLists() {
  return (
    <div className="w-full flex flex-row justify-center gap-[clamp(12px,3vw,36px)] mt-[48px]">
      <RecommendList />
      <RecommendList />
      <RecommendList />
    </div>
  );
}
