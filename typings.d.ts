type Json = {
    [key: string]: string | undefined
}

type ResponseObject = {
    body: ReadableStream<Uint8Array> | null;
    bodyUsed: boolean;
    headers: Headers;
    ok: boolean;
    redirected: boolean;
    status: number;
    statusText: string;
    type: ResponseType;
    url: string;
    arrayBuffer(): Promise<ArrayBuffer>;
    blob(): Promise<Blob>;
    clone(): Response;
    formData(): Promise<FormData>;
    json(): Promise<any>;
    text(): Promise<string>;
}

type ResponseSend<T> = Response & {
    for: string,
    data: T
}

type AuthRole = "User"|"Admin";

type AuthPath = {
    [key: string]: AuthRole;
}

type AuthLabel = {
    token: 'token',
    refreshToken: 'refreshToken'
}

type AuthRoute = {
    login: string,
    next?: string,
    denied?: string,
    home?: string,
}

type AuthNavProps = {
    route: AuthRoute,
    path: AuthPath
}

type AuthHandleProps = {
    pathname: string,
    fromLogin?: (props: AuthNavProps) => void,
    toLogin?: (props: AuthNavProps) => void,
    deny?: (props: AuthNavProps) => void,
    allow?: (props: AuthNavProps) => void,
}

type AuthLoginProps = {
    email: string,
    password: string
}

type AuthSendProps = {
    url: string,
    args?: RequestInit
}

type AuthUpdateProps = {
    user: Partial<AuthUser>
}

type AuthUser = {
    "id": number,
    "email": string,
    "provider": string,
    "socialId": string|null,
    "firstName": string,
    "lastName": string,
    "role": {
        "id": number,
        "name": AuthRole,
        "__entity": string
    },
    "status": {
        "id": number,
        "name": string,
        "__entity": string
    },
    "createdAt": string,
    "updatedAt": string,
    "deletedAt": string|null
}

type AuthProviderProps = {
    children: React.ReactNode;
    url: {
        login: string,
        logout: string,
        profile: string,
        update: string,
        refresh: string,
    };
    expire: {
        token: number,
        refreshToken: number
    };
    path: AuthPath,
    route: AuthRoute,
    label?: AuthLabel
}

type Auth = AuthData & AuthAction & AuthApi;

type AuthData = {
    user?: AuthUser,
    token?: string,
    refreshToken?: string;
}

type AuthAction = {
    loggingIn: boolean,
    loggingOut: boolean,
    profiling: boolean,
    updating: boolean
}

type AuthApi = {
    login: <T>(props: AuthLoginProps) => Promise<ApiResponse<T>>;
    logout: <T>() => Promise<ApiResponse<T>>;
    profile: <T>() => Promise<ApiResponse<T>>;
    update: <T>(props: AuthUpdateProps) => Promise<ApiResponse<T>>;
    send: <T>(props: AuthSendProps) => Promise<ResponseSend<T> | null>;
}

type ApiResponse<T> = {
    error: false,
    response: ResponseSend<T>
} | {
    error: true,
    response: ResponseSend<T> | null
}