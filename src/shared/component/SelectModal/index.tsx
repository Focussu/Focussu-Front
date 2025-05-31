"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";

import { SuccessJoinStudyRoom } from "@/shared/type/forAPI/RoomType";
import { JoinStudyRoom } from "@/shared/hook/api/useStudyRoom";

interface SelectModalProps {
  room: {
    id: number;
    name: string;
    description: string;
    maxCapacity: number;
    profileImageUrl: string;
  };
  handleClose: () => void;
}

export default function SelectModal({ room, handleClose }: SelectModalProps) {
  const router = useRouter();

  const { mutate, data, isError } = useMutation<
    SuccessJoinStudyRoom,
    Error,
    {
      id: number;
    }
  >({
    mutationFn: () => JoinStudyRoom(room.id),
  });

  const handleParticipate = (id: number) => {
    try {
      mutate({
        id,
      });
      router.push("/mypage");
    } catch (err) {
      console.error("이미지 업로드 또는 방 생성 실패:", err);
    }
  };

  console.log(room);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm px-4">
      <div className="w-[90vw] max-w-[700px] bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="w-full h-[240px]">
          <img
            src={room.profileImageUrl}
            alt="스터디 이미지"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="px-8 py-6 border-t border-gray-300">
          <div className="flex justify-center gap-10 mb-6">
            <div className="flex flex-col gap-2 max-w-[50%]">
              <div className="text-[20px] font-semibold">{room.name}</div>
              <div className="text-[15px] text-gray-700">
                정원 : {room.maxCapacity}
              </div>
            </div>

            <div className="flex flex-col max-w-[50%]">
              <div className="text-[18px] font-semibold mb-1">세부 설명</div>
              <div className="text-[15px] text-gray-600 whitespace-pre-line leading-relaxed">
                {room.description}
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleParticipate(room?.id)}
              className="bg-black text-white text-[16px] px-5 py-2 rounded-md hover:opacity-90"
            >
              참여
            </button>
            <button
              onClick={handleClose}
              className="bg-gray-500 text-white text-[16px] px-5 py-2 rounded-md hover:bg-gray-600"
            >
              나가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
