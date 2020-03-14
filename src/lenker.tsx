import environment from "./utils/environment";

export const veilarbStepup = () => {
  if (environment.MILJO === 'prod-sbs') {
    return 'https://tjenester.nav.no/veilarbstepup/oidc?url=https://arbeidsgiver.nav.no/min-side-arbeidsgiver/';
  } else {
    return 'https://tjenester-q1.nav.no/veilarbstepup/oidc?url=https://arbeidsgiver-q.nav.no/min-side-arbeidsgiver/';
  }
};