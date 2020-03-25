import * as React from 'react';
import { FunctionComponent, useContext, useState } from 'react';
import ModalWrapper from 'nav-frontend-modal';
import Lenke from 'nav-frontend-lenker';
import SkjemaContext from '../../../SkjemaContext/SkjemaContext';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Fareknapp, Flatknapp } from 'nav-frontend-knapper';
import { useHistory } from 'react-router-dom';
import VerticalSpacer from '../../VerticalSpacer';

export const SlettSkjema: FunctionComponent = () => {
    const context = useContext(SkjemaContext);
    const [isOpen, setOpen] = useState<boolean>(false);
    const history = useHistory();
    return (
        <>
            <Lenke href={'#'} onClick={() => setOpen(true)}>
                Slett skjema
            </Lenke>
            <ModalWrapper
                isOpen={isOpen}
                onRequestClose={() => setOpen(false)}
                closeButton={true}
                contentLabel="Min modalrute"
            >
                <div style={{ padding: '1rem' }}>
                    <Undertittel>Slett skjema?</Undertittel>
                    <VerticalSpacer rem={1} />
                    <Normaltekst>
                        Hvis du fortsetter vil innholdet i skjemaet bli slettet.
                    </Normaltekst>
                    <VerticalSpacer rem={2} />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Fareknapp
                            onClick={async () => {
                                await context.avbryt();
                                history.push('/');
                            }}
                        >
                            Slett skjema
                        </Fareknapp>
                        <Flatknapp onClick={() => setOpen(false)}>Behold skjema</Flatknapp>
                    </div>
                </div>
            </ModalWrapper>
        </>
    );
};
