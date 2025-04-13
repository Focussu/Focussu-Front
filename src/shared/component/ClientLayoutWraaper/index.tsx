// Loot Layout에서 오직 정적인 처리만을 책임지게끔 클라이언트 전용 Wrapper 분해

"use client";

import { usePathname } from "next/navigation";
import Header from "@/shared/component/Header";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const shouldHideHeader = pathname.startsWith("/studyroom/");

  return (
    <>
      {!shouldHideHeader && <Header />}
      {children}
    </>
  );
}
