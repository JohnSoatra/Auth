import { NextRequest, NextResponse } from "next/server";
import Vars from "@/constant/vars";
import jwt from 'jsonwebtoken';
import { setTokens } from "@/util/token";

async function POST(req: NextRequest): Promise<NextResponse<boolean>> {
    const { email, password } = await req.json() as Json;

    if (email !== undefined && password !== undefined) {
        const user = {
            id: 'abc2'
        }

        const accessToken = jwt.sign(
            {
                id: user.id
            },
            process.env.Access_Token!,
            {
                expiresIn: Vars.Expire.Access_Token
            }
        );
        const refreshToken = jwt.sign(
            {
                id: user.id
            },
            process.env.Refresh_Token!,
            {
                expiresIn: Vars.Expire.Refresh_Token
            }
        );
        const tokens: Token[] = [
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

        setTokens(response, tokens);

        return response;
    }

    return NextResponse.json(false);
}

export {
    POST
}