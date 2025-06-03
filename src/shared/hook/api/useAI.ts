"use client";

import {
  FindMyLog,
  FindIndivLog,
  MyAIReportResponse,
} from "@/shared/type/forAPI/AIType";

export const FindIndivAILog = async (ticket_id: number) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}ai-analysis/${ticket_id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (await res.json()) as FindIndivLog;
};

export const FindMyAILog = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}ai-analysis/my`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (await res.json()) as FindMyLog;
};

export const FindMyReport = async (ticket_id: number) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}analysis-document?ticketNumbers=${ticket_id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (await res.json()) as MyAIReportResponse;
};
