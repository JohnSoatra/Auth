import Labels from "@/constant/labels";
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
    onRefreshSucess?: (response: ResponseSend<T>) => void
}

async function apiSend<T=any>({
    url,
    args,
    refreshUrl,
    refreshArgs,
    abortController,
    unauthStatusCode,
    auth,
    refreshAuth,
    onRefreshSucess
}: Props<T>):Promise<ResponseSend<T>|null> {
    const _abortController = abortController || new AbortController();
    const _unauthStatusCode = unauthStatusCode || 401;

    const abort = () => {
        _abortController.abort();
    }

    window.addEventListener('beforeunload', abort);

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
                if (onRefreshSucess) {
                    onRefreshSucess({
                        ...toResponse(response),
                        for: Labels.Access,
                        data: await response.json()
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
                    for: Labels.Access,
                    data: await response.json()
                }
            }

            return {
                ...toResponse(response),
                for: Labels.Access,
                data: await response.json()
            };
        }

        return {
            ...toResponse(response),
            for: Labels.Access,
            data: await response.json()
        };
    } catch {}

    window.removeEventListener('beforeunload', abort);

    return null;
}

export default apiSend;