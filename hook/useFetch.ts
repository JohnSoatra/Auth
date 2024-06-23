// import Labels from "@/constant/labels";
// import cookie from "@/util/cookie";
// import { useEffect, useState } from "react";

// type Props = {
//     endpoint: string,
//     init?: RequestInit,
//     refreshEndpoint?: string,
//     refreshInit?: RequestInit,
//     unauthorizedStatusCode?: number
// }

// function useFetch<T=string>({
//     endpoint,
//     init,
//     refreshEndpoint,
//     refreshInit,
//     unauthorizedStatusCode
// }: Props):T | undefined {
//     const [data, setData] = useState(undefined as T | undefined);

//     useEffect(() => {
//         const controller = new AbortController();

//         const work = async () => {
//             try {
//                 let response = await fetch(endpoint, {
//                     signal: controller.signal,
//                     ...init,
//                     headers: {
//                         ...init?.headers,
//                         'Authorization': 'Bearer ' + cookie.get(Labels.Token, '')
//                     }
//                 });
    
//                 if (
//                     response.status === (unauthorizedStatusCode || 401) &&
//                     refreshEndpoint !== undefined &&
//                     endpoint !== refreshEndpoint
//                 ) {
//                     // console.log('un auterize');
//                     response = await fetch(refreshEndpoint, {
//                         signal: controller.signal,
//                         ...refreshInit,
//                         headers: {
//                             ...refreshInit?.headers,
//                             'Authorization': 'Bearer ' + cookie.get(Labels.RefreshToken, '')
//                         }
//                     });
                    
//                     // if (response.status === 200) {
//                     //     response = await fetch(endpoint, {
//                     //         signal: controller.signal,
//                     //         ...init,
//                     //     });
    
//                     //     const data = await response.json();
    
//                     //     setData(data);
//                     // }
//                 } else {
//                     let data = await response.json();
    
//                     setData(data);
//                 }
//             } catch {}
//         }
//         work();

//         return () => {
//             controller.abort();
//         }
//     }, []);

//     return data;
// }

// export default useFetch;