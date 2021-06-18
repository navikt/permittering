import React, { FunctionComponent, useState } from 'react';
import ModalWrapper from 'nav-frontend-modal';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { useHistory } from 'react-router-dom';
import VerticalSpacer from '../../VerticalSpacer';
import './AvbrytOgLagreSkjema.less';

interface AvbrytOgLagreSkjemaProps {
    lagre: () => void;
}

export const AvbrytOgLagreSkjema: FunctionComponent<AvbrytOgLagreSkjemaProps> = ({ lagre }) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const history = useHistory();
    return (
        <>
            <Lenke
                className="lagre-lenke"
                href="#"
                onClick={async (e) => {
                    e.preventDefault();
                    setOpen(true);
                }}
            >
                Lagre skjema og gå til oversikten
            </Lenke>
            <ModalWrapper
                isOpen={isOpen}
                onRequestClose={() => setOpen(false)}
                closeButton={true}
                contentLabel="Min modalrute"
            >
                <div className="avbryt-modal-innhold">
                    <Undertittel>Lagre og gå til oversikten?</Undertittel>
                    <VerticalSpacer rem={1} />
                    <Normaltekst>
                        Du er i ferd med å forlate skjema. Innholdet i skjemaet blir bevart og du
                        kan fortsette utfylling senere.
                    </Normaltekst>
                    <VerticalSpacer rem={2} />
                    <div className="avbryt-modal-innhold__knapper">
                        <Hovedknapp
                            onClick={async () => {
                                await lagre();
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
