import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

async function GET(req: NextRequest): Promise<NextResponse<ResponseProduct|null>> {
    const productId = req.nextUrl.searchParams.get('id');
    const accessToken = req.headers.get('Authorization')?.split(' ')[1];
    
    if (productId !== null) {
        if (accessToken !== undefined) {
            try {
                // const content: JwtContent = 
                jwt.verify(
                    accessToken,
                    process.env.Access_Token!
                );

                return NextResponse.json({
                    id: productId,
                    name: 'Smart Tv',
                    price: 500
                });
            } catch{}
        }

        return NextResponse.json(null, { status: 401 });
    }

    return NextResponse.json(null, { status: 400 });
}

export {
    GET
}