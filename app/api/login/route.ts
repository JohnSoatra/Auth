import { NextRequest, NextResponse } from "next/server";
import Vars from "@/constant/vars";
import jwt from 'jsonwebtoken';
import { Json } from "@/typings";

async function POST(req: NextRequest): Promise<NextResponse<boolean>> {
    const { email, password } = await req.json() as Json;

    if (email !== undefined && password !== undefined) {
        const accessToken = jwt.sign(
            {
                email: email
            },
            process.env.Access_Token,
            {
                expiresIn: Vars.Expire.Access_Token
            }
        );
        const refreshToken = jwt.sign(
            {
                email: email
            },
            process.env.Refresh_Token,
            {
                expiresIn: Vars.Expire.Refresh_Token
            }
        );
        const tokens = [
            {
                name: 'accessToken',
                value: accessToken,
                maxAge: Vars.Expire.Access_Token
            },
            {
                name: 'refreshToken',
                value: refreshToken,
                maxAge: Vars.Expire.Refresh_Token
            }
        ];
        const response = NextResponse.json(true);

        for (let token of tokens) {
            response.cookies.set({
                name: token.name,
                value: token.value,
                maxAge: token.maxAge,
                sameSite: 'strict'
            })
        }

        return response;
    }

    return NextResponse.json(false);
}

export {
    POST
}