import UserProfile from "@/shared/component/UserProfile";
import React from "react";

export default function MyPage() {
  return (
    <div className="flex flex-row">
      <div className="flex-1 bg-red-200 flex justify-center">
        <UserProfile />
      </div>
      <div className="flex-1 bg-green-200"></div>
      <div className="flex-1 bg-blue-200 "></div>
    </div>
  );
}
