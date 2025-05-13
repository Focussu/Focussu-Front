"use client";

// import { useQuery } from "@tanstack/react-query";
import {
  CreateNewStudyRoomRequest,
  HitSuccessStudyRoomResponse,
  HitSuccessParticipants,
} from "@/shared/type/forAPI/RoomType";

export const MakeStudyRoom = async (
  name: string,
  maxCapacity: number,
  description: string,
  profileImageUrl: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}studyrooms`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        maxCapacity,
        description,
        profileImageUrl,
      } satisfies CreateNewStudyRoomRequest),
    }
  );
  return (await res.json()) as HitSuccessStudyRoomResponse;
};

// /studyrooms, 스터디룸 생성
/*
const { data: room } = useQuery<HitSuccessStudyRoomResponse>({
  queryKey: ["MakeStudyRooms"],
  queryFn: () => MakeStudyRoom("test",10,"test1234","https://placeholder.com"),
  staleTime: 5 * 1000,
});
*/

export const FindStudyRoom = async (id: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}studyrooms/${id}`
  );
  return (await res.json()) as HitSuccessStudyRoomResponse;
};

// /studyrooms/${id}, 스터디룸 조회
/*
const { data: room } = useQuery<HitSuccessStudyRoomResponse>({
  queryKey: ["FindStudyRooms"],
  queryFn: () => FindStudyRoom(1),
  staleTime: 5 * 1000,
});
*/

export const FindParticipants = async (roomId: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}api/study-rooms/${roomId}/participants`
  );
  return (await res.json()) as HitSuccessParticipants;
};

// /api/study-rooms/${roomId}/participants, 스터디룸 참가자 조회
/*
const { data: participants } = useQuery<HitSuccessParticipants>({
  queryKey: ["FindParticipants"],
  queryFn: () => FindParticipants(1),
  staleTime: 5 * 1000,
});
*/
