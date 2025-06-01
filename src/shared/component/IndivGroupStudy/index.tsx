"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { FindMyLog } from "@/shared/type/forAPI/AIType";
import { FindMyAILog } from "@/shared/hook/api/useAI";
import { initCam } from "@/shared/hook/function/useGetWebCam";
import {
  ConThisWeekStudyTime,
  ConTodayStudyTime,
  ThisWeekStudyTime,
  TodayStudyTime,
} from "@/shared/type/forAPI/StudyType";
import {
  FindConThisWeekStudyTime,
  FindConTodayStudyTime,
  FindThisWeekStudyTime,
  FindTodayStudyTime,
} from "@/shared/hook/api/useStudyPart";
import { formatDate } from "@/shared/util/formatDate";

import { useAnalyzeAI } from "@/shared/context/analyzeAIContext";

export default function IndivGroupStudy() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const value = useAnalyzeAI();

  const { data: thisWeekTime } = useQuery<ThisWeekStudyTime>({
    queryKey: ["This-Week-Time"],
    queryFn: () => FindThisWeekStudyTime(),
    staleTime: 5 * 1000,
  });

  const { data: todayTime } = useQuery<TodayStudyTime>({
    queryKey: ["Today-Time"],
    queryFn: () => FindTodayStudyTime(),
    staleTime: 5 * 1000,
  });

  const { data: myData } = useQuery<FindMyLog>({
    queryKey: ["My-AI-Analysis"],
    queryFn: () => FindMyAILog(),
    staleTime: 5 * 1000,
  });

  const { data: weekFocusTime } = useQuery<ConThisWeekStudyTime>({
    queryKey: ["Week-Focus-Time"],
    queryFn: () => FindConThisWeekStudyTime(),
    staleTime: 5 * 1000,
  });

  const { data: todayFocusTime } = useQuery<ConTodayStudyTime>({
    queryKey: ["Today-Focus-Time"],
    queryFn: () => FindConTodayStudyTime(),
    staleTime: 5 * 1000,
  });

  useEffect(() => {
    initCam(videoRef);
  }, []);

  const formattedData = useMemo(() => {
    if (!myData) return [];
    return myData.map((item) => {
      const time = item.startTime.split("T")[1].slice(0, 5);
      return {
        time,
        score: Math.round(item.score * 100),
      };
    });
  }, [myData]);

  return (
    <div className="w-full max-w-[80%] mx-auto bg-white rounded-xl py-10 px-6 md:px-12 lg:px-16">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <video
            ref={videoRef}
            autoPlay
            muted
            className="w-full aspect-[16/9] rounded-lg bg-gray-500 object-cover"
          />
        </div>

        <div className="w-full lg:w-1/3 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap gap-2 items-center mb-4">
              <h2 className="text-xl md:text-2xl font-bold">오승민</h2>
              <span className="px-2 py-1 text-xs sm:text-sm rounded border border-gray-400">
                ✅ 현재 활동 중
              </span>
            </div>
            <div className="text-sm sm:text-base space-y-1">
              {thisWeekTime && "seconds" in thisWeekTime && (
                <p>금주 공부시간 : {formatDate(thisWeekTime.seconds)}</p>
              )}
              {todayTime && "seconds" in todayTime && (
                <p>오늘 공부시간 : {formatDate(todayTime.seconds)}</p>
              )}

              <div className="w-full border-b-black h-0.5"></div>

              {weekFocusTime && "seconds" in weekFocusTime && (
                <p>금주 집중시간 : {formatDate(weekFocusTime.seconds)}</p>
              )}
              {todayFocusTime && "seconds" in todayFocusTime && (
                <p>오늘 집중시간 : {formatDate(todayFocusTime.seconds)}</p>
              )}

              <div className="w-full border-b-black h-0.5"></div>

              <p>
                현재 집중도 :{" "}
                {value.aiResponse?.confidence
                  ? Math.round(Number(value.aiResponse.confidence) * 10000) /
                    100
                  : 0}
                점
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold text-sm sm:text-base mb-2">
              오승민 님의 공부 습관 분석지
            </h3>
            <hr className="border-t border-gray-300 mb-4" />
            <ResponsiveContainer width="100%" height={180}>
              <LineChart
                data={formattedData}
                margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tick={{ fontSize: 10 }} />
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
          </div>
        </div>
      </div>
    </div>
  );
}
