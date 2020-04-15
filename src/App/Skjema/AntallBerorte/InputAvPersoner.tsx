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
import { OrganisasjonsListeContext } from '../../OrganisasjonslisteProvider';
import Input from 'nav-frontend-skjema/lib/input';

const AntallBerorte: FunctionComponent = () => {
    const { organisasjonstre } = useContext(OrganisasjonsListeContext);
    const history = useHistory();
    const context = useContext(SkjemaContext);
    const [aktivStatusForRader, setAktivStatusForRader] = useState([]);

    const { steg } = useSkjemaSteg(history.location.pathname, context.skjema.id);

    useEffect(() => {
        if (organisasjonstre && organisasjonstre.length) {
            let liste: any = [];
            organisasjonstre[0].Underenheter.forEach(org => liste.push(false));
            setAktivStatusForRader(liste);
        }
    }, [organisasjonstre]);

    let rader: any = [];
    if (organisasjonstre && organisasjonstre.length > 0) {
        rader = organisasjonstre[0].Underenheter.map((org, index) => {
            const liste: any = aktivStatusForRader;
            return (
                <tr>
                    <td>
                        <Checkbox
                            label="Velg denne raden"
                            onChange={() => {
                                liste[index] = !aktivStatusForRader[index];
                                console.log(liste);

                                setAktivStatusForRader(liste);
                                console.log(aktivStatusForRader);
                            }}
                        />
                    </td>
                    <td>{org.Name}</td>
                    <td>{org.OrganizationNumber}</td>

                    {liste[index] && (
                        <td>
                            <Input placeholder={'Fyll inn antall'} />
                        </td>
                    )}
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
                <table className="tabell">
                    <thead>
                        <tr>
                            <th>
                                <Checkbox label="Velg alle" />
                            </th>
                            <th>
                                <Lenke href="#">Virksomhet</Lenke>
                            </th>
                            <th>
                                <Lenke href="#">Bedriftsnummer</Lenke>
                            </th>
                            <th>
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
