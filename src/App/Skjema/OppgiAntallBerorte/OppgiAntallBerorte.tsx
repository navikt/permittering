import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import SkjemaContext from '../SkjemaContext/SkjemaContext';
import SkjemaRamme from '../../komponenter/SkjemaRamme';

import { useSkjemaSteg } from '../use-skjema-steg';
import './OppgiAntallBerorte.less';
import { loggNavarendeSteg } from '../../../utils/funksjonerForAmplitudeLogging';
import Dekorator from '../../komponenter/Dekorator/Dekorator';
import Checkbox from 'nav-frontend-skjema/lib/checkbox';
import { OrganisasjonsListeContext } from '../../OrganisasjonslisteProvider';
import Input from 'nav-frontend-skjema/lib/input';
import 'nav-frontend-tabell-style';
import { BedriftsVelger } from '../../komponenter/Bedriftsvelger/Bedriftsvelger';
import {
    JuridiskEnhetMedUnderEnheterArray,
    tomAltinnOrganisasjon,
} from '../../../types/Organisasjon';

const AntallBerorte: FunctionComponent = () => {
    const { organisasjonstre } = useContext(OrganisasjonsListeContext);
    const history = useHistory();
    const context = useContext(SkjemaContext);
    const [aktivStatusForRader, setAktivStatusForRader] = useState([]);
    const [juridiskEnhetOrgnr, setJuridiskEnhetOrgnr] = useState<JuridiskEnhetMedUnderEnheterArray>(
        { JuridiskEnhet: tomAltinnOrganisasjon, Underenheter: [] }
    );
    const [rader, setRader] = useState([]);

    const { steg } = useSkjemaSteg(history.location.pathname, context.skjema.id);

    useEffect(() => {
        if (organisasjonstre && organisasjonstre.length) {
            setJuridiskEnhetOrgnr(organisasjonstre[0]);
        }
    }, [organisasjonstre]);

    useEffect(() => {
        if (juridiskEnhetOrgnr.JuridiskEnhet.OrganizationNumber !== '') {
            let liste: any = [];
            juridiskEnhetOrgnr.Underenheter.forEach(org => liste.push(false));
            setAktivStatusForRader(liste);
            visInputfelt(true);
        }
    }, [juridiskEnhetOrgnr]);

    const skiftJuridiskEnhet = (orgnr: string) => {
        if (organisasjonstre && organisasjonstre.length) {
            const valgteEnhet = organisasjonstre.filter(
                org => org.JuridiskEnhet.OrganizationNumber === orgnr
            )[0];
            setJuridiskEnhetOrgnr(valgteEnhet);
        }
    };

    const visInputfelt = (skjulAlle?: boolean) => {
        aktivStatusForRader.forEach((status, index) => {
            const tilhorendeOrgNr = juridiskEnhetOrgnr.Underenheter[index].OrganizationNumber;
            const inputObjekt = document.getElementById('inputfelt-' + tilhorendeOrgNr);
            if (skjulAlle && inputObjekt) {
                inputObjekt.style.display = 'none';
                console.log('forsoker a skjule alle');
                return;
            }
            if (status && inputObjekt) {
                inputObjekt.style.display = 'initial';
            } else if (inputObjekt) {
                inputObjekt.style.display = 'none';
            }
        });
    };

    useEffect(() => {
        const lagRader = () => {
            if (juridiskEnhetOrgnr && organisasjonstre) {
                const rader = juridiskEnhetOrgnr.Underenheter.map((org, index) => {
                    const liste: any = aktivStatusForRader;
                    return (
                        <tr key={org.OrganizationNumber}>
                            <td>
                                <Checkbox
                                    label="Velg denne raden"
                                    onChange={() => {
                                        liste[index] = !aktivStatusForRader[index];
                                        setAktivStatusForRader(liste);
                                    }}
                                />
                            </td>
                            <td>{org.Name}</td>
                            <td>{org.OrganizationNumber}</td>
                            <td>
                                <Input
                                    placeholder={'Fyll inn antall'}
                                    id={'inputfelt-' + org.OrganizationNumber}
                                />
                            </td>
                        </tr>
                    );
                });
                return rader;
            }
            return;
        };
        const nyeRader: any = lagRader();
        setRader(nyeRader);
    }, [aktivStatusForRader, juridiskEnhetOrgnr, organisasjonstre]);

    useEffect(() => {
        window.scrollTo(0, 0);
        loggNavarendeSteg('legg-til-personer');
    }, []);

    visInputfelt();

    return (
        <>
            <Dekorator sidetittel={context.skjema.type} />
            <SkjemaRamme
                steg={steg}
                lagre={async () => await context.lagre()}
                slett={async () => await context.avbryt()}
            >
                <div className={'hvem-berores'}>
                    <BedriftsVelger
                        className={'enhetsvelger'}
                        setOrganisasjon={skiftJuridiskEnhet}
                        organisasjoner={
                            organisasjonstre ? organisasjonstre.map(org => org.JuridiskEnhet) : []
                        }
                    />
                    <table className="tabell">
                        <thead>
                            <tr>
                                <th>
                                    <Checkbox label="Velg alle" />
                                </th>
                                <th>Virksomhet</th>
                                <th>Bedriftsnummer</th>
                                <th>Antall berørte</th>
                            </tr>
                        </thead>
                        <tbody>{rader}</tbody>
                    </table>
                </div>
            </SkjemaRamme>
        </>
    );
};

export default AntallBerorte;
