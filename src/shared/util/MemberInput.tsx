"use client";

import { useRef } from "react";

import {
  NameInputProps,
  EmailInputProps,
  PasswordInputProps,
  PasswordCheckInputProps,
  DescriptionInputProps,
  ProfileImageUrlInputProps,
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

export function ProfileImageUrlInput({
  profileImageUrl,
  setProfileImageUrl,
  setImageFile,
}: ProfileImageUrlInputProps) {
  const dropRef = useRef<HTMLDivElement | null>(null);

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      try {
        const objectUrl = URL.createObjectURL(file);
        setProfileImageUrl(objectUrl);
        setImageFile(file);
      } catch (err) {
        console.error("업로드 실패:", err);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="text-[16px] text-black">대표 사진</div>
      {profileImageUrl === null ? (
        <img
          src={profileImageUrl}
          alt="대표 사진 미리보기"
          className="mt-3 w-full h-auto max-h-[200px] object-contain rounded-md"
        />
      ) : (
        <div
          ref={dropRef}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="w-full h-[120px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500 cursor-pointer mb-3"
        >
          드래그 앤 드롭으로 이미지를 업로드하세요
        </div>
      )}
      <input
        type="text"
        value={profileImageUrl}
        onChange={(e) => setProfileImageUrl(e.target.value)}
        className="hidden"
      />
    </>
  );
}
