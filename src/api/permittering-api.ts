import {Permitteringsskjema} from '../types/Permitteringsskjema';

export async function sjekkInnlogget(): Promise<boolean> {
    let respons = await fetch('/permittering/api/innlogget');
    return respons.ok;
}

export const hent = async (id: string) => {
    const response = await fetch(`/permittering/api/skjema/${id}`);
    return response.json();
};

export const hentAlle = async () => {
    const response = await fetch('/permittering/api/skjema');
    return response.json();
};


export const lagre = async (skjema: Permitteringsskjema) => {
    const response = await fetch(`/permittering/api/skjema/${skjema.id}`, {
        body: JSON.stringify(skjema),
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
};

export const sendInn = async (id: Permitteringsskjema['id']) => {
    const response = await fetch(`/permittering/api/skjema/${id}/send-inn`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
};

