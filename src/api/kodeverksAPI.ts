import { permitteringsAArsakksodeverk } from '../paths.json';

const hentAArsakskoder = async (): Promise<any> => {
    const response = await fetch(permitteringsAArsakksodeverk);
    return await response.json();
};

export default hentAArsakskoder;
