'use client';
import apiSend from "@/util/send";
import { useAuth } from "@/context/AuthContext";
import { useCallback, useRef } from "react";

type SendProps = {
    url: string,
    args?: RequestInit
}

type LoginProps = {
    email: string,
    password: string
}

function withBaseUrl(string: string) {
    return `https://nestjs-boilerplate-test.herokuapp.com/api/v1/auth/${string}`;
}

const useSend = () => {
    const { user, token, refreshToken, setUser, setToken, setRefreshToken } = useAuth();
    const ref = useRef<AuthData>({
        user,
        token,
        refreshToken
    });

    const send = useCallback(<T=any>({ url, args }: SendProps) => {
        return apiSend<T>({
            url,
            args,
            refreshUrl: withBaseUrl('refresh'),
            auth: () => 'Bearer ' + (ref.current.token || ''),
            refreshAuth: () => 'Bearer ' + (ref.current.refreshToken || ''),
            onRefreshSucess(response) {
                const data = response.data as any;
                const newToken = data.token;
                const newRefreshToken = data.refreshToken;
                
                ref.current.token = newToken;
                ref.current.refreshToken = newRefreshToken;
                
                setToken(newToken);
                setRefreshToken(newRefreshToken);
            }
        });
    }, []);

    const login = useCallback(async ({ email, password }: LoginProps): Promise<boolean> => {
        const response = await send({
            url: withBaseUrl('email/login'),
            args: {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            },
        });

        console.log(response);

        if (response && response.status === 200) {
            const data = response.data;
            const user = data.user;
            const token = data.token;
            const refreshToken = data.refreshToken;

            setUser(user);
            setToken(token);
            setRefreshToken(refreshToken);

            return true;
        }

        return false;
    }, []);

    const logout = useCallback(async (): Promise<boolean> => {
        const response = await send({
            url: withBaseUrl('logout'),
            args: {
                method: 'POST',
            },
        });

        if (response && response.ok) {
            setUser(undefined);
            setToken(undefined);
            setRefreshToken(undefined);

            return true;
        }

        return false;
    }, []);

    const profile = useCallback(async (): Promise<boolean> => {
        const response = await send({
            url: withBaseUrl('me')
        });

        if (response && response.ok) {
            setUser(response.data);

            return true;
        }

        return false;
    }, []);

    return {
        send,
        login,
        logout,
        profile
    }
}

export default useSend;