"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useWebCamWithFaceLandmarker } from "../hook/function/useWebCamWithFaceLandmarker";

const AnalyzeAIContext = createContext<ReturnType<
  typeof useWebCamWithFaceLandmarker
> | null>(null);

export function AnalyzeAIProvider({
  children,
  autoStart = true,
  autoDetect = true,
}: {
  children: React.ReactNode;
  autoStart?: boolean;
  autoDetect?: boolean;
}) {
  const value = useWebCamWithFaceLandmarker();

  return (
    <AnalyzeAIContext.Provider value={value}>
      {children}
    </AnalyzeAIContext.Provider>
  );
}

export function useAnalyzeAI() {
  const context = useContext(AnalyzeAIContext);
  if (!context)
    throw new Error("useAnalyzeAI must be used within AnalyzeAIProvider");
  return context;
}
