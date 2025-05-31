"use client";

import React, { createContext, useContext } from "react";
import { useWebRTCManager } from "../hook/function/useWebRTCManager";

const WebRTCContext = createContext<ReturnType<typeof useWebRTCManager> | null>(
  null
);

export function WebRTCProvider({
  children,
  roomId,
  userId,
  socketUrl,
}: {
  children: React.ReactNode;
  roomId: string;
  userId: string;
  socketUrl: string;
}) {
  const value = useWebRTCManager(roomId, userId, socketUrl);

  return (
    <WebRTCContext.Provider value={value}>{children}</WebRTCContext.Provider>
  );
}

export function useWebRTC() {
  const context = useContext(WebRTCContext);
  if (!context) throw new Error("useWebRTC must be used within WebRTCProvider");
  return context;
}
