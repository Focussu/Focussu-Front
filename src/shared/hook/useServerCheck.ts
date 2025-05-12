"use client";

import { axiosInstance } from "../util/axios-instance";
import { useState } from "react";

export const healthCheck = async () => {
  const [data, setData] = useState<Array<string> | null>([]);

  try {
    const response = await axiosInstance.get("/test/healthcheck");
  } catch (e) {
  } finally {
  }
};
