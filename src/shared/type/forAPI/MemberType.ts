// Member, 회원가입/조회/탈퇴 관련 API

export interface MemberBasicSchema {
  name: string;
  email: string;
  description: string;
  profileImageUrl: string;
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

// /api/members/my
// 내 정보 조회

export interface FindMyInfo extends MemberBasicSchema {
  id: number;
}

// /api/members/member-id
// 이메일로 내 member-id 조회

export interface FindId {
  member_id: number;
}
