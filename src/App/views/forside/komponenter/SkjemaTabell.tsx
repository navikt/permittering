import React from "react";
import { PermitteringsskjemaITabell } from "../../../../types/permitteringsskjema";

interface SkjemaTabellProps {
  skjemaer: PermitteringsskjemaITabell[];
}

const SkjemaTabell: React.FunctionComponent<SkjemaTabellProps> = ({
  skjemaer
}) => {
  return (
    <table className="skjema__tabell tabell">
      <thead>
        <tr>
          <th role="columnheader" aria-sort="none">
            id
          </th>
          <th role="columnheader" aria-sort="none">
            orgnr
          </th>
          <th role="columnheader" aria-sort="none">
            navn
          </th>
        </tr>
      </thead>
      <tbody>
        {skjemaer.map(skjema => {
          return (
            <tr key={skjema.id}>
              <td>{skjema.id}</td>
              <td>{skjema.bedriftNr}</td>
              <td>{skjema.bedriftNavn}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default SkjemaTabell;
