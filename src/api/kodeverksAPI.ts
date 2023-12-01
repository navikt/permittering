export const hentAArsakskoder = async (): Promise<any> => {
    const response = await fetch('/permittering/api/kodeverk/årsakskoder');
    return await response.json();
};

export const finnÅrsakstekst = async (årsakskode?: string) => {
    if (årsakskode === undefined) {
        return undefined;
    }
    const årsakskoder = await hentAArsakskoder();
    return årsakskoder[årsakskode];
};