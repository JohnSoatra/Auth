import { NextRequest, NextResponse } from "next/server";

async function GET(req: NextRequest): Promise<NextResponse<boolean>> {
    const tokens = [
        'accessToken',
        'refreshToken'
    ];
    const response = NextResponse.json(true);

    for (let token of tokens) {
        response.cookies.delete(token);
    }

    return response;
}

export {
    GET
}