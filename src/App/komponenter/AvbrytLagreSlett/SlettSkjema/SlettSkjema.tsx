import React, { FunctionComponent, useState } from 'react';
import ModalWrapper from 'nav-frontend-modal';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Fareknapp, Flatknapp } from 'nav-frontend-knapper';
import { useHistory } from 'react-router-dom';
import VerticalSpacer from '../../VerticalSpacer';
import './SlettSkjema.less';

interface SlettSkjemaProps {
    slett: () => void;
}

export const SlettSkjema: FunctionComponent<SlettSkjemaProps> = ({ slett }) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const history = useHistory();
    return (
        <>
            <Lenke
                href="#"
                role="button"
                onClick={e => {
                    e.preventDefault();
                    setOpen(true);
                }}
            >
                Slett skjema
            </Lenke>
            <ModalWrapper
                isOpen={isOpen}
                onRequestClose={() => setOpen(false)}
                closeButton={true}
                contentLabel="Min modalrute"
            >
                <div className="slett-modal-innhold">
                    <Undertittel>Slett skjema?</Undertittel>
                    <VerticalSpacer rem={1} />
                    <Normaltekst>
                        Hvis du fortsetter vil innholdet i skjemaet bli slettet.
                    </Normaltekst>
                    <VerticalSpacer rem={2} />
                    <div className="slett-modal-innhold__knapper">
                        <Fareknapp
                            onClick={async () => {
                                await slett();
                                history.push('/');
                            }}
                        >
                            Slett skjema
                        </Fareknapp>
                        <Flatknapp className="behold-knapp" onClick={() => setOpen(false)}>
                            Behold skjema
                        </Flatknapp>
                    </div>
                </div>
            </ModalWrapper>
        </>
    );
};
