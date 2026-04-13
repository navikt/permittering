import { faro } from '@grafana/faro-web-sdk';

const DEFAULT_TIMEOUT_MS = 10000;

export class FetchTimeoutError extends Error {
    constructor(url: string, timeoutMs: number) {
        super(`Request to ${url} timed out after ${timeoutMs}ms`);
        this.name = 'FetchTimeoutError';
    }
}

export async function fetchMedTimeout(
    input: RequestInfo | URL,
    init?: RequestInit,
    timeoutMs = DEFAULT_TIMEOUT_MS
): Promise<Response> {
    const url = String(input);
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

    try {
        return await fetch(input, {
            ...init,
            signal: init?.signal ?? controller.signal,
        });
    } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
            const timeoutError = new FetchTimeoutError(url, timeoutMs);
            faro.api.pushError(timeoutError);
            throw timeoutError;
        }

        if (error instanceof Error) {
            faro.api.pushError(new Error(`Fetch failed for ${url}: ${error.message}`));
        }

        throw error;
    } finally {
        window.clearTimeout(timeoutId);
    }
}
