export interface Organisasjon {
    Name: string;
    Type: string;
    OrganizationNumber: string;
    OrganizationForm: string;
    Status: string;
    ParentOrganizationNumber: string;
}

export interface JuridiskEnhetMedUnderEnheterArray {
    JuridiskEnhet: Organisasjon;
    Underenheter: Array<Organisasjon>;
}

export const tomAltinnOrganisasjon: Organisasjon = {
    Name: '',
    Type: '',
    OrganizationNumber: '',
    OrganizationForm: '',
    Status: '',
    ParentOrganizationNumber: '',
};

export interface OrganisasjonFraEnhetsregisteret {
    organisasjonsnummer: string;
    navn: string;
    organisasjonsform: {
        kode: string;
        beskrivelse: string;
    };
    overordnetEnhet: string;
}

export const tomEnhetsregOrg: OrganisasjonFraEnhetsregisteret = {
    organisasjonsnummer: '',
    navn: '',
    organisasjonsform: {
        kode: '',
        beskrivelse: '',
    },
    overordnetEnhet: '',
};

export interface ListeMedJuridiskeEnheter {
    _embedded: {
        enheter: OrganisasjonFraEnhetsregisteret[];
    };
    _links: {
        self: {
            href: string;
        };
    };
    page: {
        size: number;
        totalElements: number;
        totalPages: number;
        number: 0;
    };
}
