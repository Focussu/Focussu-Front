"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type ElapsedTimeControl = {
  elapsedTime: number;
  pause: () => void;
  resume: () => void;
  reset: () => void;
};

const ElapsedTimeContext = createContext<ElapsedTimeControl | null>(null);

export const useElapsedTime = () => {
  const context = useContext(ElapsedTimeContext);
  if (!context)
    throw new Error("useElapsedTime must be used within a ElapsedTimeProvider");
  return context;
};

export function ElapsedTimeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const pause = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const resume = () => {
    if (!timerRef.current) startTimer();
  };

  const reset = () => {
    setElapsedTime(0);
    if (timerRef.current) clearInterval(timerRef.current);
    startTimer();
  };

  return (
    <ElapsedTimeContext.Provider value={{ elapsedTime, pause, resume, reset }}>
      {children}
    </ElapsedTimeContext.Provider>
  );
}
