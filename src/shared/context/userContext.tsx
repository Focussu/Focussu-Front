"use client";

import { MyInfo } from "@/shared/hook/api/useMember";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";

// 강제 reload trigger
export const ReloadContext = createContext<{
  reload: boolean;
  setReload: (v: boolean) => void;
} | null>(null);

export const useReload = () => {
  const context = useContext(ReloadContext);
  if (!context) throw new Error("useReload 에러");
  return context;
};

// Token 관리
export const TokenContext = createContext<{
  token: string | null;
} | null>(null);

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) throw new Error("useToken 에러");
  return context;
};

// 유저정보관리
export async function fetchAndSetUser(setUser: (user: any) => void) {
  try {
    const user = await MyInfo();
    if ("profileImageUrl" in user) {
      setUser({
        id: user.id,
        name: user.name,
        email: user.email,
        description: user.description,
        profileImageUrl: user.profileImageUrl,
      });
    }
  } catch (err) {
    console.error("유저 정보 초기화 실패", err);
  }
}
