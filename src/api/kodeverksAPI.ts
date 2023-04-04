const hentAArsakskoder = async (): Promise<any> => {
    const response = await fetch('/permittering/api/kodeverk/årsakskoder');
    return await response.json();
};

export const finnÅrsakstekst = async (årsakskode?: string) => {
    const årsakskoder = await hentAArsakskoder();
    const finnkode = Object.entries<string>(årsakskoder).find((kode) => kode[0] === årsakskode);
    return finnkode ? finnkode[1] : undefined;
};
export default hentAArsakskoder;
