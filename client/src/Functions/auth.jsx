import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const create = async (data) => {
  await axios.post(API_URL + "/auth/register", data);
};

// services/authService.js
export const login = async (data) => {
  const res = await axios.post(API_URL + "/auth/login", data);

  // 👉 เก็บ accessToken และ refreshToken ลง localStorage
  localStorage.setItem("accessToken", res.data.accessToken);
  localStorage.setItem("refreshToken", res.data.refreshToken);
  localStorage.setItem("userId", res.data.id);

  return res.data;
};

export const check = async (email) => {
  return await axios.get(API_URL + "/auth/check-email", { params: { email } });
};
