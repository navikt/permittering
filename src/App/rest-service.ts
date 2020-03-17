import { skjemaListPath, skjemaPath } from "../paths.json";
import { fetchDelete, fetchGet, fetchPost, handleResponse } from "./utils/rest";

export interface RestService {
  listSkjemaer: (orgnummer: string) => Promise<Array<any>>;
  hentSkjema: (orgnummer: string, skjemaId: string) => Promise<any>;
  lagreSkjema: (orgnummer: string, skjemaId: string, data: any) => Promise<any>;
  slettSkjema: (orgnummer: string, skjemaId: string) => Promise<any>;
}

const listSkjemaer = async (orgnummer: string): Promise<Array<any>> => {
  const url = skjemaListPath.replace(":orgnummer", orgnummer);
  const response = await fetchGet(url);
  await handleResponse(response);
  return await response.json();
};
const hentSkjema = async (
  orgnummer: string,
  skjemaId: string
): Promise<any> => {
  const url = skjemaPath
    .replace(":orgnummer", orgnummer)
    .replace(":skjemaId", skjemaId);
  const response = await fetchGet(url);
  await handleResponse(response);
  return await response.json();
};
const lagreSkjema = async (
  orgnummer: string,
  skjemaId: string
): Promise<any> => {
  const url = skjemaPath
    .replace(":orgnummer", orgnummer)
    .replace(":skjemaId", skjemaId);
  const response = await fetchPost(url);
  await handleResponse(response);
  return await response.json();
};
const slettSkjema = async (
  orgnummer: string,
  skjemaId: string
): Promise<any> => {
  const url = skjemaPath
    .replace(":orgnummer", orgnummer)
    .replace(":skjemaId", skjemaId);
  const response = await fetchDelete(url);
  await handleResponse(response);
  return await response.json();
};
const restService: RestService = {
  listSkjemaer,
  hentSkjema,
  lagreSkjema,
  slettSkjema
};
export default restService;
