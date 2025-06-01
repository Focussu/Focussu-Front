// Study Participation, 공부 시간 및 집중도 통계 API
export interface BasicResponse {
  memberId: number;
  startDate: string;
  endDate: string;
}

export interface BasicTimeResponse extends BasicResponse {
  seconds: number;
}

export interface BasicRateResponse extends BasicResponse {
  averageConcentration: number;
}

// /study/time/week
// 이번 주 공부 시간

export interface ThisWeekStudyTime extends BasicTimeResponse {}

// /study/time/total
// 총 공부 시간

export interface TotalStudyTime extends BasicTimeResponse {}

// /study/time/today
// 오늘 공부 시간

export interface TodayStudyTime extends BasicTimeResponse {}

// /study/time/today/other
// 특정 사람의 오늘 공부 시간

export interface OtherTodayStudyTime extends BasicTimeResponse {}

// /study/time/daily
// 일자별 공부 시간

export interface DailyBasicResponse {
  date: string;
  time: number;
}

export type DailyTimeResponse = DailyBasicResponse[];

// /study/inactive-seconds
// 최근 접속까지 걸린 시간

export interface HowRecentTime extends BasicTimeResponse {}

// /study/focused-time/week
// 이번 주 집중 시간

export interface ConThisWeekStudyTime extends BasicTimeResponse {}

// /study/focused-time/total
// 총 집중 시간

export interface ConTotalStudyTime extends BasicTimeResponse {}

// /study/focused-time/today
// 오늘 집중 시간

export interface ConTodayStudyTime extends BasicTimeResponse {}

// /study/concentration/week
// 이번 주 평균 집중도

export interface ThisWeekAvgRate extends BasicRateResponse {}

// /study/concentration/total
// 총 평균 집중도

export interface TotalWeekAvgRate extends BasicRateResponse {}

// /study/concentration/today
// 오늘 평균 집중도

export interface TodayAvgRate extends BasicRateResponse {}
