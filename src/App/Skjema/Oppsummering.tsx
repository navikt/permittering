import React, { FunctionComponent, useContext } from "react";
import "./Skjema.less";
import Hovedknapp from "nav-frontend-knapper/lib/hovedknapp";
import Sidetittel from "nav-frontend-typografi/lib/sidetittel";
import SkjemaContext from "../SkjemaContext/SkjemaContext";
import Knapp from "nav-frontend-knapper/lib/knapp";
import SkjemaRamme from "../komponenter/SkjemaRamme";
import { useHistory } from "react-router-dom";
import Tekstomrade from "nav-frontend-tekstomrade";
import {
  forrigeSide,
  nesteSide,
  SkjemaSideProps,
  skjemaSteg
} from "./skjema-steg";

const Oppsummering: FunctionComponent<SkjemaSideProps> = () => {
  const context = useContext(SkjemaContext);
  const history = useHistory();
  const steg = skjemaSteg(history.location.pathname);
  const nestePath = nesteSide(steg, context.skjema.id);
  const forrigePath = forrigeSide(steg, context.skjema.id);
  return (
    <SkjemaRamme>
      <Sidetittel>Oppsummering</Sidetittel>
      <Tekstomrade>{`
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed mollis nisl. Praesent scelerisque efficitur
                gravida. Suspendisse placerat nisi sit amet dui pellentesque, rutrum volutpat felis sagittis. Quisque dictum
                vitae lacus non tempor. Donec interdum arcu non congue porttitor. Phasellus ornare ipsum ac accumsan porttitor.
                Proin tincidunt sollicitudin tincidunt. Vivamus porta mauris nibh, vel varius orci interdum vel. Sed lacus arcu,
                volutpat gravida iaculis sit amet, malesuada eu tellus. Nulla vel consequat nibh, in eleifend turpis. Sed auctor
                ante ut velit blandit, pulvinar fringilla ipsum mattis. Sed pharetra bibendum maximus. Vestibulum ullamcorper
                eu nunc vel elementum.

                Suspendisse potenti. Curabitur rhoncus pellentesque eros sed suscipit. Donec aliquet sem at lectus varius varius.
                Duis dictum condimentum odio, quis pretium metus. Donec sagittis imperdiet mauris, nec porttitor metus aliquam id.
                Mauris ut tincidunt nunc. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                Praesent faucibus, mi vel bibendum pretium, risus quam elementum diam, ac eleifend est sapien sit amet velit. Ut
                eget neque elit.

                Nam sit amet eros at quam interdum egestas. Nunc tincidunt elit sit amet dui congue, vitae efficitur diam tincidunt.
                Vestibulum elit lacus, vulputate sit amet pretium vitae, auctor sed turpis. Pellentesque imperdiet, ipsum a hendrerit
                placerat, dolor tortor semper sem, accumsan vestibulum velit ligula et ante. Nulla ac lectus ornare, fermentum metus
                non, blandit tortor. Maecenas laoreet mauris in lorem euismod, et lobortis mauris iaculis. Quisque scelerisque, lectus id
                venenatis luctus, erat diam ornare risus, sed sodales enim sem ut mauris.
            `}</Tekstomrade>
      <div className={"skjema-innhold__fram-og-tilbake"}>
        <Knapp
          onClick={() => {
            context.lagre();
            history.push(forrigePath || "");
          }}
        >
          Tilbake
        </Knapp>
        <Hovedknapp
          className={"skjema-innhold__lagre"}
          onClick={() => {
            context.lagre();
            history.push(nestePath || "");
          }}
        >
          Lagre og neste
        </Hovedknapp>
        <Knapp>Fram</Knapp>
      </div>
    </SkjemaRamme>
  );
};

export default Oppsummering;
