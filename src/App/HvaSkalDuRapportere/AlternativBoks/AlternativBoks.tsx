import React, { FunctionComponent } from 'react';
import './AlternativBoks.less';
import Checkbox from "nav-frontend-skjema/lib/checkbox";

interface Props  {

}

const AlternativBoks: FunctionComponent<Props> = props => {
  return (
      <div className="alternativ-boks">
        <div className={'alternativ-boks__checkboks'}>
        <Checkbox label={'Masseoppsigelser'} />
        </div>
      </div>
  );
};

export default AlternativBoks;
