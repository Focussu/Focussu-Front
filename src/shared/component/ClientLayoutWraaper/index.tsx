// Loot Layout에서 오직 정적인 처리만을 책임지게끔 클라이언트 전용 Wrapper 분해

"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "@/shared/component/Header";
import NotLoginHeader from "@/shared/component/Header/NotLoginHeader";
import { ReloadContext } from "@/shared/context/userContext";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(null);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [reload]);

  const pathname = usePathname();

  // StudyRoom 에서 헤더 변경
  const shouldHideHeader = pathname.startsWith("/studyroom/");

  return (
    <ReloadContext.Provider value={{ reload, setReload }}>
      {!shouldHideHeader && (token ? <Header /> : <NotLoginHeader />)}
      {children}
    </ReloadContext.Provider>
  );
}
