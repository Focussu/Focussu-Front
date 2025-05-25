"use client";

import React, { useState } from "react";
import Image from "next/image";

import { EmailInput, PasswordInput } from "@/shared/util/inputComponents";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("로그인 시도", { email, password });
  };

  const inputs = [
    <EmailInput email={email} setEmail={setEmail} />,
    <PasswordInput password={password} setPassword={setPassword} />,
  ];

  return (
    <div className="w-full max-w-[480px] sm:mx-auto px-8 py-12 bg-white rounded-2xl shadow-md flex flex-col items-center">
      <Image
        className="dark:invert"
        src="/FocuSSUlogo.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />

      <div className="w-full flex flex-col gap-5">
        {inputs.map((InputComponent, idx) => (
          <div key={idx} className="flex flex-col gap-3">
            {InputComponent}
          </div>
        ))}

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
        >
          로그인
        </button>
      </div>

      <div className="w-full border-t border-gray-200 mt-8 pt-4 text-sm text-center text-gray-600 flex justify-between px-2">
        <a href="#" className="hover:underline">
          아이디 찾기
        </a>
        <a href="#" className="hover:underline">
          비밀번호 찾기
        </a>
        <a href="/signup" className="hover:underline">
          회원가입
        </a>
      </div>
    </div>
  );
}
