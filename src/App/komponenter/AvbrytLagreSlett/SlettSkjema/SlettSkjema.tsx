import React, { FunctionComponent, useState } from 'react';
import ModalWrapper from 'nav-frontend-modal';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Button, Link } from '@navikt/ds-react';
import { useHistory } from 'react-router-dom';
import VerticalSpacer from '../../VerticalSpacer';
import './SlettSkjema.css';

interface SlettSkjemaProps {
    slett: () => void;
}

export const SlettSkjema: FunctionComponent<SlettSkjemaProps> = ({ slett }) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const history = useHistory();
    return (
        <>
            <Link
                href="#"
                role="button"
                onClick={(e) => {
                    e.preventDefault();
                    setOpen(true);
                }}
            >
                Slett skjema
            </Link>
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
                        <Button
                            variant="danger"
                            onClick={async () => {
                                await slett();
                                history.push('/');
                            }}
                        >
                            Slett skjema
                        </Button>
                        <Button
                            variant="tertiary"
                            className="behold-knapp"
                            onClick={() => setOpen(false)}
                        >
                            Behold skjema
                        </Button>
                    </div>
                </div>
            </ModalWrapper>
        </>
    );
};
