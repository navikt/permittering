import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import SkjemaContext from '../SkjemaContext/SkjemaContext';
import SkjemaRamme from '../../komponenter/SkjemaRamme';
import ikon from './antall-berorte-ikon.svg';

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
import { Element } from 'nav-frontend-typografi';
import Systemtittel from 'nav-frontend-typografi/lib/systemtittel';
import Hovedknapp from 'nav-frontend-knapper/lib/hovedknapp';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';

import { Bedrift } from '../../../types/permitteringsskjema';

interface InputfeltState {
    feilmelding: string;
    organisasjonsnr: string;
    skalVises: boolean;
    antall: number;
}

const AntallBerorte: FunctionComponent = () => {
    const { organisasjonstre } = useContext(OrganisasjonsListeContext);
    const history = useHistory();
    const context = useContext(SkjemaContext);
    const [inputfeltStates, setInputfeltStates] = useState([]);
    const [juridiskEnhetOrgnr, setJuridiskEnhetOrgnr] = useState<JuridiskEnhetMedUnderEnheterArray>(
        { JuridiskEnhet: tomAltinnOrganisasjon, Underenheter: [] }
    );

    const totalAntall = 9;
    let { bedrifter = [] } = context.skjema;
    const { steg, nesteSide } = useSkjemaSteg(history.location.pathname, context.skjema.id);

    const erGyldigNr = (nr: string) => {
        return nr.match(/^[0-9]+$/) != null;
    };

    const endreBedrift = (orgnr: string, antall: number, navn: string) => {
        const nyBedrift: Bedrift = {
            bedriftsnr: orgnr,
            antall: antall,
            navn: navn,
        };
        const bedrifterCopy = [...bedrifter];
        const bedriftSomSkalEndresIndex = bedrifterCopy.findIndex(
            bedrift => bedrift.bedriftsnr === orgnr
        );
        bedriftSomSkalEndresIndex > -1
            ? (bedrifterCopy[bedriftSomSkalEndresIndex] = nyBedrift)
            : bedrifterCopy.push(nyBedrift);
        console.log('bedrifterCopy', bedrifterCopy);
        context.endreSkjemaVerdi('bedrifter', bedrifterCopy);
    };
    const leggTilEllerFjernBedrift = (orgnr: string, navn: string) => {
        const nyBedrift: Bedrift = {
            bedriftsnr: orgnr,
            antall: 0,
            navn: navn,
        };
        const bedrifterCopy = [...bedrifter];
        const bedriftSomSkalEndresIndex = bedrifterCopy.findIndex(
            bedrift => bedrift.bedriftsnr === orgnr
        );
        bedriftSomSkalEndresIndex > -1
            ? bedrifterCopy.splice(bedriftSomSkalEndresIndex, 1)
            : bedrifterCopy.push(nyBedrift);
        console.log('bedrifterCopy bedriftSomSkalEndresIndex', bedriftSomSkalEndresIndex);
        console.log('bedrifterCopy bedriftSomSkalEndresIndex', bedriftSomSkalEndresIndex);
        context.endreSkjemaVerdi('bedrifter', bedrifterCopy);
    };

    useEffect(() => {
        if (organisasjonstre && organisasjonstre.length) {
            setJuridiskEnhetOrgnr(organisasjonstre[0]);
        }
    }, [organisasjonstre]);

    useEffect(() => {
        if (juridiskEnhetOrgnr.JuridiskEnhet.OrganizationNumber !== '') {
            let liste: any = [];
            juridiskEnhetOrgnr.Underenheter.forEach(org => {
                const contextbedriftIndex = bedrifter.findIndex(
                    bedrift => bedrift.bedriftsnr === org.OrganizationNumber
                );
                const initialState: InputfeltState = {
                    feilmelding: '',
                    organisasjonsnr: org.OrganizationNumber,
                    skalVises: !!bedrifter[contextbedriftIndex],
                    antall: bedrifter[contextbedriftIndex]?.antall || 0,
                };

                liste.push(initialState);
            });
            console.log('setInitialState', liste);
            console.log('setInitialStat bedrifter', bedrifter);
            setInputfeltStates(liste);
        }
    }, [juridiskEnhetOrgnr, bedrifter]);

    const skiftJuridiskEnhet = (orgnr: string) => {
        if (organisasjonstre && organisasjonstre.length) {
            const valgteEnhet = organisasjonstre.filter(
                org => org.JuridiskEnhet.OrganizationNumber === orgnr
            )[0];
            setJuridiskEnhetOrgnr(valgteEnhet);
        }
    };

    const lagRader = () => {
        if (juridiskEnhetOrgnr && organisasjonstre) {
            const nyStatesKopi: any = [...inputfeltStates];
            return juridiskEnhetOrgnr.Underenheter.map(org => {
                const indeksIinputfeltState: number = inputfeltStates.findIndex(
                    (state: InputfeltState) => state.organisasjonsnr === org.OrganizationNumber
                );
                const stateForRad: InputfeltState = inputfeltStates[indeksIinputfeltState];

                if (stateForRad) {
                    return (
                        <tr key={org.OrganizationNumber} className={'hvem-berores__tabell-rad'}>
                            <td>
                                <div className={'hvem-berores__kolonne-med-checkbox'}>
                                    <Checkbox
                                        label="Velg denne raden"
                                        checked={stateForRad.skalVises}
                                        onChange={() => {
                                            nyStatesKopi[
                                                indeksIinputfeltState
                                            ].skalVises = !stateForRad.skalVises;
                                            setInputfeltStates(nyStatesKopi);
                                            leggTilEllerFjernBedrift(
                                                org.OrganizationNumber,
                                                org.Name
                                            );
                                        }}
                                    />
                                    <div className={'hvem-berores__kolonne-med-checkbox-tekst'}>
                                        {org.Name}
                                    </div>
                                </div>
                            </td>
                            <td>{org.OrganizationNumber}</td>
                            <td className={'hvem-berores__tabell-input-kolonne'}>
                                {stateForRad.skalVises && (
                                    <Input
                                        value={stateForRad.antall}
                                        feil={stateForRad.feilmelding}
                                        className={'hvem-berores__tabell-inputfelt'}
                                        placeholder={'Fyll inn antall'}
                                        id={'inputfelt-' + org.OrganizationNumber}
                                        onChange={(event: any) => {
                                            if (
                                                !erGyldigNr(event.currentTarget.value) &&
                                                event.currentTarget.value !== ''
                                            ) {
                                                nyStatesKopi[indeksIinputfeltState].feilmelding =
                                                    'Fyll inn antall';
                                            } else {
                                                nyStatesKopi[indeksIinputfeltState].feilmelding =
                                                    '';
                                                endreBedrift(
                                                    org.OrganizationNumber,
                                                    event.currentTarget.value,
                                                    org.Name
                                                );
                                            }
                                            setInputfeltStates(nyStatesKopi);
                                        }}
                                    />
                                )}
                            </td>
                        </tr>
                    );
                }
                return [];
            });
        }
    };

    console.log();
    const nyeRader: any = lagRader();

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
                <div className={'hvem-berores'}>
                    <Systemtittel className={'hvem-berores__systemtittel'}>
                        {' '}
                        <img alt={''} src={ikon} />
                        Antall berørte
                    </Systemtittel>
                    <BedriftsVelger
                        label={
                            <>
                                Hvilken juridisk enhet har underenheter som berøres?
                                <Normaltekst>
                                    Du kan kun melde ifra for virksomheter som tilhører den samme
                                    juridiske enheten
                                </Normaltekst>
                            </>
                        }
                        setOrganisasjon={skiftJuridiskEnhet}
                        organisasjoner={
                            organisasjonstre ? organisasjonstre.map(org => org.JuridiskEnhet) : []
                        }
                    />
                    <Element className={'hvem-berores__tabell-overtekst'}>
                        Velg underenhet og skriv inn antall ansatte som berøres{' '}
                    </Element>
                    <table className="tabell">
                        <thead>
                            <tr className={'hvem-berores__tabell-rad'}>
                                <th>
                                    <div className={'hvem-berores__kolonne-med-checkbox'}>
                                        <Checkbox label={'Velg virksomhet'} />
                                        <div className={'hvem-berores__kolonne-med-checkbox-tekst'}>
                                            Virksomhet
                                        </div>
                                    </div>
                                </th>
                                <th>Bedriftsnummer</th>
                                <th>Antall berørte</th>
                            </tr>
                        </thead>
                        <tbody>{nyeRader}</tbody>
                    </table>
                    <div className={'hvem-berores__tabell-totalt-antall'}>
                        <Element>Totalt antall berørte</Element>
                        <Element>{totalAntall}</Element>
                    </div>
                </div>
                <Hovedknapp
                    className={'hvem-berores__neste-knapp'}
                    onClick={async () => {
                        await context.lagre();
                        history.push(nesteSide);
                    }}
                >
                    Neste
                </Hovedknapp>
            </SkjemaRamme>
        </>
    );
};

export default AntallBerorte;
