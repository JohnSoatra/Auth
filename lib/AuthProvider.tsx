'use server';
import React from 'react';
import sendApi from './util/send';
import Labels from './labels';
import { cookies } from 'next/headers';
import { _AuthProvider } from './AuthContext';
import { AuthProviderProps, AuthUser } from './types';

const AuthProvider = async ({ ...props }: AuthProviderProps) => {
    const cookieStore = cookies();
    let token = cookieStore.get(props.label?.token || Labels.Token)?.value;
    let refreshToken = cookieStore.get(props.label?.refreshToken || Labels.RefreshToken)?.value;
    let user: AuthUser | undefined = undefined;

    if (!(token === undefined && refreshToken === undefined)) {
        const response = await sendApi<AuthUser>({
            url: props.url.profile,
            refreshUrl: props.url.refresh,
            auth: () => 'Bearer ' + token,
            refreshAuth: () => 'Bearer ' + refreshToken,
            onRefreshSuccess(response) {
                const data = response.data as any;
                token = data.token;
                refreshToken = data.refreshToken;
            }
        });

        if (response !== null && response.ok) {
            user = response.data;
        }
    }

    return (
        <_AuthProvider
            {...props}
            user={user}
            token={token}
            refreshToken={refreshToken}
        />
    );
}

export default AuthProvider;