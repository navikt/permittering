import React from "react";
import {BodyShort, HStack, Label, VStack} from "@navikt/ds-react";

type Props = {
    label: string;
    field: React.ReactNode;
}

const idconcat = (felt: string) => `LabeledField${felt.replace(" ","_")}Id`;

export const LabeledField = ({ label, field }: Props) => {
    const id = idconcat(label);
    return <HStack gap="0">
        <Label style={{width: "10rem"}} htmlFor={id}>{`${label}: `}</Label>
        <BodyShort id={id}>{field}</BodyShort>
    </HStack>
}