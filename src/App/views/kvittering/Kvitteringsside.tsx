import React from 'react';
import HvitSideBoks from '../../komponenter/HvitSideBoks';
import { Sidetittel, Undertekst } from 'nav-frontend-typografi';
import Lenkepanel from 'nav-frontend-lenkepanel/lib';
import handshake from '../../LoggInn/handshake.svg';

const Kvitteringsside = () => {
    return (
        <HvitSideBoks>
            <div className="innloggingsside__circle">
                <img src={handshake} className="handtrykkbilde" alt="bilde av håndtrykk" />
            </div>
            <div style={{ textAlign: 'center', margin: '3em' }}>
                <Sidetittel>Skjema er sendt til NAV</Sidetittel>
                <Undertekst>
                    Noe kort informasjonstekst om hva som skjer videre, hvor skjemaet er sendt hen
                    evt.
                </Undertekst>
            </div>

            <Lenkepanel href="#" border tittelProps={'undertittel'}>
                Gå til Min Side – Arbeidsgiver
            </Lenkepanel>
            <Lenkepanel href="#" border tittelProps={'undertittel'}>
                Informasjon om permitteringer til arbeidsgivere i forbindelse med Koronaviruset
            </Lenkepanel>
        </HvitSideBoks>
    );
};
export default Kvitteringsside;
