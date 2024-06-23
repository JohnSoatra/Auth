import { toResponse } from "@/util/response";

type Props<T=any> = {
    url: string,
    args?: RequestInit,
    refreshUrl?: string,
    refreshArgs?: RequestInit,
    abortController?: AbortController,
    unauthStatusCode?: number,
    auth?: () => string,
    refreshAuth?: () => string,
    onRefreshSuccess?: (response: ResponseSend<T>) => void
}

async function tryData<T>(response: Response): Promise<T> {
    try {
        return await response.json();
    } catch {}
    
    return null as T;
}

async function sendApi<T=any>({
    url,
    args,
    refreshUrl,
    refreshArgs,
    abortController,
    unauthStatusCode,
    auth,
    refreshAuth,
    onRefreshSuccess
}: Props<T>):Promise<ResponseSend<T>|null> {
    const _abortController = abortController || new AbortController();
    const _unauthStatusCode = unauthStatusCode || 401;

    const abort = () => {
        _abortController.abort();
    }

    try {
        window.addEventListener('beforeunload', abort);
    } catch{}

    try {
        let response = await fetch(url, {
            ...args,
            signal: _abortController.signal,
            headers: {
                ...args?.headers,
                'Authorization': auth ? auth () : ''
            }
        });

        if (
            response.status === _unauthStatusCode &&
            refreshUrl &&
            url !== refreshUrl
        ) {
            response = await fetch(refreshUrl, {
                method: 'POST',
                ...refreshArgs,
                signal: _abortController.signal,
                headers: {
                    ...refreshArgs?.headers,
                    'Authorization': refreshAuth ? refreshAuth() : ''
                }
            });

            if (response.status === 200) {
                if (onRefreshSuccess) {
                    onRefreshSuccess({
                        ...toResponse(response),
                        for: 'refresh',
                        data: await tryData<T>(response)
                    });
                }

                response = await fetch(url, {
                    ...args,
                    signal: _abortController.signal,
                    headers: {
                        ...args?.headers,
                        'Authorization': auth ? auth () : ''
                    }
                });
                
                return {
                    ...toResponse(response),
                    for: 'access',
                    data: await tryData<T>(response)
                }
            }

            return {
                ...toResponse(response),
                for: 'refresh',
                data: await tryData<T>(response)
            };
        }

        return {
            ...toResponse(response),
            for: 'access',
            data: await tryData<T>(response)
        };
    } catch {}

    try {
        window.removeEventListener('beforeunload', abort);
    } catch {}

    return null;
}

export default sendApi;