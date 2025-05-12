"use client";

import {
  LoginRequestSchema,
  LoginSuccessResponse,
  LoginFailResponse,
  LogoutSuccessResponse,
  LogoutFailResponse,
} from "@/shared/type/forAPI/LoginType";

export const LogIn = async (email: string, password: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      } satisfies LoginRequestSchema),
    }
  );
  return (await res.json()) as LoginSuccessResponse | LoginFailResponse;
};

// /auth/login, 로그인
/*
const { data: user } = useQuery<LoginSuccessResponse | LoginFailResponse>({
  queryKey: ["Log-In"],
  queryFn: () => LogIn(),
  staleTime: 5 * 1000,
});
*/

export const LogOut = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}auth/logout`,
    {
      method: "POST",
    }
  );
  return (await res.json()) as LogoutSuccessResponse | LogoutFailResponse;
};

// /auth/logout, 로그아웃
/*
const { data } = useQuery<LogoutSuccessResponse | LogoutFailResponse>({
  queryKey: ["Log-Out"],
  queryFn: () => LogOut(),
  staleTime: 5 * 1000,
});
*/
