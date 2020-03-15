import { Organisasjon } from '@navikt/bedriftsmeny/lib/Organisasjon';
import { FetchError } from './api-utils';
import {hentOrganisasjonerLink} from "../lenker";

export async function hentOrganisasjonerFraAltinn(signal: any): Promise<Organisasjon[]> {
  let respons = await fetch(hentOrganisasjonerLink(), { signal: signal });
  console.log(hentOrganisasjonerLink());
  if (respons.ok) {
    return await respons.json();
  } else {
    throw new FetchError(respons.statusText || respons.type, respons);
  }
}