import React from "react";
import SearchBar from "@/shared/component/SearchBar";
import LeftButton from "@/shared/component/LeftButton";
import RightButton from "@/shared/component/RightButton";
import GroupLists from "@/shared/component/GroupLists";

export default function StudyGroupList() {
  return (
    <div className="mx-auto mt-[40px]">
      <div className="flex justify-center">
        <SearchBar />
      </div>
      <div className="flex justify-center mt-[52px]">
        <div className="mx-auto flex justify-center items-center">
          <LeftButton />
        </div>
        <GroupLists />
        <div className="mx-auto flex justify-center items-center">
          <RightButton />
        </div>
      </div>
    </div>
  );
}
