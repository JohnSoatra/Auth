'use client';
import { Context, createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import sendApi from "@/util/send";
import queryString from "@/util/query";
import { onlyPathname } from "@/util/url";
import Labels from "@/constant/labels";

const InitialAuth: Auth = {
    token: Cookies.get(Labels.Token),
    refreshToken: Cookies.get(Labels.RefreshToken),
    loggingIn: false,
    loggingOut: false,
    profiling: false,
    updating: false,
    login: async () => ({ error: true, response: null }),
    logout: async () => ({ error: true, response: null }),
    profile: async () => ({ error: true, response: null }),
    update: async () => ({ error: true, response: null }),
    send: async () => null,
}

const AuthContext: Context<Auth> = createContext(InitialAuth);

const _AuthProvider = ({
    url,
    expire,
    route,
    path,
    label,
    user: newUser,
    token: newToken,
    refreshToken: newRefreshToken,
    children
}: AuthProviderProps & AuthData) => {
    const [user, setUser] = useState<AuthData['user']>(newUser || InitialAuth.user);
    const [token, _setToken] = useState<AuthData['token']>(newToken || InitialAuth.token);
    const [refreshToken, _setRefreshToken] = useState<AuthData['refreshToken']>(newRefreshToken || InitialAuth.refreshToken);
    const [loggingIn, setLoggingIn] = useState<AuthAction['loggingIn']>(InitialAuth.loggingIn);
    const [loggingOut, setLoggingOut] = useState<AuthAction['loggingOut']>(InitialAuth.loggingOut);
    const [profiling, setProfiling] = useState<AuthAction['profiling']>(InitialAuth.profiling);
    const [updating, setUpdating] = useState<AuthAction['updating']>(InitialAuth.updating);
    const refToken = useRef<AuthData>({
        token,
        refreshToken
    });
    const pathname = usePathname();
    const router = useRouter();

    const setToken = useCallback((token: AuthData['token']) => {
        refToken.current.token = token;

        _setToken(token);

        if (token === undefined) {
            Cookies.remove(label?.token || Labels.Token);
        } else {
            Cookies.set(label?.token || Labels.Token, token, {
                expires: expire.token
            });
        }
    }, []);

    const setRefreshToken = useCallback((refreshToken: AuthData['refreshToken']) => {
        refToken.current.refreshToken = refreshToken;

        _setRefreshToken(refreshToken);

        if (refreshToken === undefined) {
            Cookies.remove(label?.refreshToken || Labels.RefreshToken);
        } else {
            Cookies.set(label?.refreshToken || Labels.RefreshToken, refreshToken, {
                expires: expire.refreshToken
            });
        }
    }, []);

    const handle = useCallback(({ pathname, fromLogin, toLogin, deny, allow }: AuthHandleProps) => {
        if (onlyPathname(pathname) === onlyPathname(route.login)) {
            if (user !== undefined) {
                fromLogin && fromLogin({ route, path });
            } else {
                allow && allow({ route, path });
            }
        } else {
            let pathRole: string|undefined = undefined;

            for (let key in path) {
                if (onlyPathname(key) === onlyPathname(pathname)) {
                    pathRole = path[key];
                    break;
                }
            }

            if (pathRole !== undefined) {
                if (user === undefined) {
                    toLogin && toLogin({ route, path });
                } else if (
                    pathRole === 'Admin' &&
                    user.role.name !== 'Admin'
                ) {
                    deny && deny({ route, path });
                } else {
                    allow && allow({ route, path });
                }
            } else {
                allow && allow({ route, path });
            }
        }
    }, [user]);

    const send: AuthApi['send'] = useCallback(<T=any>({ url: _url, args }: AuthSendProps) => {
        return sendApi<T>({
            url: _url,
            args,
            refreshUrl: url.refresh,
            auth: () => 'Bearer ' + (refToken.current.token || ''),
            refreshAuth: () => 'Bearer ' + (refToken.current.refreshToken || ''),
            onRefreshSuccess(response) {
                const data = response.data as any;
                const newToken = data.token;
                const newRefreshToken = data.refreshToken;

                setToken(newToken);
                setRefreshToken(newRefreshToken);
            }
        });
    }, []);

    const login: AuthApi['login'] = useCallback(async <T=any>({ email, password }: AuthLoginProps) => {
        setLoggingIn(true);

        const response = await send<T>({
            url: url.login,
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

        if (response !== null) {
            if (response.ok) {
                const data = response.data as any;
                const user = data.user;
                const token = data.token;
                const refreshToken = data.refreshToken;
    
                setUser(user);
                setToken(token);
                setRefreshToken(refreshToken);
    
                return {
                    error: false,
                    response
                }
            }

            return {
                error: true,
                response
            }
        }

        setLoggingIn(false);

        return {
            error: true,
            response
        };
    }, []);

    const logout: AuthApi['logout'] = useCallback(async <T=any>() => {
        setLoggingOut(true);

        const response = await send<T>({
            url: url.logout,
            args: {
                method: 'POST',
            },
        });

        if (response !== null) {
            if (response.ok) {
                setUser(undefined);
                setToken(undefined);
                setRefreshToken(undefined);
    
                return {
                    error: false,
                    response
                }
            }

            return {
                error: true,
                response
            }
        }

        setLoggingOut(false);

        return {
            error: true,
            response
        };
    }, []);

    const profile: AuthApi['profile'] = useCallback(async <T=any>() => {
        setProfiling(true);

        const response = await send<T>({
            url: url.profile
        });

        if (response !== null) {
            if (response.ok) {
                setUser(response.data as any);

                return {
                    error: false,
                    response
                }
            }

            return {
                error: true,
                response
            }
        }

        setProfiling(false);

        return {
            error: true,
            response
        };
    }, []);

    const update: AuthApi['update'] = useCallback(async <T=any>() => {
        setUpdating(true);

        const response = await send<T>({
            url: url.update
        });

        if (response !== null) {
            if (response.ok) {
                setUser(response.data as any);
    
                return {
                    error: false,
                    response
                }
            }

            return {
                error: true,
                response
            }
        }

        setUpdating(false);

        return {
            error: true,
            response
        };
    }, []);

    useEffect(() => { 
        if (token === undefined) {
            Cookies.remove(label?.token || Labels.Token);
        } else {
            Cookies.set(label?.token || Labels.Token, token, {
                expires: expire.token
            });
        }

        if (refreshToken === undefined) {
            Cookies.remove(label?.refreshToken || Labels.RefreshToken);
        } else {
            Cookies.set(label?.refreshToken || Labels.RefreshToken, refreshToken, {
                expires: expire.refreshToken
            });
        }
    }, []);

    useEffect(() => {
        // handle({
        //     pathname,
        //     fromLogin({route}) {
        //         if (route.next !== undefined) {
        //             router.replace(route.next);
        //         } else {
        //             const from = new URLSearchParams(window.location.search).get('from');
        //             const to: string = from !== null ? from : (route.home || '/');

        //             router.replace(to);
        //         }
        //     },
        //     toLogin: ({route}) => {
        //         const slice = route.login.split('?');

        //         router.replace(slice[0] + queryString({
        //             search: slice[1],
        //             update: {
        //                 'from': pathname
        //             }
        //         }));
        //     }
        // });
    }, [pathname, user]);

    useEffect(() => {
        const onClick = (evt: MouseEvent) => {
            let target = evt.target as HTMLAnchorElement;

            if (target.tagName === 'A') {
                handle({
                    pathname: target.href,
                    fromLogin() {
                        evt.preventDefault();
                        evt.stopPropagation();
                    },
                    toLogin({ route }) {
                        evt.preventDefault();
                        evt.stopPropagation();

                        const slice = route.login.split('?');

                        router.push(slice[0] + queryString({
                            search: slice[1],
                            update: {
                                'from': onlyPathname(target.href)
                            }
                        }));
                    }
                })
            }
        }

        window.addEventListener('click', onClick, true);

        return () => {
            window.removeEventListener('click', onClick, true);
        }
    }, [user]);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                refreshToken,
                loggingIn,
                loggingOut,
                profiling,
                updating,
                login,
                logout,
                profile,
                update,
                send
            }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);

    return context;
};

export {
    useAuth,
    _AuthProvider,
}