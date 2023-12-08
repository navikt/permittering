import React from "react";
import {BodyShort, HStack, Label} from "@navikt/ds-react";
import "../Skjema/Oppsummering.css"

type Props = {
    label: string;
    field: React.ReactNode;
}

const idconcat = (felt: string) => `LabeledField${felt.replaceAll(" ","_")}Id`;

export const LabeledField = ({ label, field }: Props) => {
    const id = idconcat(label);
    const style = {width: "min(16rem, calc(100vw - 16px))"}
    return <HStack gap="0">
        <Label style={style} htmlFor={id}>{`${label}: `}</Label>
        <BodyShort style={style} id={id}>{field}</BodyShort>
    </HStack>
}