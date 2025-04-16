import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const create = async (data) => {
  await axios.post(API_URL + "/auth/register", data);
};

export const login = async (data) => {
  return await axios.post(API_URL + "/auth/login", data);
};

export const check = async (email) => {
  return await axios.get(API_URL + "/auth/check-email", { params: { email } });
};
