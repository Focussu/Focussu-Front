"use client";

import React from "react";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";
import { useRef, useEffect } from "react";

import { FindId, MemberErrorResponse } from "@/shared/type/forAPI/MemberType";
import { FindIdByEmail } from "@/shared/hook/api/useMember";
import { TodayStudyTime } from "@/shared/type/forAPI/StudyType";
import { FindTodayStudyTime } from "@/shared/hook/api/useStudyPart";

export default function RoomMember({
  stream,
  id,
}: {
  stream: MediaStream;
  id: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const { data: userId } = useQuery<FindId | MemberErrorResponse>({
    queryKey: ["User-Id"],
    queryFn: () => FindIdByEmail(id),
    staleTime: 5 * 1000,
  });

  return (
    <>
      {userId && "member_id" in userId && (
        <Link
          href={`/studyroom/1/${userId.member_id}`}
          className="w-full aspect-[415/225] rounded-lg bg-white flex flex-col justify-center items-center shadow-sm"
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-[65%] h-[70%] mt-4 rounded-md object-cover bg-gray-500"
          />
          <div className="w-[65%] flex justify-between mt-3 mb-4 text-sm">
            <div className="flex gap-3 items-center">
              <div className="font-semibold">오승민</div>
              <div className="text-xs text-gray-600">2h 30m 20s</div>
            </div>
            <div className="px-2 py-1 text-[10px] rounded border border-gray-400">
              ✅ 현재 활동 중
            </div>
          </div>
        </Link>
      )}
    </>
  );
}
