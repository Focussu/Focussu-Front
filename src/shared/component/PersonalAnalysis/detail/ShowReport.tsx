"use client";

import { useQuery } from "@tanstack/react-query";
import { MyAIReportResponse } from "@/shared/type/forAPI/AIType";
import { FindMyReport } from "@/shared/hook/api/useAI";

type SessionData = {
  startTime: string;
  endTime: string;
  logs: {
    id: number;
    ticketNumber: number;
    startTime: string;
    endTime: string;
    score: number;
  }[];
};

export default function ShowReport({
  session,
}: {
  session: SessionData | null;
}) {
  if (!session) return null;

  const avgScore =
    session.logs.reduce((acc, cur) => acc + cur.score, 0) / session.logs.length;

  const ticketNumber = session.logs[0]?.ticketNumber;

  const { data: myPost } = useQuery<MyAIReportResponse>({
    queryKey: ["Find-My-Post", ticketNumber],
    queryFn: () => FindMyReport(ticketNumber),
    enabled: !!ticketNumber,
    staleTime: 5 * 1000,
  });

  const defaultFeedback =
    "⚠️ 충분한 데이터가 없어 AI 분석 피드백을 제공하기 어렵습니다.\n다음에는 조금 더 긴 세션을 기록해보세요!";

  const feedback =
    myPost && myPost[0]?.content?.trim() ? myPost[0].content : defaultFeedback;

  return (
    <div className="w-full h-full p-2 md:p-4 flex flex-col gap-4 text-sm text-gray-800">
      <div className="text-base md:text-lg font-semibold mb-2">
        📄 AI 분석 보고서
      </div>

      <div className="bg-gray-100 rounded-xl p-3 md:p-4 shadow-sm">
        <div className="font-bold mb-1">📌 평균 집중도</div>
        <p>{Math.round(avgScore * 100)}점</p>
      </div>

      <div className="bg-gray-100 rounded-xl p-3 md:p-4 shadow-sm">
        <div className="font-bold mb-1">💡 분석 기반 피드백</div>
        <div className="whitespace-pre-wrap">{feedback}</div>
      </div>
    </div>
  );
}
