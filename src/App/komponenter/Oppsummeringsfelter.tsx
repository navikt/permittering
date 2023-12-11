import {LabeledField} from "./LabeledField";
import {VStack} from "@navikt/ds-react";
import React, {FunctionComponent} from "react";
import {Permitteringsskjema} from "../../types/Permitteringsskjema";
import {formatDate} from "../../utils/date-utils";
import {labels} from "../Skjema/Skjema";


export const Oppsummeringsfelter: FunctionComponent<{
    skjema: Permitteringsskjema
}> = ({skjema}) => {
    const årsakstekstLabel = {
        "PERMITTERING_UTEN_LØNN": "Årsak til permittering",
        "MASSEOPPSIGELSE": "Årsak til masseoppsigelse",
        "INNSKRENKNING_I_ARBEIDSTID": "Årsak til innskrenkning i arbeidstid"
    }

    return <VStack gap="4">
        <LabeledField label="Virksomhet" field={skjema.bedriftNavn}/>
        <LabeledField label="Virksomhetsnummer" field={skjema.bedriftNr}/>
        <div className="oppsummering_linje"/>

        <LabeledField label="Kontaktperson" field={skjema.kontaktNavn}/>
        <LabeledField label="E-post" field={skjema.kontaktEpost}/>
        <LabeledField label="Telefonnummer" field={skjema.kontaktTlf}/>
        <div className="oppsummering_linje"/>

        <LabeledField label={årsakstekstLabel[skjema.type]} field={skjema.årsakstekst}/>
        <div className="oppsummering_linje"/>

        <LabeledField label="Antall berørte" field={skjema.antallBerørt}/>
        <div className="oppsummering_linje"/>

        <LabeledField label={"Berørte yrkeskategorier"} field={skjema.yrkeskategorier.map(i => i.label).join(", ")}/>
        <div className="oppsummering_linje"/>

        <LabeledField label={labels[skjema.type].startDato} field={formatDate(skjema.startDato)}/>
        {skjema.type === "PERMITTERING_UTEN_LØNN" && (
            <LabeledField label={
                labels[skjema.type].sluttDato} field={skjema.ukjentSluttDato
                ? labels[skjema.type].ukjentSluttDato
                : formatDate(skjema.sluttDato)
            }/>
        )}
        <div className="oppsummering_linje"/>

        {skjema.sendtInnTidspunkt &&
            <LabeledField label="Sendt inn til NAV" field={formatDate(skjema.sendtInnTidspunkt)}/>}
    </VStack>
}