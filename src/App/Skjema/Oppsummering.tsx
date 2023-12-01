import React, {FunctionComponent} from "react";
import {Permitteringsskjema} from "../../types/permitteringsskjema";
import {Alert, BodyShort, Box, Button, HStack, VStack} from "@navikt/ds-react";
import {LabeledField} from "../komponenter/LabeledField";
import "./Oppsummering.css"

const HorisontalStack = ({children}: {children: React.ReactNode}) =>
    <HStack gap="16" className="oppsummering_grupper">
        {children}
    </HStack>

export const Oppsummering: FunctionComponent<{ skjema: Permitteringsskjema }> = ({skjema}) => {
    // viser oppsummering før innsending. Ingen egen route
    const id = (felt: string) => `OppsummeringFelt${felt}Id`;

    return (
        <Box
            background="bg-default"
            borderRadius="small"
            padding={{xs: '2', md: '4', lg: '8'}}
        >
            <VStack gap="4">
                <h1>Oppsummering</h1>

                <HorisontalStack>
                    <LabeledField label="Virksomhet" id={id("Virksomhet")}>
                        <BodyShort>{skjema.bedriftNavn}</BodyShort>
                    </LabeledField>
                    <LabeledField label="Bedriftnr." id={id("Bedriftnr")}>
                        <BodyShort>{skjema.bedriftNavn}</BodyShort>
                    </LabeledField>
                </HorisontalStack>
                <HorisontalStack>
                    <LabeledField label="Kontaktperson" id={id("Kontaktperson")}>
                        <BodyShort>{skjema.kontaktNavn}</BodyShort>
                    </LabeledField>
                    <LabeledField label="E-post" id={id("E-post")}>
                        <BodyShort>{skjema.kontaktEpost}</BodyShort>
                    </LabeledField>
                    <LabeledField label="Telefonnummer" id={id("Telefonnummer")}>
                        <BodyShort>{skjema.kontaktTlf}</BodyShort>
                    </LabeledField>
                </HorisontalStack>
                <HorisontalStack>
                    <LabeledField label={"Hvorfor skal dere permittere?"} id="HvorforPermittere">
                        <BodyShort>{skjema.fritekst}</BodyShort>
                    </LabeledField>
                </HorisontalStack>
                <HorisontalStack>
                    <LabeledField label="Antall berørte" id={id("AntallBerørte")}>
                        <BodyShort>{skjema.antallBerørt}</BodyShort>
                    </LabeledField>
                </HorisontalStack>
                <HorisontalStack>
                    <LabeledField label="Hvilke yrkeskategorierer tilhører de berørte?" id={id("Yrkeskategorier")}>
                        <BodyShort>{skjema.yrkeskategorier.map(i => i.label).join(", ")}</BodyShort>
                    </LabeledField>
                </HorisontalStack>
                <HStack gap="8">
                    <LabeledField label="Permitteringene starter" id={id("Startdato")}>
                        <BodyShort>{skjema.startDato}</BodyShort>
                    </LabeledField>
                    {!skjema.ukjentSluttDato && <LabeledField label="Permitteringene slutter" id={id("Sluttdato")}>
                        <BodyShort>{skjema.sluttDato}</BodyShort>
                    </LabeledField>}
                </HStack>
                <Alert variant="info">
                    Alle med rettigheten "Innsyn i permittering- og nedbemanningsmeldinger sendt til NAV" vil kunne se meldingen etter den er sendt inn.
                </Alert>
                <HStack gap="18">
                    <Button variant="secondary">Tilbake</Button>
                    <Button variant="primary">Send inn</Button>
                </HStack>
            </VStack>

        </Box>
    );
}