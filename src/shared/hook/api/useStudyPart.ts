import {
  ThisWeekStudyTime,
  TotalStudyTime,
  TodayStudyTime,
  OtherTodayStudyTime,
  DailyTimeResponse,
  HowRecentTime,
  ConThisWeekStudyTime,
  ConTotalStudyTime,
  ConTodayStudyTime,
  ThisWeekAvgRate,
  TotalWeekAvgRate,
  TodayAvgRate,
} from "@/shared/type/forAPI/StudyType";

/*
const { data } = useQuery<반환하고자 하는 Interface>({
  queryKey: ["..."],
  queryFn: () => 사용할 API 함수명(),
  staleTime: 5 * 1000,
});
*/

export const FindThisWeekStudyTime = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}study/time/week`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return (await res.json()) as ThisWeekStudyTime;
};

export const FindTotalStudyTime = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}study/time/total`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (await res.json()) as TotalStudyTime;
};

export const FindTodayStudyTime = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}study/time/today`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (await res.json()) as TodayStudyTime;
};

export const FindOtherTodayStudyTime = async (email: string) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}study/time/today/other?email=${email}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (await res.json()) as OtherTodayStudyTime;
};

export const FindMyDailyTime = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}study/time/daily`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (await res.json()) as DailyTimeResponse;
};

export const FindHowRecentTime = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}study/inactive-seconds`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (await res.json()) as HowRecentTime;
};

export const FindConThisWeekStudyTime = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}study/focused-time/week`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (await res.json()) as ConThisWeekStudyTime;
};

export const FindConTotalStudyTime = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}study/focused-time/total`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (await res.json()) as ConTotalStudyTime;
};

export const FindConTodayStudyTime = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}study/focused-time/today`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (await res.json()) as ConTodayStudyTime;
};

export const FindThisWeekAvgRate = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}study/concentration/week`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (await res.json()) as ThisWeekAvgRate;
};

export const FindTotalAvgRate = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}study/concentration/total`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (await res.json()) as TotalWeekAvgRate;
};

export const FindTodayAvgRate = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}study/concentration/today`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (await res.json()) as TodayAvgRate;
};
