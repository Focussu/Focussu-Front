"use client";

import {
  TestSuccesResponse,
  TestFailResponse,
} from "@/shared/type/forAPI/TestType";

export const healthCheck = async () => {
  return (await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}test/health-check`
  ).then((res) => res.json())) as TestSuccesResponse | TestFailResponse;
};
