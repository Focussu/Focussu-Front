"use client";

import React, { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { useElapsedTime } from "@/shared/context/ElapsedContext";
import { formatDate } from "@/shared/util/formatDate";

import {
  FindId,
  MemberErrorResponse,
  HitSuccessResponse,
  NotExistingMemberResponse,
} from "@/shared/type/forAPI/MemberType";
import { OtherTodayStudyTime } from "@/shared/type/forAPI/StudyType";
import { FindIdByEmail, FindMember } from "@/shared/hook/api/useMember";
import { FindOtherTodayStudyTime } from "@/shared/hook/api/useStudyPart";

function isFindId(data: any): data is FindId {
  return data && typeof data === "object" && "member_id" in data;
}

export default function RoomMember({
  stream,
  id,
}: {
  stream: MediaStream;
  id: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { elapsedTime } = useElapsedTime();

  useLayoutEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const { data: userId } = useQuery<FindId | MemberErrorResponse>({
    queryKey: ["User-Id", id],
    queryFn: () => FindIdByEmail(id),
    staleTime: 5 * 1000,
  });

  const { data: user } = useQuery<
    HitSuccessResponse | NotExistingMemberResponse
  >({
    queryKey: ["User-Info", isFindId(userId) ? userId.member_id : null],
    queryFn: () => {
      if (!isFindId(userId)) return Promise.reject("잘못된 ID");
      return FindMember(userId.member_id);
    },
    enabled: isFindId(userId),
  });

  const { data: otherTodayTime } = useQuery<
    OtherTodayStudyTime | MemberErrorResponse
  >({
    queryKey: ["Other-Today-Study", id],
    queryFn: () => FindOtherTodayStudyTime(id),
    staleTime: 5 * 1000,
  });

  return (
    <Link
      href={`/studyroom/1/${isFindId(userId) ? userId.member_id : 1}`}
      className="w-full max-w-[420px] aspect-[16/10] rounded-2xl bg-white shadow-md hover:shadow-lg transition-all duration-200 flex flex-col justify-between items-center overflow-hidden"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full h-[75%] object-cover bg-gray-300"
      />
      <div className="w-full px-4 py-3 flex items-center justify-between text-sm">
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900">
            {user && "name" in user ? user.name : "알 수 없음"}
          </span>
          {otherTodayTime && "seconds" in otherTodayTime && (
            <span className="text-xs text-gray-500 mt-[2px]">
              {formatDate(otherTodayTime.seconds + elapsedTime)}
            </span>
          )}
        </div>
        <div className="text-[10px] bg-green-100 text-green-700 px-2 py-[2px] rounded-full font-medium border border-green-300">
          ✅ 현재 활동 중
        </div>
      </div>
    </Link>
  );
}
