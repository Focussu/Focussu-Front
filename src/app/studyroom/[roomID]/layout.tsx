"use client";

import { Geist, Geist_Mono } from "next/font/google";
import RoomHeader from "@/shared/component/RoomHeader";
import RoomFooter from "@/shared/component/RoomFooter";

import { WebRTCProvider } from "@/shared/context/webRTCContext";
import { useUserStore } from "@/shared/store/setUserStore";

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

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {user && (
        <WebRTCProvider
          roomId="1"
          userId={user.id.toString()}
          socketUrl={SIGNAL_URL}
        >
          <div className="h-screen w-screen flex flex-col overflow-hidden">
            <div className="shrink-0">
              <RoomHeader />
            </div>
            <div className="flex-1 overflow-y-auto bg-[#959595]">
              {children}
            </div>
            <div className="shrink-0">
              <RoomFooter />
            </div>
          </div>
        </WebRTCProvider>
      )}
    </div>
  );
}
