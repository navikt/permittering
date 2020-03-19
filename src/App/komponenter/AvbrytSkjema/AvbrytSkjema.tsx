import * as React from 'react';
import { FunctionComponent, useContext, useState } from 'react';
import ModalWrapper from 'nav-frontend-modal';
import Lenke from 'nav-frontend-lenker';
import SkjemaContext from '../../SkjemaContext/SkjemaContext';
import { Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import { Fareknapp, Flatknapp } from 'nav-frontend-knapper';
import { useHistory } from 'react-router-dom';
import VerticalSpacer from '../VerticalSpacer';

export const AvbrytSkjema: FunctionComponent = () => {
    const context = useContext(SkjemaContext);
    const [isOpen, setOpen] = useState<boolean>(false);
    const history = useHistory();
    return (
        <>
            <Lenke href={'#'} onClick={() => setOpen(true)}>
                Avbryte og slette skjema
            </Lenke>
            <ModalWrapper
                isOpen={isOpen}
                onRequestClose={() => setOpen(false)}
                closeButton={true}
                contentLabel="Min modalrute"
            >
                <div style={{ padding: '1rem' }}>
                    <Undertittel>Avbryte og slett skjema?</Undertittel>
                    <VerticalSpacer rem={1} />
                    <Normaltekst>
                        Du er i ferd med å forlate skjema. Hvis du fortsetter vil innholdet i
                        skjemaet bli slettet.
                    </Normaltekst>
                    <VerticalSpacer rem={2} />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Fareknapp
                            onClick={async () => {
                                await context.avbryt();
                                history.push('/');
                            }}
                        >
                            Avbryt og slett skjema
                        </Fareknapp>
                        <Flatknapp onClick={() => setOpen(false)}>Behold skjema</Flatknapp>
                    </div>
                </div>
            </ModalWrapper>
        </>
    );
};
