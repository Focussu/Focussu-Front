"use client";

// import { useQuery } from "@tanstack/react-query";
import {
  MemberJoinRequest,
  MemberJoinSuccessResponse,
  IsExistingEmailResponse,
  HitSuccessResponse,
  NotExistingMemberResponse,
} from "@/shared/type/forAPI/MemberType";

export const JoinMember = async (
  name: string,
  email: string,
  password: string
) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}api/members/join`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        email,
        password,
      } satisfies MemberJoinRequest),
    }
  );
  return (await res.json()) as
    | MemberJoinSuccessResponse
    | IsExistingEmailResponse;
};

// /api/members/join, 회원가입
/*
const { data: user } = useQuery<MemberJoinSuccessResponse | IsExistingEmailResponse>({
  queryKey: ["Join"],
  queryFn: () => JoinMember("test","test1234@gmail.com","test1234"),
  staleTime: 5 * 1000,
});
*/

export const FindMember = async (memberId: number) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}api/members/${memberId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        memberId,
      }),
    }
  );
  return (await res.json()) as HitSuccessResponse | NotExistingMemberResponse;
};

// /api/members/${memberId}, 회원 조회
/*
const { data: user } = useQuery<HitSuccessResponse | NotExistingMemberResponse>({
  queryKey: ["Find-Member"],
  queryFn: () => FindMember(1),
  staleTime: 5 * 1000,
});
*/

export const DeleteMember = async (memberId: number) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}api/members/${memberId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        memberId,
      }),
    }
  );
  return (await res.json()) as null | NotExistingMemberResponse;
};

// /api/members/${memberId}, 회원 탈퇴
/*
const { data: user } = useQuery<null | NotExistingMemberResponse>({
  queryKey: ["Delete-Member"],
  queryFn: () => DeleteMember(1),
  staleTime: 5 * 1000,
});
*/
