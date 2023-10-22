import modelUsers from "@/app/api/modelUsers";
import utils from "@/app/api/utils";
import { NextRequest, NextResponse } from "next/server";

type Result = {
    status: number,
    value: JSON | string
}

type reqBory = {
    NOME: string,
    EMAIL: string,
    SENHA: string
}

export async function POST(req: NextRequest) {
    const { NOME, EMAIL, SENHA }: reqBory = await req.json()
    const DATA = await utils.atualDate()
    const hashPassword = await utils.hash(SENHA)
    let result: any = await modelUsers.verifyEmailExist(EMAIL)
    let token;
    if (result.status === 200) {
        result = await modelUsers.register(NOME, EMAIL, hashPassword, DATA)
        if (result.status === 200)
            token = await utils.gerarToken(result.value)
        else
            token = result.value
    }
    else
        token = result.value

    return NextResponse.json(token, { status: result.status })
}