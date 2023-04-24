import React, { FunctionComponent, useState } from 'react';
import { BodyLong, Button, Heading, Link, Modal } from '@navikt/ds-react';
import { useHistory } from 'react-router-dom';
import './AvbrytOgLagreSkjema.css';
import VerticalSpacer from '../../VerticalSpacer';

interface AvbrytOgLagreSkjemaProps {
    lagre: () => void;
}

export const AvbrytOgLagreSkjema: FunctionComponent<AvbrytOgLagreSkjemaProps> = ({ lagre }) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const history = useHistory();
    return (
        <>
            <Link
                className="lagre-lenke"
                href="#"
                onClick={async (e) => {
                    e.preventDefault();
                    setOpen(true);
                }}
            >
                Lagre skjema og gå til oversikten
            </Link>
            <Modal
                open={isOpen}
                onClose={() => setOpen((x) => !x)}
                aria-labelledby="avbryt-modal-heading"
            >
                <Modal.Content className="avbryt-modal-innhold">
                    <Heading id="avbryt-modal-heading" spacing level="2" size="medium">
                        Lagre og gå til oversikten?
                    </Heading>
                    <VerticalSpacer rem={1} />
                    <BodyLong spacing>
                        Du er i ferd med å forlate skjema. Innholdet i skjemaet blir bevart og du
                        kan fortsette utfylling senere.
                    </BodyLong>
                    <VerticalSpacer rem={2} />
                    <div className="avbryt-modal-innhold__knapper">
                        <Button
                            onClick={async () => {
                                await lagre();
                                history.push('/');
                            }}
                        >
                            Lagre og gå til oversikten
                        </Button>
                        <Button variant="tertiary" onClick={() => setOpen(false)}>
                            Avbryt
                        </Button>
                    </div>
                </Modal.Content>
            </Modal>
        </>
    );
};
