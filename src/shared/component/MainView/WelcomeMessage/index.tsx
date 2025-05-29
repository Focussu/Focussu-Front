"use client";

import { useQuery } from "@tanstack/react-query";

import { HowRecentTime } from "@/shared/type/forAPI/StudyType";
import { FindMember } from "@/shared/hook/api/useMember";
import { FindHowRecentTime } from "@/shared/hook/api/useStudyPart";
import {
  HitSuccessResponse,
  NotExistingMemberResponse,
} from "@/shared/type/forAPI/MemberType";

export default function WelcomeMessage() {
  const { data: time } = useQuery<HowRecentTime>({
    queryKey: ["Find-Recent-Time"],
    queryFn: () => FindHowRecentTime(),
    staleTime: 5 * 1000,
  });

  const { data: user } = useQuery<
    HitSuccessResponse | NotExistingMemberResponse
  >({
    queryKey: ["Find-Member"],
    queryFn: () => FindMember(time!.memberId),
    staleTime: 5 * 1000,
  });

  const formatDuration = (seconds: number) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    const parts = [];
    if (days) parts.push(`${days}D`);
    if (hours) parts.push(`${hours}H`);
    if (minutes) parts.push(`${minutes}M`);
    else;

    return parts.join(" ");
  };

  const message =
    time?.seconds != 0 && time?.seconds != null
      ? `${formatDuration(time.seconds)} 만에 들어오셨네요!`
      : "처음 들어오셨네요! 환영합니다!";

  return (
    <div className="flex flex-col items-center text-center justify-center">
      <h1 className="text-[clamp(48px,2.5vw,64px)] font-bold mb-2 text-black whitespace-nowrap">
        {user && "name" in user
          ? `${user.name}님 반가워요!`
          : "회원님 반가워요!"}
      </h1>
      <p className="text-[clamp(16px,2.5vw,24px)] text-zinc-500 whitespace-nowrap">
        {message}
      </p>
    </div>
  );
}
