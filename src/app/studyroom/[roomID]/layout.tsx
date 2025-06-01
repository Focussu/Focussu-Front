"use client";

import { Geist, Geist_Mono } from "next/font/google";
import RoomHeader from "@/shared/component/RoomHeader";
import RoomFooter from "@/shared/component/RoomFooter";

import { useState, useEffect } from "react";
import { WebRTCProvider } from "@/shared/context/webRTCContext";
import { useUserStore } from "@/shared/store/setUserStore";
import { useAnalyzeAI } from "@/shared/context/analyzeAIContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function StudyroomLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user } = useUserStore();
  const SIGNAL_URL = process.env.NEXT_PUBLIC_SIGNAL_SERVER_URL!;

  const value = useAnalyzeAI();

  const [autoStart, setAutoStart] = useState<boolean>(true);

  useEffect(() => {
    if (autoStart) {
      value.startWebcam();
    }
  }, [autoStart, value.startWebcam]);

  const handleStartWebcam = async () => {
    await value.startWebcam();
  };

  const handleStopWebcam = () => {
    value.stopWebcam();
  };

  const handleToggleDetection = () => {
    value.toggleLandmarkDetection();
  };

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {user && (
        <WebRTCProvider roomId="1" userId={user.email} socketUrl={SIGNAL_URL}>
          <div className="h-screen w-screen flex flex-col overflow-hidden">
            <div className="shrink-0">
              <RoomHeader />
            </div>
            <div className="flex-1 overflow-y-auto bg-[#959595]">
              {children}
            </div>
            <div className="shrink-0">
              <RoomFooter
                handleStartWebcam={handleStartWebcam}
                handleStopWebcam={handleStopWebcam}
                handleToggleDetection={handleToggleDetection}
              />
            </div>
          </div>
        </WebRTCProvider>
      )}
    </div>
  );
}
