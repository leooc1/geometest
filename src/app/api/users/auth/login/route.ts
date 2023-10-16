import modelUsers from "@/app/api/modelUsers";
import utils from "@/app/api/utils";
import { NextRequest, NextResponse } from "next/server";

type reqBory = {
    EMAIL: string,
    SENHA: string
}

export async function POST(req: NextRequest) {
    const { EMAIL, SENHA }: reqBory = await req.json()
    const result: any = await modelUsers.login(EMAIL, SENHA)
    const token = await utils.gerarToken(result.value)
    return NextResponse.json(token, { status: result.status })
}