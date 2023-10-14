import modelUsers from "@/app/api/modelUsers";
import utils from "@/app/api/utils";
import { NextRequest, NextResponse } from "next/server";
import { setCookie } from "nookies";

type Result = {
    status: number,
    value: any
}

type reqBory = {
    EMAIL: string,
    SENHA: string
}

export async function POST(req: NextRequest) {
    const { EMAIL, SENHA }: reqBory = await req.json()
    const result: Result = await modelUsers.login(EMAIL, SENHA)
    const token = await utils.Token(result.value[0].ID)
    // setCookie(null, 'tokenGX', token, {
    //     maxAge: 7 * 24 * 60 * 60,
    //     path: '/'
    // })
    return NextResponse.json(result, { status: result.status })
}