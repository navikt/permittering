import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import SkjemaContext from '../SkjemaContext/SkjemaContext';
import SkjemaRamme from '../../komponenter/SkjemaRamme';

import { useSkjemaSteg } from '../use-skjema-steg';
import './InputAvPersoner.less';
import { loggNavarendeSteg } from '../../../utils/funksjonerForAmplitudeLogging';
import Dekorator from '../../komponenter/Dekorator/Dekorator';
import Checkbox from 'nav-frontend-skjema/lib/checkbox';
import Lenke from 'nav-frontend-lenker';
import 'nav-frontend-tabell-style';
import Input from 'nav-frontend-skjema/lib/input';
import { byggOrganisasjonstre } from '../../../utils/byggOrganisasjonsTre';
import { MOCK_ORGANISASJONER } from '../../../api/organisasjonerFraAltinn';
import {
    JuridiskEnhetMedUnderEnheterArray,
    Organisasjon,
    tomAltinnOrganisasjon,
} from '../../../types/Organisasjon';

const AntallBerorte: FunctionComponent = () => {
    const history = useHistory();
    const context = useContext(SkjemaContext);
    const [valgtJuridiskEnhet, setValgtJuridiskEnhet] = useState(tomAltinnOrganisasjon);
    const [organisasjonstre, setOrganisasjonstre] = useState<
        JuridiskEnhetMedUnderEnheterArray[] | undefined
    >(undefined);
    const organisasjoner = MOCK_ORGANISASJONER;

    const { steg, forrigeSide, nesteSide } = useSkjemaSteg(
        history.location.pathname,
        context.skjema.id
    );

    useEffect(() => {
        const byggTre = async (organisasjoner: Organisasjon[]) => {
            const juridiskEnhetMedUnderEnheterArray: JuridiskEnhetMedUnderEnheterArray[] = await byggOrganisasjonstre(
                organisasjoner
            );
            return juridiskEnhetMedUnderEnheterArray;
        };
        if (organisasjoner && organisasjoner.length > 0) {
            byggTre(organisasjoner.sort((a, b) => a.Name.localeCompare(b.Name))).then(
                juridiskEnhetMedUnderEnheterArray => {
                    const organisasjonstre = juridiskEnhetMedUnderEnheterArray;
                    if (organisasjonstre.length > 0) {
                        setOrganisasjonstre(organisasjonstre);
                        setValgtJuridiskEnhet(organisasjonstre[0].JuridiskEnhet);
                    }
                }
            );
        }
    }, [organisasjoner]);

    let rader: any = null;
    if (organisasjonstre && organisasjonstre.length) {
        const fulltObjekt = organisasjonstre.filter(
            enhet =>
                enhet.JuridiskEnhet.OrganizationNumber === valgtJuridiskEnhet.OrganizationNumber
        );

        rader = fulltObjekt[0].Underenheter.map(org => {
            return (
                <tr>
                    <td>
                        <Checkbox label="Velg denne raden" />
                    </td>
                    <td className="tabell__td--sortert">{org.Name}</td>
                    <td className="tabell__td--sortert">{org.OrganizationNumber}</td>
                    <td>
                        <Input value={org.Name} />
                    </td>
                </tr>
            );
        });
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        loggNavarendeSteg('legg-til-personer');
    }, []);

    return (
        <>
            <Dekorator sidetittel={context.skjema.type} />
            <SkjemaRamme
                steg={steg}
                lagre={async () => await context.lagre()}
                slett={async () => await context.avbryt()}
            >
                import 'nav-frontend-tabell-style';
                <table className="tabell">
                    <thead>
                        <tr>
                            <th>
                                <Checkbox label="Velg alle" />
                            </th>
                            <th role="columnheader" aria-sort="none">
                                <Lenke href="#">Virksomhet</Lenke>
                            </th>
                            <th
                                role="columnheader"
                                aria-sort="none"
                                className="tabell__th--sortert-desc"
                            >
                                <Lenke href="#">Bedriftsnummer</Lenke>
                            </th>
                            <th role="columnheader" aria-sort="none">
                                <Lenke href="#">Antall berørte</Lenke>
                            </th>
                        </tr>
                    </thead>
                    <tbody>{rader}</tbody>
                </table>
            </SkjemaRamme>
        </>
    );
};

export default AntallBerorte;
