import React, { FunctionComponent } from 'react';
import { Tag } from '@navikt/ds-react';

const SjekkOmFyltUt: FunctionComponent<{
    verdi: string | number | undefined;
    ugyldigInput?: boolean;
}> = ({ verdi, ugyldigInput }) => {
    if (ugyldigInput) {
        return <Tag variant="warning">Ugyldig tidsintervall</Tag>;
    }
    if (verdi === undefined) {
        return <Tag variant="warning">Ikke fylt ut</Tag>;
    }
    return <>{verdi}</>;
};

export default SjekkOmFyltUt;
