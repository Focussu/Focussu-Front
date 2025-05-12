// Study-Room, 스터디룸 관리 API

export interface StudyRoomResponse {
  name: string;
  description: string;
  maxCapacity: number;
}

// /studyrooms, /studyrooms/{Id}
// 새로운 스터디룸 생성/조회

export interface CreateNewStudyRoomRequest extends StudyRoomResponse {
  profileImageUrl: string;
}

export interface HitSuccessStudyRoomResponse extends StudyRoomResponse {
  id: number;
}

// /api/study-rooms/{roomId}/participants
// 스터디룸에 참여한 사용자들

export interface HitSuccessParticipants {
  participants: Array<string>;
}
