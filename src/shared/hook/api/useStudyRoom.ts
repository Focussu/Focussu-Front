"use client";

// import { useQuery } from "@tanstack/react-query";
import {
  CallAllStudyRoomResponse,
  CreateNewStudyRoomRequest,
  HitSuccessStudyRoomResponse,
  JoinStudyRoomRequest,
  SuccessJoinStudyRoom,
  CallAllMyStudyRoomResponse,
} from "@/shared/type/forAPI/RoomType";

export const CallAllStudyRoom = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}studyrooms`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (await res.json()) as CallAllStudyRoomResponse;
};

// /studyrooms, 모든 스터디룸 조회
/*
const { data: allRoom } = useQuery<CallAllStudyRoomResponse>({
  queryKey: ["AllStudyRooms"],
  queryFn: () => CallAllStudyRoom(),
  staleTime: 5 * 1000,
});
*/

export const MakeStudyRoom = async (
  name: string,
  description: string,
  maxCapacity: number,
  profileImageUrl: string
) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}studyrooms`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
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
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}studyrooms/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (await res.json()) as HitSuccessStudyRoomResponse;
};

// /studyrooms/${id}, 스터디룸 단일 조회
/*
const { data: room } = useQuery<HitSuccessStudyRoomResponse>({
  queryKey: ["FindStudyRooms"],
  queryFn: () => FindStudyRoom(1),
  staleTime: 5 * 1000,
});
*/

export const JoinStudyRoom = async (id: number) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}studyrooms/join/${id}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return (await res.json()) as SuccessJoinStudyRoom;
};

// /studyrooms/join/{id}, 스터디룸 참가 => 새로운 스터디룸 가입
/*
const { data: joinStudy } = useQuery<SuccessJoinStudyRoom>({
  queryKey: ["JoinStudyroom"],
  queryFn: () => JoinStudyRoom(1),
  staleTime: 5 * 1000,
});
*/

export const FindMyStudyRooms = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}studyrooms/my`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (await res.json()) as CallAllMyStudyRoomResponse;
};

// /studyrooms/my, 내가 참가한 스터디룸 조회
/*
const { data: myRoom } = useQuery<CallAllMyStudyRoomResponse>({
  queryKey: ["FindMyStudyRooms"],
  queryFn: () => FindMyStudyRooms(),
  staleTime: 5 * 1000,
});
*/
