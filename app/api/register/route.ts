import { Json } from "@/typings";
import { NextRequest, NextResponse } from "next/server";

async function POST(req: NextRequest): Promise<NextResponse<boolean>> {
    const { email, password } = await req.json() as Json;

    if (email !== undefined && password !== undefined) {
        return NextResponse.json(true);
    }

    return NextResponse.json(false);
}

export {
    POST
}