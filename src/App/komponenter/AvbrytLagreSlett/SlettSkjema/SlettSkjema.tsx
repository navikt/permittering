import React, { FunctionComponent, useState } from 'react';
import { BodyLong, Button, Heading, Link, Modal } from '@navikt/ds-react';
import { useHistory } from 'react-router-dom';
import './SlettSkjema.css';
import VerticalSpacer from '../../VerticalSpacer';

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
            <Modal
                open={isOpen}
                onClose={() => setOpen((x) => !x)}
                aria-labelledby="slett-modal-heading"
            >
                <Modal.Content className="avbryt-modal-innhold">
                    <Heading id="slett-modal-heading" spacing level="2" size="medium">
                        Slett skjema?
                    </Heading>
                    <VerticalSpacer rem={1} />
                    <BodyLong spacing>
                        Hvis du fortsetter vil innholdet i skjemaet bli slettet.
                    </BodyLong>
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
                </Modal.Content>
            </Modal>
        </>
    );
};
