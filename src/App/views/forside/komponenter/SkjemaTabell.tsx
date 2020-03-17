import React, {Dispatch, SetStateAction} from "react";

interface SkjemaTabellProps {
    skjemaer: Array<SkjemaObject>;
}

interface SkjemaObject {
    id: string,
    orgnr?: string,
    navn?: string,
}

const SkjemaTabell: React.FunctionComponent<SkjemaTabellProps> = ({skjemaer}) => {
    return (
        <table className="skjema__tabell tabell">
            <thead>
            <tr>
                <th role="columnheader" aria-sort="none">id</th>
                <th role="columnheader" aria-sort="none">orgnr</th>
                <th role="columnheader" aria-sort="none">navn</th>
            </tr>
            </thead>
            <tbody>
            {
                skjemaer.map((skjema:any) => {
                    return (<tr key={skjema.id}>
                        <td>{skjema.id}</td>
                        <td>{skjema.orgnr}</td>
                        <td>{skjema.navn}</td>
                    </tr>)
                })
            }
            </tbody>
        </table>
    );
}
export default SkjemaTabell;
