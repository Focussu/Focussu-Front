import { z } from "zod";

// 회원가입을 위한 스키마
export const signUpSchema = z
  .object({
    name: z.string().min(2, "이름은 2자 이상이어야 합니다."),
    email: z.string().email("올바른 이메일 형식이 아닙니다."),
    password: z.string().min(6, "비밀번호는 6자 이상이어야 합니다."),
    passwordCheck: z.string(),
    description: z.string().max(100, "소개는 최대 100자까지 가능합니다."),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

// 로그인을 위한 스키마
export const loginSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
  password: z.string().min(6, "비밀번호는 6자 이상이어야 합니다."),
});
