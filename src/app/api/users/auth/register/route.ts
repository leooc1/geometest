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
    const result: Result = await modelUsers.register(NOME, EMAIL, hashPassword, DATA)
    return NextResponse.json(result.value, { status: result.status })
}