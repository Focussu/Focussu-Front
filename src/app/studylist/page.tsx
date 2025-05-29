"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import SearchBar from "@/shared/component/SearchBar";
import LeftButton from "@/shared/component/LeftButton";
import RightButton from "@/shared/component/RightButton";
import GroupLists from "@/shared/component/GroupLists";
import SelectModal from "@/shared/component/SelectModal";

import { CallAllStudyRoom } from "@/shared/hook/api/useStudyRoom";
import { CallAllStudyRoomResponse } from "@/shared/type/forAPI/RoomType";

export default function StudyGroupList() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data: allRoom } = useQuery<CallAllStudyRoomResponse>({
    queryKey: ["AllStudyRooms"],
    queryFn: () => CallAllStudyRoom(),
    staleTime: 5 * 1000,
  });

  console.log(allRoom);

  const handleOpen = (): void => setIsModalOpen(true);
  const handleClose = (): void => setIsModalOpen(false);

  return (
    <div className="relative">
      <div
        className={isModalOpen ? "blur-sm pointer-events-none select-none" : ""}
      >
        <div className="mx-auto mt-[40px]">
          <div className="w-full flex justify-center px-4">
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
