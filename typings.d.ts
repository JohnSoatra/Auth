import jwt from "jsonwebtoken";

type JwtType = Jwt.Jwt & jwt.JwtPayload & void;

type Json = {
    [key: string]: string|undefined
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
    email: string
}