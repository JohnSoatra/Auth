type Json = {
    [key: string]: string | undefined
}

type ResponseLogin = {
    accessToken: string,
    refreshToken: string
}

type ResponseProduct = {
    id: string,
    name: string,
    price: number
}

type JwtContent = JwtType & {
    id: string
}

type Token = {
    name: 'refreshToken' | 'accessToken',
    value: string,
    maxAge: number
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

type Cookie = {
    getAll(): Json;
    get(name: string, _default?: string): string | undefined;
    set(name: string, value: string, duration: number, path?: string): void;
}

type User = {
    "id": number,
    "email": string,
    "provider": string,
    "socialId": string|null,
    "firstName": string,
    "lastName": string,
    "role": {
        "id": number,
        "name": "User"|"Admin",
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

type Auth = AuthData & AuthMethod;

type AuthData = {
    user?: User,
    token?: string,
    refreshToken?: string,
}

type AuthMethod = {
    setToken: (token: Date["refreshToken"]) => void,
    setRefreshToken: (refreshToken: Date["refreshToken"]) => void,
    setUser: (user: Date["user"]) => void
}