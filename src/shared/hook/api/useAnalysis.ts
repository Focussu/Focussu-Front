"use client";

import {
  MyAnalyzeRequest,
  MyAnalyzeResponse,
} from "@/shared/type/forAPI/AIType";

export const AnalyzeStudy = async ({
  userID,
  ticketNumber,
}: MyAnalyzeRequest) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_AI_SERVER_URL}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ticketNumber,
      userID,
    } satisfies MyAnalyzeRequest),
  });
  return (await res.json()) as MyAnalyzeResponse;
};
