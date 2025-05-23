// Test, 보안 및 상태 확인용 테스트 API
export interface TestResponse {
  message: string;
}

// /test/health-check API
// 서버가 정상 작동 중인지 확인하는 공개 엔드포인트

export interface TestSuccesResponse {}

export interface TestFailResponse {
  status: number;
  message: string;
  code: string;
  isSuccess: boolean;
}

// /test/security-check API
// JWT 토큰이 올바르게 작동하는지 확인하는 엔드포인트

export interface JWTSuccessTestResponse extends TestResponse {}

export interface JWTFailTestResponse extends TestResponse {
  status: number;
  message: string;
  code: string;
  isSuccess: boolean;
}
