import { useEffect } from "react";

import { MyInfo } from "@/shared/hook/api/useMember";
import { useUserStore } from "@/shared/store/setUserStore";

export function useInitUser() {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await MyInfo();
        if ("profileImageUrl" in user) {
          setUser({
            id: user.id,
            name: user.name,
            email: user.email,
            description: user.description,
            profileImageUrl: user.profileImageUrl,
          });
        }
        console.log(user);
      } catch (err) {
        console.error("유저 정보 초기화 실패", err);
      }
    };

    fetchUser();
  }, []);
}
