import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const create = async (data) => {
  await axios.post(API_URL + "/auth/register", data);
};

export const login = async (data) => {
  return await axios.post(API_URL + "/auth/login", data);
};
