"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: any[];
  selectedYear: string;
  selectedMonth: string;
  selectedDay: string;
  setSelectedYear: (year: string) => void;
  setSelectedMonth: (month: string) => void;
  setSelectedDay: (day: string) => void;
  years: string[];
  months: string[];
  days: string[];
};

export default function Concentrate({
  data,
  selectedYear,
  selectedMonth,
  selectedDay,
  setSelectedYear,
  setSelectedMonth,
  setSelectedDay,
  years,
  months,
  days,
}: Props) {
  const filteredData = data.filter(
    (d) =>
      d.year === selectedYear &&
      d.month === selectedMonth &&
      d.day === selectedDay
  );

  return (
    <>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart
          data={filteredData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="displayTime" tick={{ fontSize: 10 }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} unit="점" />
          <Tooltip formatter={(value) => `${value}점`} />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#30a14e"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="flex items-center justify-center gap-2 text-sm flex-wrap">
        <div>
          <label className="mr-1">년도:</label>
          <select
            className="border px-2 py-1 rounded"
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setSelectedMonth("");
              setSelectedDay("");
            }}
            value={selectedYear}
          >
            <option value="">선택</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mr-1">월:</label>
          <select
            className="border px-2 py-1 rounded"
            onChange={(e) => {
              setSelectedMonth(e.target.value);
              setSelectedDay("");
            }}
            value={selectedMonth}
            disabled={!selectedYear}
          >
            <option value="">선택</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mr-1">일:</label>
          <select
            className="border px-2 py-1 rounded"
            onChange={(e) => setSelectedDay(e.target.value)}
            value={selectedDay}
            disabled={!selectedMonth}
          >
            <option value="">선택</option>
            {days.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
