import Concentrate from "@/shared/component/PersonalAnalysis/detail/Concentrate";

export default function PersonalAnalysis() {
  return (
    <div className="bg-white border-0 rounded-lg w-full h-full flex flex-col justify-start items-center px-[10px]">
      <div className="w-full font-bold text-[15px] mt-[16px] ml-[25px] flex justify-start">
        내 공부 습관 분석지
      </div>
      <div className="w-full border-t-1 mt-[10px] mx-[18px]" />
      <div className="w-full font-medium text-[15px] mt-[20px] ml-[25px] mb-[10px] flex justify-start">
        ✅ 집중도 추이
      </div>
      <div className="w-full h-full justify-start items-center flex flex-row">
        <div className="w-1/2 h-full justify-center items-center">
          <Concentrate />
        </div>
        <div className="w-1/2 h-full"></div>
      </div>
    </div>
  );
}
