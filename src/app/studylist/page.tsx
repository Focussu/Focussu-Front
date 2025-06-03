"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import SearchBar from "@/shared/component/SearchBar";
import LeftButton from "@/shared/component/LeftButton";
import RightButton from "@/shared/component/RightButton";
import GroupLists from "@/shared/component/GroupLists";
import SelectModal from "@/shared/component/SelectModal";

import { CallAllStudyRoom } from "@/shared/hook/api/useStudyRoom";
import {
  CallAllStudyRoomResponse,
  ForCallAllStudyRooms,
} from "@/shared/type/forAPI/RoomType";

export default function StudyGroupList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<ForCallAllStudyRooms | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const { data: allRoom = [] } = useQuery<CallAllStudyRoomResponse>({
    queryKey: ["AllStudyRooms"],
    queryFn: () => CallAllStudyRoom(),
    staleTime: 5 * 1000,
  });

  const totalPages = Math.ceil(allRoom.length / itemsPerPage);
  const paginatedRooms = allRoom.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleOpen = (room: ForCallAllStudyRooms): void => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };
  const handleClose = (): void => setIsModalOpen(false);

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="relative">
      <div
        className={isModalOpen ? "blur-sm pointer-events-none select-none" : ""}
      >
        <div className="mx-auto mt-[40px]">
          <div className="flex justify-center mt-[52px]">
            <div className="mx-auto flex justify-center items-center">
              <LeftButton onClick={handlePrev} disabled={currentPage === 0} />
            </div>
            <GroupLists handleOpen={handleOpen} rooms={paginatedRooms} />
            <div className="mx-auto flex justify-center items-center">
              <RightButton
                onClick={handleNext}
                disabled={currentPage === totalPages - 1}
              />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && selectedRoom && (
        <SelectModal room={selectedRoom} handleClose={handleClose} />
      )}
    </div>
  );
}
