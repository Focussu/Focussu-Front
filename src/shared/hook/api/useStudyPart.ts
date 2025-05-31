import {
  ThisWeekStudyTime,
  TotalStudyTime,
  TodayStudyTime,
  OtherTodayStudyTime,
  HowRecentTime,
  ConThisWeekStudyTime,
  ConTotalStudyTime,
  ConTodayStudyTime,
  ThisWeekAvgRate,
  TotalWeekAvgRate,
  TodayAvgRate,
} from "@/shared/type/forAPI/StudyType";

const token = localStorage.getItem("token");

/*
const { data } = useQuery<반환하고자 하는 Interface>({
  queryKey: ["..."],
  queryFn: () => 사용할 API 함수명(),
  staleTime: 5 * 1000,
});
*/

export const FindThisWeekStudyTime = async () => {
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

export const FindHowRecentTime = async () => {
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
