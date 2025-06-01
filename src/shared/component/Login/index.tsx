"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";

import { EmailInput, PasswordInput } from "@/shared/util/MemberInput";
import { LogIn } from "@/shared/hook/api/useAuthentication";
import { useReload, fetchAndSetUser } from "@/shared/context/userContext";
import { useUserStore } from "@/shared/store/setUserStore";

import {
  LoginSuccessResponse,
  LoginFailResponse,
} from "@/shared/type/forAPI/LoginType";
import { loginSchema } from "@/shared/schema/ForLoginSchema";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { reload, setReload } = useReload();
  const { setUser } = useUserStore();

  const router = useRouter();

  const { mutate, data } = useMutation<
    LoginSuccessResponse | LoginFailResponse,
    Error,
    { email: string; password: string }
  >({
    mutationFn: ({ email, password }) => LogIn(email, password),
    onSuccess: async (data) => {
      if ("accessToken" in data) {
        localStorage.setItem("token", data.accessToken);

        await fetchAndSetUser(setUser);
        router.push("/");
        setReload(!reload);
      }
    },
  });

  const handleLogin = () => {
    const result = loginSchema.safeParse({
      email,
      password,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      const formatted = result.error.format();

      Object.entries(formatted).forEach(([key, value]) => {
        if (
          key !== "_errors" &&
          typeof value === "object" &&
          value !== null &&
          "_errors" in value &&
          Array.isArray((value as any)._errors)
        ) {
          fieldErrors[key] = (value as any)._errors[0];
        }
      });

      setErrors(fieldErrors);
      return;
    }

    mutate({ email, password });
  };

  const inputs = [
    <>
      <EmailInput email={email} setEmail={setEmail} />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
    </>,
    <>
      <PasswordInput password={password} setPassword={setPassword} />{" "}
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password}</p>
      )}
    </>,
  ];

  const menu = [
    <a href="#" className="hover:underline">
      아이디 찾기
    </a>,
    <a href="#" className="hover:underline">
      비밀번호 찾기
    </a>,
    <a href="/signup" className="hover:underline">
      회원가입
    </a>,
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
        {menu.map((MenuComponent, idx) => (
          <>{MenuComponent}</>
        ))}
      </div>
    </div>
  );
}
