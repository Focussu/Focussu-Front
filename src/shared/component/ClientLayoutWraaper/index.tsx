"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "@/shared/component/Header";
import NotLoginHeader from "@/shared/component/Header/NotLoginHeader";
import { ReloadContext, TokenContext } from "@/shared/context/userContext";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(null);
  const [reload, setReload] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  // 헤더가 숨겨져야 하는 경로 확인
  const shouldHideHeader = pathname.startsWith("/studyroom/");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    // 로그인 필요 없는 경로는 예외처리 (예: /login, /signup 등)
    const isPublicPath = ["/login", "/signup"].some((path) =>
      pathname.startsWith(path)
    );

    // token이 없고, 공개 경로도 아니면 강제 리다이렉트
    if (!storedToken && !isPublicPath) {
      router.replace("/login");
    }
  }, [reload, pathname, router]);

  return (
    <ReloadContext.Provider value={{ reload, setReload }}>
      <TokenContext.Provider value={{ token }}>
        {!shouldHideHeader && (token ? <Header /> : <NotLoginHeader />)}
        {children}
      </TokenContext.Provider>
    </ReloadContext.Provider>
  );
}
