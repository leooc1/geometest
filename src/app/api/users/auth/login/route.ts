import modelUsers from "@/app/api/modelUsers";
import { NextRequest, NextResponse } from "next/server";

type Result = {
    status:number,
    value: JSON | string
}

type reqBory = {
    EMAIL: string,
    SENHA: string
}

export async function POST(req: NextRequest) {
    const { EMAIL, SENHA }:reqBory = await req.json()
    const result:Result = await modelUsers.login(EMAIL, SENHA)
    return NextResponse.json(result.value, { status: result.status })
}