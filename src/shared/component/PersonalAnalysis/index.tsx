"use client";

import { useQuery } from "@tanstack/react-query";

import { FindMyLog } from "@/shared/type/forAPI/AIType";
import { FindMyAILog } from "@/shared/hook/api/useAI";

export default function PersonalAnalysis() {
  const { data: myData } = useQuery<FindMyLog>({
    queryKey: ["My-AI-Analysis"],
    queryFn: () => FindMyAILog(),
    staleTime: 5 * 1000,
  });

  return (
    <div className="bg-white border-0 rounded-lg w-full h-full flex flex-col justify-start items-center px-[10px]">
      <div className="w-full font-bold text-[15px] mt-[16px] ml-[25px] flex justify-start">
        내 공부 습관 분석지
      </div>
      <div className="w-full border-t-1 mt-[10px] mx-[18px]"></div>
    </div>
  );
}
