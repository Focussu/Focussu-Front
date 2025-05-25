"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { JoinMember } from "@/shared/hook/useMember";
import {
  MemberJoinSuccessResponse,
  IsExistingEmailResponse,
} from "@/shared/type/forAPI/MemberType";

import {
  NameInput,
  EmailInput,
  PasswordInput,
  PasswordCheckInput,
  DescriptionInput,
} from "../../util/inputComponents";
import InputWrapper from "./detail/InputWrapper";

import { signUpSchema } from "@/shared/schema/ForLoginSchema";

export default function SignUp() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const router = useRouter();

  const { mutate, data, isError } = useMutation<
    MemberJoinSuccessResponse | IsExistingEmailResponse,
    Error,
    { name: string; email: string; password: string }
  >({
    mutationFn: ({ name, email, password }) =>
      JoinMember(name, email, password),
  });

  const handleSignUp = () => {
    const result = signUpSchema.safeParse({
      name,
      email,
      password,
      passwordCheck,
      description,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      const formatted = result.error.format();

      Object.entries(formatted).forEach(([key, value]) => {
        if (
          key !== "_errors" &&
          typeof value === "object" &&
          value !== null &&
          "_errors" in value &&
          Array.isArray((value as any)._errors)
        ) {
          fieldErrors[key] = (value as any)._errors[0];
        }
      });

      setErrors(fieldErrors);
      return;
    }

    mutate({ name, email, password });
    router.push("/login");
  };

  const inputs = [
    <>
      <NameInput name={name} setName={setName} />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
    </>,
    <>
      <EmailInput email={email} setEmail={setEmail} />{" "}
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
    </>,
    <>
      <PasswordInput password={password} setPassword={setPassword} />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password}</p>
      )}
    </>,
    <>
      <PasswordCheckInput
        passwordCheck={passwordCheck}
        setPasswordCheck={setPasswordCheck}
      />
      {errors.passwordCheck && (
        <p className="text-red-500 text-sm">{errors.passwordCheck}</p>
      )}
    </>,
    <>
      <DescriptionInput
        description={description}
        setDescription={setDescription}
      />
      {errors.description && (
        <p className="text-red-500 text-sm">{errors.description}</p>
      )}
    </>,
  ];

  return (
    <div>
      <div className="mx-[15px] mt-[15px] pb-[15px] px-[10px] border-b-1 text-black font-bold text-[18px]">
        회원가입
      </div>
      <div className="flex flex-col gap-[25px] mx-[25px] mt-[22px]">
        {inputs.map((InputComponent, idx) => (
          <InputWrapper key={idx}>{InputComponent}</InputWrapper>
        ))}
        <button
          onClick={() => handleSignUp()}
          className="bg-black text-white text-[15px] py-[10px] mt-[10px] rounded-lg"
        >
          회원가입 하기
        </button>
      </div>
    </div>
  );
}
