import SignUp from "@/shared/component/SignUp";

export default function SignupPage() {
  return (
    <div className="h-[calc(100vh-121px)] w-full flex items-center justify-center lg:flex-row bg-[#E6E6E6]">
      <div className="w-full max-w-[600px] bg-white rounded-xl shadow-md p-8">
        <SignUp />
      </div>
    </div>
  );
}
