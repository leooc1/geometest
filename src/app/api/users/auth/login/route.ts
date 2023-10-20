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
    let token
    if (result.status === 200)
        token = await utils.gerarToken(result.value)
        // token = result.value
    else
        token = result.value

    return NextResponse.json(token, { status: result.status })
}