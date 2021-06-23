import React, { FunctionComponent } from 'react';
import { EtikettFokus } from 'nav-frontend-etiketter';

const SjekkOmFyltUt: FunctionComponent<{
    verdi: string | number | undefined;
    ugyldigInput?: boolean;
}> = ({ verdi, ugyldigInput }) => {
    if (ugyldigInput) {
        return <EtikettFokus>Ugyldig tidsintervall</EtikettFokus>;
    }
    if (verdi === undefined) {
        return <EtikettFokus>Ikke fylt ut</EtikettFokus>;
    }
    return <>{verdi}</>;
};

export default SjekkOmFyltUt;
