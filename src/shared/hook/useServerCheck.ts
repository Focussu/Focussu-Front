"use client";

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

export const securityCheck = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}test/security-check`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (await res.json()) as JWTSuccessTestResponse | JWTFailTestResponse;
};
