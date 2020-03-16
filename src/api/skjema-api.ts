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

export const hent = async (orgNr: string, id: string) => {
  const response = await api.get(`/${orgNr}/${id}`);
  return response.data;
};

export const opprett = async (orgNr: string) => {
  const response = await api.post(`/${orgNr}`);
  const { id } = response.data;
  return hent(orgNr, id);
};

export const lagre = async (skjema: Permitteringsskjema) => {
  await api.put(`/${skjema.orgNr}/${skjema.id}`, skjema);
  return hent(skjema.orgNr, skjema.id);
};
