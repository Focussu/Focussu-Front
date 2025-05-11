import React from "react";

import SignUp from "@/shared/component/SignUp";

export default function LoginPage() {
  return (
    <div className="bg-[#E6E6E6] w-[1440px] h-[780px] flex justify-center items-center">
      <div className="w-[480px] h-[660px] bg-white rounded-lg flex flex-col">
        <SignUp />
      </div>
    </div>
  );
}
