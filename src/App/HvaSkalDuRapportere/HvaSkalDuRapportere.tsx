import React, { FunctionComponent } from 'react';
import './HvaSkalDuRapportere.less';
import Undertittel from "nav-frontend-typografi/lib/undertittel";
import Innholdstittel from "nav-frontend-typografi/lib/innholdstittel";
import AlternativBoks from "./AlternativBoks/AlternativBoks";
import Checkbox from "nav-frontend-skjema/lib/checkbox";
import Hovedknapp from "nav-frontend-knapper/lib/hovedknapp";
import Ingress from "nav-frontend-typografi/lib/ingress";

interface Props  {

}

const HvaSkalDuRapportere: FunctionComponent<Props> = props => {
  return (
      <div className="hva-skal-du-rapportere">
        <Innholdstittel>Hva skal du rapportere til oss</Innholdstittel>
        <div className={'hva-skal-du-rapportere__boks-container'}>
        <AlternativBoks innholdstekst={'Over til personer osv osv, there is something about parenthood. gives a sense.\n' +
        '        bla bla bla bla. send in to a great rooted desire. sende dette skjeamet\n' +
        '        bla bla bla bla. send in to a great rooted desire. sende dette skjeamet\n' +
        '        bla bla bla bla. send in to a great rooted desire. sende dette skjeamet'} overskrift={'Masseoppsigelser'} radioknappSkrift={'Masseoppsigelser'}/>
          <AlternativBoks innholdstekst={'Over til personer osv osv, there is something about parenthood. gives a sense.\n' +
          '        bla bla bla bla. send in to a great rooted desire. sende dette skjeamet\n' +
          '        bla bla bla bla. send in to a great rooted desire. sende dette skjeamet\n' +
          '        bla bla bla bla. send in to a great rooted desire. sende dette skjeamet'} overskrift={'Masseptermittering uten lønn'} radioknappSkrift={'Masseptermittering uten lønn'}/>
          <AlternativBoks innholdstekst={'Over til personer osv osv, there is something about parenthood. gives a sense.\n' +
          '        bla bla bla bla. send in to a great rooted desire. sende dette skjeamet\n' +
          '        bla bla bla bla. send in to a great rooted desire. sende dette skjeamet\n' +
          '        bla bla bla bla. send in to a great rooted desire. sende dette skjeamet'} overskrift={'Innskrenkning av arbeidstid'} radioknappSkrift={'Innskrenkning av arbeidstid'}/>
        </div>
        <div className={'hva-skal-du-rapportere__har-varslet'}>
          <Checkbox label={<Ingress>Jeg har varslet det ansatte det gjelder</Ingress>} />
            </div>
        <Hovedknapp className={'hva-skal-du-rapportere__hoved-knapp'}> Gå til skjema</Hovedknapp>
      </div>
  );
};

export default HvaSkalDuRapportere;
