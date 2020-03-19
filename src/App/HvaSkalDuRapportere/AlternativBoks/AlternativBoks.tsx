import React, { FunctionComponent } from 'react';
import './AlternativBoks.less';
import Radio from 'nav-frontend-skjema/lib/radio';

interface Props {
    radioknappSkrift: string;
    innholdstekst: JSX.Element;
    onChange: () => void;
    checked: boolean;
}

const AlternativBoks: FunctionComponent<Props> = props => {
    return (
        <div className="alternativ-boks">
            <div className={'alternativ-boks__radiobutton'}>
                <Radio
                    label={props.radioknappSkrift}
                    name="minRadioKnapp"
                    onChange={props.onChange}
                    checked={props.checked}
                />
            </div>
            {props.innholdstekst}
        </div>
    );
};

export default AlternativBoks;
