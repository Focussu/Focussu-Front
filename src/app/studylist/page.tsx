"use client";

import React, { useState } from "react";
import SearchBar from "@/shared/component/SearchBar";
import LeftButton from "@/shared/component/LeftButton";
import RightButton from "@/shared/component/RightButton";
import GroupLists from "@/shared/component/GroupLists";
import SelectModal from "@/shared/component/SelectModal";

export default function StudyGroupList() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpen = (): void => setIsModalOpen(true);
  const handleClose = (): void => setIsModalOpen(false);

  return (
    <div className="relative">
      <div
        className={isModalOpen ? "blur-sm pointer-events-none select-none" : ""}
      >
        <div className="mx-auto mt-[40px]">
          <div className="flex justify-center">
            <SearchBar />
          </div>
          <div className="flex justify-center mt-[52px]">
            <div className="mx-auto flex justify-center items-center">
              <LeftButton />
            </div>
            <GroupLists handleOpen={handleOpen} />
            <div className="mx-auto flex justify-center items-center">
              <RightButton />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && <SelectModal handleClose={handleClose} />}
    </div>
  );
}
