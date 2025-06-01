import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";

import ClientLayoutWrapper from "@/shared/component/ClientLayoutWraaper";
import { AnalyzeAIProvider } from "@/shared/context/analyzeAIContext";
import Providers from "@/shared/util/provider";

export const metadata: Metadata = {
  title: "FocuSSU",
  description: "공부해요",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black min-h-screen`}
      >
        <AnalyzeAIProvider autoStart autoDetect>
          <Providers>
            <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
          </Providers>
        </AnalyzeAIProvider>
      </body>
    </html>
  );
}
