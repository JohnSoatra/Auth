import { useEffect, useState } from "react";

type Props = {
    endpoint: string,
    init?: RequestInit,
    refreshEndpoint?: string,
    refreshInit?: RequestInit
}

function useFetch<T=string>({
    endpoint,
    init,
    refreshEndpoint,
    refreshInit,
}: Props):T | undefined {
    const [data, setData] = useState(undefined as T | undefined);

    useEffect(() => {
        const controller = new AbortController();

        const work = async () => {
            try {
                let response = await fetch(endpoint, {
                    signal: controller.signal,
                    ...init
                });
    
                if (
                    response.status === 498 &&
                    refreshEndpoint !== undefined &&
                    endpoint !== refreshEndpoint
                ) {
                    response = await fetch(refreshEndpoint, {
                        signal: controller.signal,
                        ...refreshInit
                    });
                    
                    if (response.status === 200) {
                        response = await fetch(endpoint, {
                            signal: controller.signal,
                            credentials: 'include',
                            ...init,
                        });
    
                        const data = await response.json();
    
                        setData(data);
                    }
                } else {
                    let data = await response.json();
    
                    setData(data);
                }
            } catch {}
        }
        work();

        return () => {
            controller.abort();
        }
    }, []);

    return data;
}

export default useFetch;