import {LabeledField} from "./LabeledField";
import {BodyShort, Label, VStack} from "@navikt/ds-react";
import React, {FunctionComponent} from "react";
import {Permitteringsskjema} from "../../types/Permitteringsskjema";
import {formatDate} from "../../utils/date-utils";


export const Oppsummeringsfelter: FunctionComponent<{ skjema: Permitteringsskjema }> = ({skjema}) => {
    const fritekstId = "oppsummeringFritekstfeltId"

    const årsakstekstLabel = {
        "PERMITTERING_UTEN_LØNN": "Årsak til permittering",
        "MASSEOPPSIGELSE": "Årsak til masseoppsigelse",
        "INNSKRENKNING_I_ARBEIDSTID": "Årsak til innskrenkning i arbeidstid"
    }
    const fraDatoLabel = {
        "PERMITTERING_UTEN_LØNN": "Permitteringene starter",
        "MASSEOPPSIGELSE": "Masseoppsigelsene starter",
        "INNSKRENKNING_I_ARBEIDSTID": "Innskrenkning i arbeidstid starter"
    }

    const tilDatoLabel = {
        "PERMITTERING_UTEN_LØNN": "Permitteringene ender",
        "INNSKRENKNING_I_ARBEIDSTID": "Innskrenkning i arbeidstid ender"
    }

    return <VStack gap="4">
        <LabeledField label="Virksomhet" field={skjema.bedriftNavn}/>
        <LabeledField label="Bedriftnr." field={skjema.bedriftNavn}/>
        <div className="oppsummering_linje"/>

        <LabeledField label="Kontaktperson" field={skjema.kontaktNavn}/>
        <LabeledField label="E-post" field={skjema.kontaktEpost}/>
        <LabeledField label="Telefonnummer" field={skjema.kontaktTlf}/>
        <div className="oppsummering_linje"/>

        <Label htmlFor={fritekstId}>{årsakstekstLabel[skjema.type]}</Label>
        <BodyShort id={fritekstId}>{skjema.årsakstekst}</BodyShort>
        <div className="oppsummering_linje"/>

        <LabeledField label="Antall berørte" field={skjema.antallBerørt}/>
        <div className="oppsummering_linje"/>

        <Label for="oppsummeringYrkeskategoriId">Berørte yrkeskategorier</Label>
        <BodyShort
            id="oppsummeringYrkeskategoriId">{skjema.yrkeskategorier.map(i => i.label).join(", ")}</BodyShort>
        <div className="oppsummering_linje"/>

        <LabeledField label={fraDatoLabel[skjema.type]} field={formatDate(skjema.startDato)}/>
        {
            !skjema.ukjentSluttDato &&
            skjema.type !== "MASSEOPPSIGELSE" &&
            <LabeledField label={tilDatoLabel[skjema.type]} field={formatDate(skjema.sluttDato)}/>
        }
        <div className="oppsummering_linje"/>
    </VStack>
}