export interface VeilStatus {
    erInnlogget: boolean;
    harGyldigOidcToken: boolean;
    brukerId?: any;
    niva?: any;
    nivaOidc: number;
}

const hentVeilarbStatus = async (): Promise<VeilStatus> => {
    let responsBody = {} as VeilStatus;
    const respons = await fetch('/arbeidsforhold/veilarbstepup/status', {
        method: 'GET',
        credentials: 'include'
    });
    if (respons.ok) {
        responsBody = await respons.json();
    }
    return responsBody;
};

export default hentVeilarbStatus;
