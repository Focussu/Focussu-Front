import React from "react";
import RecommendList from "./RecommendList";

export default function RecommendLists() {
  return (
    <div className="flex flex-row mt-[48px] gap-[25px]">
      <RecommendList />
      <RecommendList />
      <RecommendList />
    </div>
  );
}
