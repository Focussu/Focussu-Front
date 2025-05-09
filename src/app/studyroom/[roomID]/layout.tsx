import { Geist, Geist_Mono } from "next/font/google";
import RoomHeader from "@/shared/component/RoomHeader";
import RoomFooter from "@/shared/component/RoomFooter";

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
