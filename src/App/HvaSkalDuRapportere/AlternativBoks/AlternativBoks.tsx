import React, { FunctionComponent } from 'react';
import './AlternativBoks.less';
import Radio from "nav-frontend-skjema/lib/radio";


interface Props  {

}

const AlternativBoks: FunctionComponent<Props> = props => {
  return (
      <div className="alternativ-boks">
        <div className={'alternativ-boks__radiobutton'}>
          <Radio label={'Radio-label'} name="minRadioKnapp" />
        </div>
        Over til personer osv osv, there is something about parenthood. gives a sense.
        bla bla bla bla. send in to a great rooted desire. sende dette skjeamet
        bla bla bla bla. send in to a great rooted desire. sende dette skjeamet
        bla bla bla bla. send in to a great rooted desire. sende dette skjeamet
      </div>
  );
};

export default AlternativBoks;
