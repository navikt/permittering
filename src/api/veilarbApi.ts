import { veilarbstepupPath } from '../paths.json';

export interface VeilStatus {
    erInnlogget: boolean;
    harGyldigOidcToken: boolean;
    brukerId?: any;
    niva?: any;
    nivaOidc: number;
}

const hentVeilarbStatus = async (): Promise<VeilStatus> => {
    let responsBody = {} as VeilStatus;
    const respons = await fetch(veilarbstepupPath, {
        method: 'GET',
        credentials: 'include',
    });
    if (respons.ok) {
        responsBody = await respons.json();
    }
    return responsBody;
};

export default hentVeilarbStatus;
