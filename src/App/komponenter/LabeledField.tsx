import React from "react";
import {Label, VStack} from "@navikt/ds-react";

type Props = {
    label: string;
    id: string;
    children: React.ReactNode;
}

export const LabeledField = ({ label, id, children }: Props) => (
    <VStack gap="0">
        <Label htmlFor={id}>{label}</Label>
        <div id={id}>{children}</div>
    </VStack>
);