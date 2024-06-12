import { NextRequest, NextResponse } from "next/server";
import Vars from "@/constant/vars";
import jwt from 'jsonwebtoken';
import { setTokens } from "@/util/token";

async function GET(req: NextRequest): Promise<NextResponse<boolean>> {
    const refreshToken = req.headers.get('Authorization')?.split(' ')[1];

    if (refreshToken !== undefined) {
        try {
            const content: JwtContent = jwt.verify(
                refreshToken,
                process.env.Refresh_Token!
            );
    
            const accessToken = jwt.sign(
                {
                    id: content.id
                },
                process.env.Access_Token!,
                {
                    expiresIn: Vars.Expire.Access_Token
                }
            );
            const newRefreshToken = jwt.sign(
                {
                    id: content.id
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
                    value: newRefreshToken,
                    maxAge: Vars.Expire.Refresh_Token
                }
            ];
            const response = NextResponse.json(true);
    
            setTokens(response, tokens);
    
            return response;
        } catch {}
    }

    return NextResponse.json(false, { status: 401 });
}

export {
    GET
}