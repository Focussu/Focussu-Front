"use client";

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
