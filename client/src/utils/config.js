import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://niletube1.onrender.com/api",
  // baseURL: "https://localhost:4000/api",
});
