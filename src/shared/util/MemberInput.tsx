import {
  NameInputProps,
  EmailInputProps,
  PasswordInputProps,
  PasswordCheckInputProps,
  DescriptionInputProps,
} from "@/shared/type/forDATA/ForSignUp";

export function NameInput({ name, setName }: NameInputProps) {
  return (
    <>
      <div className="text-[16px] text-black">이름</div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border-1 border-[#E0E0E0] rounded-lg h-[40px] pl-[10px] focus:outline-none focus:ring-0"
        placeholder="이름을 입력하세요."
      />
    </>
  );
}

export function EmailInput({ email, setEmail }: EmailInputProps) {
  return (
    <>
      <div className="text-[16px] text-black">아이디 ( Email )</div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border-1 border-[#E0E0E0] rounded-lg h-[40px] pl-[10px] focus:outline-none focus:ring-0"
        placeholder="아이디 ( Email ) 을 입력하세요."
      />
    </>
  );
}

export function PasswordInput({ password, setPassword }: PasswordInputProps) {
  return (
    <>
      <div className="text-[16px] text-black">비밀번호</div>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border-1 border-[#E0E0E0] rounded-lg h-[40px] pl-[10px] focus:outline-none focus:ring-0"
        placeholder="비밀번호를 입력하세요."
      />
    </>
  );
}

export function PasswordCheckInput({
  passwordCheck,
  setPasswordCheck,
}: PasswordCheckInputProps) {
  return (
    <>
      <div className="text-[16px] text-black">비밀번호 확인</div>
      <input
        type="password"
        value={passwordCheck}
        onChange={(e) => setPasswordCheck(e.target.value)}
        className="border-1 border-[#E0E0E0] rounded-lg h-[40px] pl-[10px] focus:outline-none focus:ring-0"
        placeholder="동일한 비밀번호를 입력하세요."
      />
    </>
  );
}

export function DescriptionInput({
  description,
  setDescription,
}: DescriptionInputProps) {
  return (
    <>
      <div className="text-[16px] text-black">내 소개</div>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border-1 border-[#E0E0E0] rounded-lg h-[40px] pl-[10px] focus:outline-none focus:ring-0"
        placeholder="나에 대한 소개를 해주세요."
      />
    </>
  );
}
