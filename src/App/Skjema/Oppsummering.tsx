import React, {FunctionComponent} from "react";
import {Permitteringsskjema} from "../../types/permitteringsskjema";
import {Alert, BodyShort, Box, Button, HStack, Label, VStack} from "@navikt/ds-react";
import {LabeledField} from "../komponenter/LabeledField";
import "./Oppsummering.css"


// viser oppsummering før innsending. Ingen egen route
export const Oppsummering: FunctionComponent<{ skjema: Permitteringsskjema }> = ({skjema}) => {

    const fritekstId = "oppsummeringFritekstfeltId"

    return (
        <Box
            background="bg-default"
            borderRadius="small"
            padding={{xs: '2', md: '4', lg: '8'}}
        >
            <VStack gap="2">
                <h1>Oppsummering</h1>

                <LabeledField label="Virksomhet" field={skjema.bedriftNavn}/>
                <LabeledField label="Bedriftnr." field={skjema.bedriftNavn}/>
                <div className="oppsummering_linje"/>

                <LabeledField label="Kontaktperson" field={skjema.kontaktNavn}/>
                <LabeledField label="E-post" field={skjema.kontaktEpost}/>
                <LabeledField label="Telefonnummer" field={skjema.kontaktTlf}/>
                <div className="oppsummering_linje"/>

                <Label htmlfor={fritekstId}>Hvorfor skal dere permittere?</Label>
                <BodyShort id={fritekstId}>{skjema.fritekst}</BodyShort>
                <div className="oppsummering_linje"/>

                <LabeledField label="Antall berørte" field={skjema.antallBerørt}/>
                <div className="oppsummering_linje"/>

                <Label htmlFor="oppsummeringYrkeskategoriId">Hvilke yrkeskategorierer tilhører de berørte?</Label>
                <BodyShort id="oppsummeringYrkeskategoriId">{skjema.yrkeskategorier.map(i => i.label).join(", ")}</BodyShort>
                <div className="oppsummering_linje"/>

                <LabeledField label="Permitteringene starter" field={skjema.startDato}/>
                {!skjema.ukjentSluttDato &&
                    <LabeledField label="Permitteringene slutter" field={skjema.sluttDato}/>
                }
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