// study-focus-analysis-controller, AI 분석

export interface BasicAnaylsis {
  id: number;
  ticketNumber: number;
  startTime: string;
  endTime: string;
  score: number;
}

// /ai-analysis/{ticket_id}
// 티켓 아이디에 해당하는 로그 조회

export type FindIndivLog = BasicAnaylsis[];

// /ai-analysis/my
// 내 로그 조회

export type FindMyLog = BasicAnaylsis[];
