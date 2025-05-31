"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import Header from "@/shared/component/Header";
import NotLoginHeader from "@/shared/component/Header/NotLoginHeader";

import { ReloadContext, TokenContext } from "@/shared/context/userContext";
import { useUserStore } from "@/shared/store/setUserStore";
import { fetchAndSetUser } from "@/shared/context/userContext";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(null);
  const [reload, setReload] = useState<boolean>(false);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);

  const router = useRouter();
  const pathname = usePathname();
  const { setUser } = useUserStore();

  const shouldHideHeader = pathname.startsWith("/studyroom/");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    const isPublicPath = ["/login", "/signup"].some((path) =>
      pathname.startsWith(path)
    );

    if (!storedToken && !isPublicPath) {
      router.replace("/login");
    }

    if (storedToken) {
      fetchAndSetUser(setUser).finally(() => setLoadingUser(false));
    } else {
      setLoadingUser(false);
    }
  }, [reload, pathname, router, setUser]);

  return (
    <ReloadContext.Provider value={{ reload, setReload }}>
      <TokenContext.Provider value={{ token }}>
        {!shouldHideHeader && (token ? <Header /> : <NotLoginHeader />)}
        {children}
      </TokenContext.Provider>
    </ReloadContext.Provider>
  );
}
