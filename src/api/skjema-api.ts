import { Permitteringsskjema } from "../types/permitteringsskjema";
import axios from "axios";

const api = axios.create({
  baseURL: "/permittering/api/skjema",
  withCredentials: true,
  timeout: 30000
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      // redirectToLogin();
    } else if (error.response.status === 403) {
      // redirectToIngenTilgang();
    } else {
      return Promise.reject(error);
    }
  }
);

export const hent = async (id: string) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

export const opprett = async (
  orgNr: string,
  type: Permitteringsskjema["type"]
) => {
  const response = await api.post(`/`, { orgNr, type });
  return response.data;
};

export const lagre = async (skjema: Permitteringsskjema) => {
  const response = await api.put(`/${skjema.id}`, skjema);
  return response.data;
};
