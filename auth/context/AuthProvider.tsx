import React from 'react';
import sendApi from '@/util/send';
import Labels from '@/constant/labels';
import { _AuthProvider } from './AuthContext';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { onlyPathname } from '@/util/url';

const AuthProvider = async ({ ...props }: AuthProviderProps) => {
    const cookieStore = cookies();
    let token = cookieStore.get(props.label?.token || Labels.Token)?.value;
    let refreshToken = cookieStore.get(props.label?.refreshToken || Labels.RefreshToken)?.value;

    // if (!(token === undefined && refreshToken === undefined)) {
    //     const response = await sendApi<AuthUser>({
    //         url: props.url.profile,
    //         refreshUrl: props.url.refresh,
    //         auth: () => 'Bearer ' + token,
    //         refreshAuth: () => 'Bearer ' + refreshToken,
    //         onRefreshSuccess(response) {
    //             const data = response.data as any;
    //             token = data.token;
    //             refreshToken = data.refreshToken;
    //         }
    //     });

    //     if (response && response.ok) {
    //         return (
    //             <_AuthProvider
    //                 {...props}
    //                 user={response.data}
    //                 token={token}
    //                 refreshToken={refreshToken}
    //             />
    //         );
    //     }
    // }
    // const url = headers().get('referer');
    // console.log(url);
    // console.log(url !== null ? onlyPathname(url) : '/');
    // headers().forEach((value, key) => {
    //     console.log(key, value);
    // });


    return (
        <div></div>
        // <_AuthProvider
        //     {...props}
        // />
    );
}

export default AuthProvider;