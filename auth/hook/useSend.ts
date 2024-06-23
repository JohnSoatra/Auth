// 'use client';
// import { useCallback, useRef } from "react";
// import { useAuth, useAuthMethod } from "@/auth/context/AuthContext";
// import sendApi from "@/util/send";
// import Vars from "@/constant/vars";

// type SendProps = {
//     url: string,
//     args?: RequestInit
// }

// type LoginProps = {
//     email: string,
//     password: string
// }

// function withBaseUrl(string: string) {
//     return `${Vars.Url.Base}/${string}`;
// }

// const useSend = () => {
//     const { user, token, refreshToken } = useAuth();
//     const { setUser, setToken, setRefreshToken, setLoggingIn, setLoggingOut, setProfiling } = useAuthMethod();
//     const ref = useRef<AuthData>({
//         user,
//         token,
//         refreshToken
//     });

//     const send = useCallback(<T=any>({ url, args }: SendProps) => {
//         return sendApi<T>({
//             url,
//             args,
//             refreshUrl: withBaseUrl('refresh'),
//             auth: () => 'Bearer ' + (ref.current.token || ''),
//             refreshAuth: () => 'Bearer ' + (ref.current.refreshToken || ''),
//             onRefreshSucess(response) {
//                 const data = response.data as any;
//                 const newToken = data.token;
//                 const newRefreshToken = data.refreshToken;
                
//                 ref.current.token = newToken;
//                 ref.current.refreshToken = newRefreshToken;
                
//                 setToken(newToken);
//                 setRefreshToken(newRefreshToken);
//             }
//         });
//     }, []);

//     const login = useCallback(async ({ email, password }: LoginProps): Promise<boolean> => {
//         setLoggingIn(true);

//         let result = false;

//         const response = await send({
//             url: withBaseUrl('email/login'),
//             args: {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     email,
//                     password
//                 })
//             },
//         });

//         if (response && response.status === 200) {
//             const data = response.data;
//             const user = data.user;
//             const token = data.token;
//             const refreshToken = data.refreshToken;

//             setUser(user);
//             setToken(token);
//             setRefreshToken(refreshToken);

//             result = true;
//         }

//         setLoggingIn(false);

//         return result;
//     }, []);

//     const logout = useCallback(async (): Promise<boolean> => {
//         setLoggingOut(true);

//         let result = false;

//         const response = await send({
//             url: withBaseUrl('logout'),
//             args: {
//                 method: 'POST',
//             },
//         });

//         if (response && response.ok) {
//             setUser(undefined);

//             result = true;
//         }

//         setLoggingOut(false);

//         return result;
//     }, []);

//     const profile = useCallback(async (): Promise<boolean> => {
//         setProfiling(true);

//         let result = false;

//         const response = await send({
//             url: withBaseUrl('me')
//         });

//         if (response && response.ok) {
//             setUser(response.data);

//             result = true;
//         }

//         setProfiling(false);

//         return result;
//     }, []);

//     return {
//         send,
//         login,
//         logout,
//         profile
//     }
// }

// export default useSend;