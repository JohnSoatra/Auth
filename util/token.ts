import { NextResponse } from "next/server";

function setTokens(response: NextResponse, tokens: Token[]) {
    for (let token of tokens) {
        response.cookies.set({
            name: token.name,
            value: token.value,
            maxAge: token.maxAge,
            sameSite: 'strict',
        });
    }
}

export {
    setTokens
}