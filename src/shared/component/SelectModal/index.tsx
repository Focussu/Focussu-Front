import React from "react";
import { useRouter } from "next/navigation";

interface SelectModalProps {
  handleClose: () => void;
}

export default function SelectModal({ handleClose }: SelectModalProps) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="w-[800px] h-[660px] bg-white rounded-xl shadow-2xl p-[40px]">
        <div className="flex justify-center border-b pb-[20px] mb-[30px]">
          <div className="w-[480px] h-[280px] bg-gray-500"></div>
        </div>

        <div className="flex justify-between px-[20px] mb-[40px]">
          <div className="flex flex-col">
            <div className="text-[30px] font-semibold">JavaScript 잡아라</div>
            <div className="text-[20px] text-gray-600 mt-[10px]">
              총 인원 : 45/50
            </div>
            <div className="text-[20px] mt-[5px]">최종 점수 : 87.5점</div>
          </div>
          <div className="flex flex-col max-w-[270px]">
            <div className="text-[30px] font-semibold">세부 설명</div>
            <div className="text-[20px] text-gray-600 mt-[10px]">
              JavaScript에 대해서 같이 깊게 공부 하실 분을 구합니다. 아직 잘
              모르셔도 됩니다. 공부할 의지로 충분합니다.
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-[30px]">
          <button
            className="bg-black text-white text-[22px] px-6 py-2 rounded-lg hover:opacity-90"
            onClick={() => router.push("/mypage")}
          >
            참여
          </button>

          <button
            className="bg-gray-600 text-white text-[22px] px-6 py-2 rounded-lg hover:bg-gray-700"
            onClick={() => handleClose()}
          >
            나가기
          </button>
        </div>
      </div>
    </div>
  );
}
