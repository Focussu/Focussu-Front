// Authentication, 필터 기반 로그인/로그아웃 명세

export interface LogResponse {
  message: string;
}

// /auth/login
// 로그인 요청을 처리하는 필터(LoginFilter)에서 동작

export interface LoginRequestSchema {
  email: string;
  password: string;
}

export interface LoginSuccessResponse {
  accessToken: string;
}

export interface LoginFailResponse extends LogResponse {
  status: number;
  code: string;
  isSuccess: boolean;
}

// /auth/logout
// 로그아웃 요청(LogoutHandler)에서 동작

export interface LogoutSuccessResponse extends LogResponse {}

export interface LogoutFailResponse extends LogResponse {
  status: number;
  code: string;
  isSuccess: boolean;
}
