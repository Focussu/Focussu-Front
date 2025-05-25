"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { MakeStudyRoom } from "@/shared/hook/useStudyRoom";
import {
  CreateNewStudyRoomRequest,
  HitSuccessStudyRoomResponse,
} from "@/shared/type/forAPI/RoomType";

import { CreateStudyRoomSchema } from "@/shared/schema/ForStudyRoomSchema";

export default function StudyInputForm() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [maxCapcity, setMaxCapacity] = useState<number>(0);
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");
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

  const handleCreate = () => {
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

    mutate({ name, description, maxCapcity, profileImageUrl });
    router.push("/studylist");
  };

  const inputs = [<></>];

  return (
    <div>
      <div className="mx-[15px] mt-[15px] pb-[15px] px-[10px] border-b-1 text-black font-bold text-[18px]">
        Study With me
      </div>
      <div className="flex flex-col gap-[25px] mx-[25px] mt-[22px]">
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
