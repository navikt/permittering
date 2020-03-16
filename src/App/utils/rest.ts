export class ApiError extends Error {
}

export class AutentiseringError extends ApiError {
}

export const fetchGet: (url: string) => Promise<Response> = url => {
    return fetchWithCredentials(url, {headers: {Pragma: 'no-cache'}});
};
export const fetchPost: (url: string, otherParams?: any) => Promise<Response> = (url, otherParams) => {
    return fetchWithCredentials(url, {method: 'POST', ...otherParams});
};
export const fetchDelete: (url: string, otherParams?: any) => Promise<Response> = (url, otherParams) => {
    return fetchWithCredentials(url, {method: 'DELETE', ...otherParams});
};
export const fetchWithCredentials: (url: string, otherParams?: any) => Promise<Response> = (url, otherParams) => {
    return fetch(url, {credentials: 'same-origin', ...otherParams});
};
export const handleResponse = async (response: Response) => {
    if (response.status === 401) {
        throw new AutentiseringError('Er ikke logget inn.');
    }
    if (response.status >= 400 && response.status < 500) {
        const error = await response.json();
        throw new ApiError(error.message);
    }
    if (!response.ok) {
        throw new ApiError('Feil ved kontakt mot baksystem.');
    }
};
