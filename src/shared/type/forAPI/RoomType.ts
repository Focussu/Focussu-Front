// Study-Room, 스터디룸 관리 API

export interface StudyRoomResponse {
  name: string;
  description: string;
  maxCapacity: number;
}

// /studyrooms
// 모든 스터디룸 조회

export interface ForCallAllStudyRooms extends StudyRoomResponse {
  id: number;
  profileImageUrl: string;
}

export type CallAllStudyRoomResponse = ForCallAllStudyRooms[];

// /studyrooms, /studyrooms/{Id}
// 새로운 스터디룸 생성 / 단일 조회

export interface CreateNewStudyRoomRequest extends StudyRoomResponse {
  profileImageUrl: string;
}

export interface HitSuccessStudyRoomResponse extends StudyRoomResponse {
  id: number;
  profileImageUrl: string;
}

// /studyrooms/join/{id}
// 스터디룸 참가 => 새로운 스터디룸 가입

export interface BasicJoinStudyRoom {
  studyRoomId: number;
  memberId: number;
}

export interface SuccessJoinStudyRoom extends BasicJoinStudyRoom {}

export interface FailJoinStudyRoom extends BasicJoinStudyRoom {}

export interface JoinStudyRoomRequest {
  id: number;
}

// /studyrooms/my
// 내가 참가한 스터디룸 조회

export interface ForCallAllMyStudyrooms extends StudyRoomResponse {
  id: number;
  profileIamgeUrl: string;
}

export type CallAllMyStudyRoomResponse = ForCallAllMyStudyrooms[];
