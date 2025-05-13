"use client";

import { Geist, Geist_Mono } from "next/font/google";
import RoomHeader from "@/shared/component/RoomHeader";
import RoomFooter from "@/shared/component/RoomFooter";

import { useQuery } from "@tanstack/react-query";
import { FindParticipants } from "@/shared/hook/useStudyRoom";
import { HitSuccessParticipants } from "@/shared/type/forAPI/RoomType";

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
  const { data: participants } = useQuery<HitSuccessParticipants>({
    queryKey: ["FindParticipants"],
    queryFn: () => FindParticipants(1),
    staleTime: 5 * 1000,
  });

  console.log(participants);

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <div className="h-screen w-screen flex flex-col overflow-hidden">
        <div className="shrink-0">
          <RoomHeader />
        </div>
        <div className="flex-1 overflow-y-auto bg-[#959595]">{children}</div>
        <div className="shrink-0">
          <RoomFooter />
        </div>
      </div>
    </div>
  );
}
