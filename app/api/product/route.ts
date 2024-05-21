import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { Json, JwtContent, ResponseProduct } from "@/typings";

async function POST(req: NextRequest): Promise<NextResponse<ResponseProduct|null>> {
    const { productId, email, accessToken } = await req.json() as Json;

    if (productId !== undefined && email !== undefined && accessToken !== undefined) {
        try {
            const content: JwtContent =  jwt.verify(
                accessToken,
                process.env.Access_Token
            )

            if (content.email === email) {
                return NextResponse.json({
                    id: productId,
                    name: 'Smart Tv',
                    price: 500
                });
            }
        } catch{}
    }

    return NextResponse.json(null, { status: 498 });
}

export {
    POST
}