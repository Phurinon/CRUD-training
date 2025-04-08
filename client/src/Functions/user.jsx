import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const remove = async (id) => {
  await axios.delete(API_URL + "/user/remove/" + id);
};

export const create = async (data) => {
  await axios.post(API_URL + "/user/create", data);
};

export const getData = async () => {
  return await axios.get(API_URL + "/user/list");
};

export const read = async (id) => {
  return await axios.get(API_URL + "/user/listBy/" + id);
};

export const update = async (id, data) => {
  return await axios.put(API_URL + "/user/update/" + id, data);
};
