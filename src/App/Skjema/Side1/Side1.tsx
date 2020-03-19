import React, { FunctionComponent, useContext } from 'react';
import Systemtittel from 'nav-frontend-typografi/lib/systemtittel';
import Input from 'nav-frontend-skjema/lib/input';
import Hovedknapp from 'nav-frontend-knapper/lib/hovedknapp';
import SkjemaContext from '../../SkjemaContext/SkjemaContext';
import SkjemaRamme from '../../komponenter/SkjemaRamme';
import { useHistory } from 'react-router-dom';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import './Side1.less';
import { Knapp } from 'nav-frontend-knapper';
import { nesteSide, SkjemaSideProps, skjemaSteg } from '../skjema-steg';

const Side1: FunctionComponent<SkjemaSideProps> = () => {
    const context = useContext(SkjemaContext);
    const history = useHistory();
    const steg = skjemaSteg(history.location.pathname);
    const nestePath = nesteSide(steg, context.skjema.id);
    return (
        <SkjemaRamme>
            <Systemtittel>Kontaktinformasjon</Systemtittel>
            <Undertittel className={'skjema-innhold__side-1-undertittel'}>
                Informasjon om arbeidsgiver
            </Undertittel>

            <div className={'skjema-innhold__side-1-linje-2'}>
                <Input
                    className={'skjema-innhold__side-1-input-felt'}
                    label="Bedriftens navn"
                    defaultValue={context.skjema.bedriftNavn}
                    disabled
                />
                <Input
                    className={'skjema-innhold__side-1-input-felt'}
                    label="Bedriftsnummer"
                    defaultValue={context.skjema.bedriftNr}
                    disabled
                />
            </div>
            <Undertittel className={'skjema-innhold__side-1-undertittel'}>
                Kontaktperson i virksomheten
            </Undertittel>
            <Input
                className={'skjema-innhold__side-1-input-felt'}
                label="Navn"
                defaultValue={context.skjema.kontaktNavn}
                onChange={event =>
                    context.endreSkjemaVerdi('kontaktNavn', event.currentTarget.value)
                }
            />
            <div className={'skjema-innhold__side-1-linje-4'}>
                <Input
                    className={'skjema-innhold__side-1-input-felt'}
                    label="Telefonnummer"
                    defaultValue={context.skjema.kontaktTlf}
                    onChange={event =>
                        context.endreSkjemaVerdi('kontaktTlf', event.currentTarget.value)
                    }
                />
                <Input
                    className={'skjema-innhold__side-1-input-felt'}
                    label="E-post"
                    defaultValue={context.skjema.kontaktEpost}
                    onChange={event =>
                        context.endreSkjemaVerdi('kontaktEpost', event.currentTarget.value)
                    }
                />
            </div>
            <div className={'skjema-innhold__fram-og-tilbake'}>
                <Knapp disabled>Tilbake</Knapp>
                <Hovedknapp
                    onClick={async () => {
                        await context.lagre();
                        history.push(nestePath || '');
                    }}
                >
                    Neste
                </Hovedknapp>
            </div>
        </SkjemaRamme>
    );
};

export default Side1;
