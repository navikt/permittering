import fetchMock from "fetch-mock";
import { mockedeOrganisasjoner } from "./Organisasjoner";
const delay = new Promise(res => setTimeout(res, 500));

fetchMock
  .get(
    "permittering/api/organisasjoner",
    delay.then(() => {
      return mockedeOrganisasjoner;
    })
  )
  .spy();
