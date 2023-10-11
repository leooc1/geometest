import { NextRequest, NextResponse } from 'next/server'
import modelElements from '@/app/api/modelElements'
import utils from '@/app/api/utils'

type Result = {
    status: number,
    value: JSON | string
}

type reqBory = {
    TIPO: number,
    NOME_OBJETO: string,
    OBJETO: JSON,
    ID_USUARIO: number
}

export async function POST(req: NextRequest) {
    const DATA = utils.atualDate()
    const { TIPO, NOME_OBJETO, OBJETO, ID_USUARIO }: reqBory = await req.json()
    const result: Result = await modelElements.save(TIPO, NOME_OBJETO, OBJETO, DATA, ID_USUARIO)
    return NextResponse.json(result.value, { status: result.status })
}