import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACK_SERVER_URL,
});

export { axiosInstance };
