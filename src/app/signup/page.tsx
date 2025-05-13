import React from "react";

import SignUp from "@/shared/component/SignUp";

export default function SignupPage() {
  return (
    <div className="h-[calc(100vh-121px)] w-full flex items-center justify-center lg:flex-row bg-[#E6E6E6]">
      <div className="w-[480px] h-[660px] bg-white rounded-lg flex flex-col">
        <SignUp />
      </div>
    </div>
  );
}
