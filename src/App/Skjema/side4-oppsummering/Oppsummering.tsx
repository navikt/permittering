import React, { FunctionComponent, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Hovedknapp from 'nav-frontend-knapper/lib/hovedknapp';
import { Normaltekst, Sidetittel, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import Knapp from 'nav-frontend-knapper/lib/knapp';
import Veilederpanel from 'nav-frontend-veilederpanel';
import SkjemaContext from '../../SkjemaContext/SkjemaContext';
import SkjemaRamme from '../../komponenter/SkjemaRamme';
import { forrigeSide, SkjemaSideProps, skjemaSteg } from '../skjema-steg';
import veilederIkon from './gjenstand.svg';
import infoIkon from './info.svg';
import './Oppsummering.less';

const Oppsummering: FunctionComponent<SkjemaSideProps> = () => {
    const context = useContext(SkjemaContext);
    const history = useHistory();
    const steg = skjemaSteg(history.location.pathname);
    const forrigePath = forrigeSide(steg, context.skjema.id);

    return (
        <SkjemaRamme>
            <section className="oppsummering">
                <div className="oppsummering__sidetittel">
                    <Sidetittel>Er opplysningene riktige?</Sidetittel>
                </div>
                <Veilederpanel
                    type="plakat"
                    kompakt
                    fargetema="info"
                    svg={<img src={veilederIkon} alt="" aria-hidden="true" />}
                >
                    <div className="oppsummering__boks bedriftinfo">
                        <table className="tabell">
                            <tbody>
                                <tr>
                                    <th>Bedrift:</th>
                                    <td>BIFF OG BULJONG</td>
                                </tr>
                                <tr>
                                    <th>Bedr. nr:</th>
                                    <td>9999999999</td>
                                </tr>
                                <tr>
                                    <th>Org nr:</th>
                                    <td>000000000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="oppsummering__boks kontaktinfo">
                        <table className="tabell">
                            <tbody>
                                <tr>
                                    <th>Kontaktperson:</th>
                                    <td>Tore Toresen</td>
                                </tr>
                                <tr>
                                    <th>Telefonnummer:</th>
                                    <td>99 88 77 66</td>
                                </tr>
                                <tr>
                                    <th>E-post:</th>
                                    <td>tore.toresen@flesk.no</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="endre-lenke">
                            <Lenke href="">Endre</Lenke>
                        </div>
                    </div>

                    <div className="oppsummering__boks antall-arbeidstakere">
                        <table className="tabell">
                            <tbody>
                                <tr>
                                    <th>Antall arbeidstakere som vil kunne bli berørt:</th>
                                    <td>6</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="endre-lenke">
                            <Lenke href="">Endre</Lenke>
                        </div>
                    </div>

                    <div className="oppsummering__boks yrkeskategorier">
                        <div className="tekst">
                            <Normaltekst className="overskrift">
                                Hvilken arbeidsgrupper (yrkeskategorier) tilhører de berørte?
                            </Normaltekst>
                            <Normaltekst>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                                officia deserunt mollit anim id est laborum
                            </Normaltekst>
                        </div>
                        <div className="endre-lenke">
                            <Lenke href="">Endre</Lenke>
                        </div>
                    </div>

                    <div className="oppsummering__boks varighet">
                        <table className="tabell">
                            <tbody>
                                <tr>
                                    <th>Permitteringene vil finne sted fra :</th>
                                    <td>20.03.2020</td>
                                </tr>
                                <tr>
                                    <th>Permitteringene vil vare til:</th>
                                    <td>Vet ikke hvor lenge de vil vare</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="endre-lenke">
                            <Lenke href="">Endre</Lenke>
                        </div>
                    </div>

                    <div className="oppsummering__boks andre-opplysninger">
                        <div className="tekst">
                            <Normaltekst className="overskrift">
                                Eventuelt andre relevante opplysninger
                            </Normaltekst>
                            <Normaltekst>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </Normaltekst>
                        </div>
                        <div className="endre-lenke">
                            <Lenke href="">Endre</Lenke>
                        </div>
                    </div>
                </Veilederpanel>

                <Veilederpanel
                    type="plakat"
                    kompakt
                    fargetema="info"
                    svg={<img src={infoIkon} alt="" aria-hidden="true" />}
                >
                    <Undertittel>Som arbeidsgiver må du:</Undertittel>
                    <ul>
                        <li>Bla bla bla</li>
                        <li>Bla bla bla</li>
                    </ul>
                </Veilederpanel>

                <div className="skjema-innhold__fram-og-tilbake">
                    <Knapp
                        onClick={async () => {
                            await context.lagre();
                            history.push(forrigePath || '');
                        }}
                    >
                        Tilbake
                    </Knapp>
                    <Hovedknapp
                        disabled={context.valider().length > 0}
                        className={'skjema-innhold__lagre'}
                        onClick={async () => {
                            await context.sendInn();
                            history.push('/skjema/kvitteringsside');
                        }}
                    >
                        Send inn meldingen
                    </Hovedknapp>
                </div>
            </section>
        </SkjemaRamme>
    );
};

export default Oppsummering;
