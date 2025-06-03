"use client";

import { useState, useMemo } from "react";
import Concentrate from "@/shared/component/PersonalAnalysis/detail/Concentrate";

import { useQuery } from "@tanstack/react-query";
import { FindMyAILog } from "@/shared/hook/api/useAI";
import { FindMyLog } from "@/shared/type/forAPI/AIType";
import ShowReport from "./detail/ShowReport";

export default function PersonalAnalysis() {
  const [selectedTicket, setSelectedTicket] = useState<string | "">("");

  const { data: myID } = useQuery<FindMyLog>({
    queryKey: ["Find-My-ID"],
    queryFn: () => FindMyAILog(),
    staleTime: 5 * 1000,
  });

  const groupedByDateTicketWithSession = useMemo(() => {
    const grouped: Record<
      string,
      Record<
        string,
        {
          startTime: string;
          endTime: string;
          logs: {
            id: number;
            ticketNumber: number;
            startTime: string;
            endTime: string;
            score: number;
          }[];
        }
      >
    > = {};

    if (!myID) return grouped;

    for (const item of myID) {
      const date = item.startTime.split("T")[0];
      const ticket = String(item.ticketNumber);

      if (!grouped[date]) {
        grouped[date] = {};
      }

      if (!grouped[date][ticket]) {
        grouped[date][ticket] = {
          startTime: item.startTime,
          endTime: item.endTime,
          logs: [],
        };
      }

      const session = grouped[date]![ticket]!;

      if (item.startTime < session.startTime) {
        session.startTime = item.startTime;
      }

      if (item.endTime > session.endTime) {
        session.endTime = item.endTime;
      }

      session.logs.push(item);
    }

    return grouped;
  }, [myID]);

  const parsedData = useMemo(() => {
    return (myID || []).map((item) => {
      const [date, time] = item.startTime.split("T");
      const [year, month, day] = date.split("-");
      const hour = time.slice(0, 2);
      return {
        ...item,
        year,
        month,
        day,
        hour,
        displayTime: time.slice(0, 5),
        score: Math.round(item.score * 100),
      };
    });
  }, [myID]);

  const years = Array.from(new Set(parsedData.map((d) => d.year)));
  const [selectedYear, setSelectedYear] = useState<string | "">("");
  const months = Array.from(
    new Set(
      parsedData.filter((d) => d.year === selectedYear).map((d) => d.month)
    )
  );
  const [selectedMonth, setSelectedMonth] = useState<string | "">("");
  const days = Array.from(
    new Set(
      parsedData
        .filter((d) => d.year === selectedYear && d.month === selectedMonth)
        .map((d) => d.day)
    )
  );
  const [selectedDay, setSelectedDay] = useState<string | "">("");

  const selectedSession =
    groupedByDateTicketWithSession[
      `${selectedYear}-${selectedMonth}-${selectedDay}`
    ]?.[selectedTicket] || null;

  return (
    <div className="bg-white border-0 rounded-lg w-full h-full flex flex-col justify-start items-center px-[10px]">
      <div className="w-full font-bold text-[15px] mt-[16px] ml-[25px] flex justify-start">
        내 공부 습관 분석지
      </div>
      <div className="w-full border-t-1 mt-[10px] mx-[18px]" />

      <div className="w-full h-full flex flex-col md:flex-row justify-start items-start gap-4 px-[10px]">
        <div className="w-full md:w-1/2 h-full">
          <div className="w-full font-medium text-[15px] mt-[20px] ml-[10px] mb-[10px] flex justify-start">
            ✅ 집중도 추이
          </div>
          <Concentrate
            data={parsedData}
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            selectedDay={selectedDay}
            setSelectedYear={setSelectedYear}
            setSelectedMonth={setSelectedMonth}
            setSelectedDay={setSelectedDay}
            years={years}
            months={months}
            days={days}
          />
        </div>

        <div className="w-full md:w-1/2 h-full">
          {groupedByDateTicketWithSession[
            `${selectedYear}-${selectedMonth}-${selectedDay}`
          ] && (
            <div className="w-full flex justify-start items-center gap-2 mt-4 ml-[10px]">
              <label className="text-sm font-medium">시간 선택:</label>
              <select
                className="border px-2 py-1 rounded text-sm"
                value={selectedTicket}
                onChange={(e) => setSelectedTicket(e.target.value)}
              >
                <option value="">선택</option>
                {Object.entries(
                  groupedByDateTicketWithSession[
                    `${selectedYear}-${selectedMonth}-${selectedDay}`
                  ] || {}
                ).map(([ticket, session]) => (
                  <option key={ticket} value={ticket}>
                    {session.startTime.slice(11, 16)} ~{" "}
                    {session.endTime.slice(11, 16)}
                  </option>
                ))}
              </select>
            </div>
          )}
          <ShowReport session={selectedSession} />
        </div>
      </div>
    </div>
  );
}
