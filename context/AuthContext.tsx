'use client';
import { Context, createContext, useCallback, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import useSend from "@/hook/useSend";

const AuthPath = [
    '/',
    '/admin',
];

const Inital: Auth = {
    token: Cookies.get('token'),
    refreshToken: Cookies.get('refreshToken'),
    setUser() {},
    setToken() {},
    setRefreshToken() {},
}

const AuthContext: Context<Auth> = createContext(Inital);

const Modify = ({ children }: { children: React.ReactNode }) => {
    const { token, user } = useAuth();
    const { profile } = useSend();
    const pathname = usePathname();
    const router = useRouter();
    const [loadedData, setLoadedData] = useState(false);

    useEffect(() => {
        if (token !== undefined) {
            profile().then(() => {
                setLoadedData(true);
            });
        }
    }, []);

    useEffect(() => {
        if (loadedData && AuthPath.includes(pathname) && user === undefined) {
            
        }
    }, [loadedData, pathname, user]);

    return children;
}

const useAuth = () => {
    const context = useContext(AuthContext);

    return context;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, _setUser] = useState<AuthData['user']>(Inital.user);
    const [token, _setToken] = useState<AuthData['token']>(Inital.token);
    const [refreshToken, _setRefreshToken] = useState<AuthData['refreshToken']>(Inital.refreshToken);

    const setUser = useCallback((user?: NonNullable<AuthData['user']>) => {
        _setUser(user);
    }, []);

    const setToken = useCallback((token: AuthData['token']) => {
        _setToken(token);

        if (token === undefined) {
            Cookies.remove('token');
        } else {
            Cookies.set('token', token, {
                expires: 0.010417
            });
        }
    }, []);

    const setRefreshToken = useCallback((refreshToken: AuthData['refreshToken']) => {
        _setRefreshToken(refreshToken);

        if (refreshToken === undefined) {
            Cookies.remove('refreshToken');
        } else {
            Cookies.set('refreshToken', refreshToken, {
                expires: 7
            });
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                refreshToken,
                setUser,
                setToken,
                setRefreshToken,
            }}>
            <Modify>
                {children}
            </Modify>
        </AuthContext.Provider>
    );
};

export {
    AuthProvider,
    useAuth
}