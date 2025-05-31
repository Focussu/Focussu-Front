"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

import { useUserStore } from "@/shared/store/setUserStore";
import {
  ThisWeekStudyTime,
  TotalStudyTime,
} from "@/shared/type/forAPI/StudyType";
import {
  FindThisWeekStudyTime,
  FindTotalStudyTime,
} from "@/shared/hook/api/useStudyPart";

import { formatDate } from "@/shared/util/formatDate";

export default function UserProfile() {
  const { user } = useUserStore();

  const { data: totalStudy } = useQuery<TotalStudyTime>({
    queryKey: ["Total-Study-Time"],
    queryFn: () => FindTotalStudyTime(),
    staleTime: 5 * 1000,
  });

  const { data: thisWeekStudy } = useQuery<ThisWeekStudyTime>({
    queryKey: ["This-Week-Study"],
    queryFn: () => FindThisWeekStudyTime(),
    staleTime: 5 * 1000,
  });

  return (
    <div className="bg-white border-0 rounded-lg w-full h-full flex flex-col justify-center items-center px-4 overflow-hidden">
      <div className="flex flex-row flex-nowrap justify-center items-center gap-6 sm:gap-8 w-auto h-auto max-w-full overflow-hidden">
        {user && "profileImageUrl" in user && (
          <img
            src={user.profileImageUrl || "/default_profile.png"}
            alt="이미지가 없어요"
            className="rounded-lg w-[150px] h-[150px] sm:w-[100px] sm:h-[100px] flex-shrink-0"
          />
        )}

        <div className="flex flex-col justify-center sm:items-start items-center text-center sm:text-left flex-shrink min-w-0">
          <div className="text-base sm:text-2xl font-bold truncate">
            {user && "name" in user && user.name}
          </div>

          {totalStudy && (
            <div className="text-[10px] sm:text-xs text-gray-600 mt-2 sm:mt-3 mb-1 truncate">
              총 집중시간 : {formatDate(totalStudy.seconds)}
            </div>
          )}
          {thisWeekStudy && (
            <div className="text-[10px] sm:text-xs text-gray-600 mb-3 truncate">
              금주 집중시간 : {formatDate(thisWeekStudy.seconds)}
            </div>
          )}
          <div className="flex flex-nowrap gap-2 sm:gap-3 mt-2 justify-center sm:justify-start">
            <div className="px-2 py-1 text-[9px] sm:text-xs bg-gray-400 rounded-md flex justify-center items-center min-w-0 whitespace-nowrap">
              내 상태 설정하기
            </div>
            <div className="px-2 py-1 text-[9px] sm:text-xs border border-gray-400 rounded-md flex justify-center items-center min-w-0 whitespace-nowrap">
              ✅ 현재 활동 중
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
