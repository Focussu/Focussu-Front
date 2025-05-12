"use client";

// import { useQuery } from "@tanstack/react-query";
import {
  TestSuccesResponse,
  TestFailResponse,
  JWTFailTestResponse,
  JWTSuccessTestResponse,
} from "@/shared/type/forAPI/TestType";

export const healthCheck = async () => {
  return (await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}test/health-check`
  ).then((res) => res.json())) as TestSuccesResponse | TestFailResponse;
};

// /test/security-work, JWT 인증 체크
/*
const { data: test } = useQuery<TestSuccesResponse | TestFailResponse>({
  queryKey: ["Health-Check"],
  queryFn: () => healthCheck(),
  staleTime: 5 * 1000,
});
*/

export const securityCheck = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}test/security-check`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return (await res.json()) as JWTSuccessTestResponse | JWTFailTestResponse;
};

// /test/health-check, 서버 Health 체크
/*
const { data: security } = useQuery<
  JWTSuccessTestResponse | JWTFailTestResponse
>({
  queryKey: ["Security-Check"],
  queryFn: () => securityCheck(),
  staleTime: 5 * 1000,
});
*/
