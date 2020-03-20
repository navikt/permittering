import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import ModalWrapper from 'nav-frontend-modal';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { useHistory } from 'react-router-dom';
import VerticalSpacer from '../VerticalSpacer';

export const AvbrytOgLagreSkjema: FunctionComponent = () => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const history = useHistory();
    return (
        <>
            <Lenke href={'#'} onClick={() => setOpen(true)}>
                Lagre skjema og gå til oversikten
            </Lenke>
            <ModalWrapper
                isOpen={isOpen}
                onRequestClose={() => setOpen(false)}
                closeButton={true}
                contentLabel="Min modalrute"
            >
                <div style={{ padding: '1rem' }}>
                    <Undertittel>Lagre og gå til oversikten?</Undertittel>
                    <VerticalSpacer rem={1} />
                    <Normaltekst>
                        Du er i ferd med å forlate skjema. Innholdet i skjemaet blir bevart og du
                        kan fortsette utfylling senere.
                    </Normaltekst>
                    <VerticalSpacer rem={2} />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Hovedknapp
                            onClick={() => {
                                history.push('/');
                            }}
                        >
                            Lagre og gå til oversikten
                        </Hovedknapp>
                        <Flatknapp onClick={() => setOpen(false)}>Avbryt</Flatknapp>
                    </div>
                </div>
            </ModalWrapper>
        </>
    );
};
