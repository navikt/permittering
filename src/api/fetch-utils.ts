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
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

    try {
        return await fetch(input, {
            ...init,
            signal: init?.signal ?? controller.signal,
        });
    } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
            throw new FetchTimeoutError(String(input), timeoutMs);
        }

        throw error;
    } finally {
        window.clearTimeout(timeoutId);
    }
}
