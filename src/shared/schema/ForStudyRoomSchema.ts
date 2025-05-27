import { z } from "zod";

// 스터디룸 생성을 위한 스키마
export const CreateStudyRoomSchema = z.object({
  name: z.string().min(2, "이름은 2자 이상이어야 합니다."),
  description: z.string().max(100, "소개는 최대 100자까지 가능합니다."),
  maxCapcity: z
    .number()
    .int()
    .min(10, "인원은 최소 10명입니다.")
    .max(100, "인원은 최대 100명까지 가능합니다."),
  profileImageUrl: z.string(),
});
