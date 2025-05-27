"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { MakeStudyRoom } from "@/shared/hook/useStudyRoom";
import {
  CreateNewStudyRoomRequest,
  HitSuccessStudyRoomResponse,
} from "@/shared/type/forAPI/RoomType";
import uploadToCloudinary from "@/shared/util/MakeImageURL";

import {
  NameInput,
  DescriptionInput,
  MaxCapacityInput,
  ProfileImageUrlInput,
} from "@/shared/util/StudyRoomInput";
import InputWrapper from "./detail/InputWrapper";

import { CreateStudyRoomSchema } from "@/shared/schema/ForStudyRoomSchema";

export default function StudyInputForm() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [maxCapcity, setMaxCapacity] = useState<number>(0);
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");
  const [imageFile, setImageFile] = useState<File>();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const router = useRouter();

  const { mutate, data, isError } = useMutation<
    CreateNewStudyRoomRequest | HitSuccessStudyRoomResponse,
    Error,
    {
      name: string;
      description: string;
      maxCapcity: number;
      profileImageUrl: string;
    }
  >({
    mutationFn: ({ name, description, maxCapcity, profileImageUrl }) =>
      MakeStudyRoom(name, description, maxCapcity, profileImageUrl),
  });

  const handleCreate = async () => {
    const result = CreateStudyRoomSchema.safeParse({
      name,
      description,
      maxCapcity,
      profileImageUrl,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      const formatted = result.error.format();

      Object.entries(formatted).forEach(([key, value]) => {
        if (
          key !== "_erros" &&
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

    try {
      let finalImageUrl = profileImageUrl;

      if (imageFile) {
        finalImageUrl = await uploadToCloudinary(imageFile);
      }

      mutate({
        name,
        description,
        maxCapcity,
        profileImageUrl: finalImageUrl,
      });

      router.push("/studylist");
    } catch (err) {
      console.error("이미지 업로드 또는 방 생성 실패:", err);
    }
  };

  const inputs = [
    <>
      <NameInput name={name} setName={setName} />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
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
    <>
      <MaxCapacityInput
        maxCapacity={maxCapcity}
        setMaxCapacity={setMaxCapacity}
      />
      {errors.maxCapcity && (
        <p className="text-red-500 text-sm">{errors.maxCapcity}</p>
      )}
    </>,
    <>
      <ProfileImageUrlInput
        profileImageUrl={profileImageUrl}
        setProfileImageUrl={setProfileImageUrl}
        setImageFile={setImageFile}
      />
      {errors.profileImageUrl && (
        <p className="text-red-500 text-sm">{errors.profileImageUrl}</p>
      )}
    </>,
  ];

  return (
    <div>
      <div className="mx-[15px] mt-[15px] pb-[15px] px-[10px] border-b-1 text-black font-bold text-[18px]">
        Study With Me
      </div>
      <div className="flex flex-col gap-[25px] mx-[25px] mt-[22px]">
        {inputs.map((InputComponent, idx) => (
          <InputWrapper key={idx}>{InputComponent}</InputWrapper>
        ))}
        <button
          onClick={() => handleCreate()}
          className="bg-black text-white text-[15px] py-[10px] mt-[10px] rounded-lg"
        >
          스터디룸 생성하기
        </button>
      </div>
    </div>
  );
}
