// Member, 회원가입/조회/탈퇴 관련 API

export interface MemberBasicSchema {
  name: string;
  email: string;
}

export interface MemberErrorResponse {
  status: number;
  message: string;
  code: string;
  isSuccess: boolean;
}

// /api/members/join
// 신규 회원을 등록

export interface MemberJoinRequest extends MemberBasicSchema {
  password: string;
}

export interface MemberJoinSuccessResponse extends MemberBasicSchema {
  id: number;
}

export interface IsExistingEmailResponse extends MemberErrorResponse {}

// /api/members/{memberId}
// 회원 ID로 회원 정보를 조회 / 삭제

export interface HitSuccessResponse extends MemberBasicSchema {
  id: number;
}

export interface NotExistingMemberResponse extends MemberErrorResponse {}
