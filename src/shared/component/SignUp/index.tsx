import React from "react";

export default function SignUp() {
  return (
    <div>
      <div className="mx-[15px] mt-[15px] pb-[15px] px-[10px] border-b-1 text-black font-bold text-[18px]">
        회원가입
      </div>
      <div className="flex flex-col gap-[25px] mx-[25px] mt-[22px]">
        <div className="flex flex-col gap-[10px]">
          <div className="text-[16px] text-black">이름</div>
          <input
            type="text"
            className="border-1 border-[#E0E0E0] rounded-lg h-[40px] pl-[10px] focus:outline-none focus:ring-0"
            placeholder="이름을 입력하세요."
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <div className="text-[16px] text-black">아이디 ( Email )</div>
          <input
            type="email"
            className="border-1 border-[#E0E0E0] rounded-lg h-[40px] pl-[10px] focus:outline-none focus:ring-0"
            placeholder="아이디 ( Email ) 을 입력하세요."
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <div className="text-[16px] text-black">비밀번호</div>
          <input
            type="password"
            className="border-1 border-[#E0E0E0] rounded-lg h-[40px] pl-[10px] focus:outline-none focus:ring-0"
            placeholder="비밀번호를 입력하세요."
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <div className="text-[16px] text-black">비밀번호 확인</div>
          <input
            type="password"
            className="border-1 border-[#E0E0E0] rounded-lg h-[40px] pl-[10px] focus:outline-none focus:ring-0"
            placeholder="동일한 비밀번호를 입력하세요."
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <div className="text-[16px] text-black">내 소개</div>
          <input
            type="text"
            className="border-1 border-[#E0E0E0] rounded-lg h-[40px] pl-[10px] focus:outline-none focus:ring-0"
            placeholder="나에 대한 소개를 해주세요."
          />
        </div>
        <button className="bg-black text-white text-[15px] py-[10px] mt-[10px] rounded-lg">
          회원가입 하기
        </button>
      </div>
    </div>
  );
}
