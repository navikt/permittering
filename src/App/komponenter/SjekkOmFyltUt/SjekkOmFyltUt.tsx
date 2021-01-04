import React, { FunctionComponent } from 'react';
import { EtikettFokus } from 'nav-frontend-etiketter';

const SjekkOmFyltUt: FunctionComponent<{ verdi: string | number | undefined }> = ({ verdi }) => {
    if (verdi) {
        return <>{verdi}</>;
    }
    return <EtikettFokus>Ikke fylt ut</EtikettFokus>;
};

export default SjekkOmFyltUt;
