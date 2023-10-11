import { NextRequest, NextResponse } from 'next/server'
import modelElements from '@/app/api/modelElements'

type Result = {
    status: number,
    value: JSON | string
}

type reqBory = {
    Data_Inicio: string,
    Data_Fim: string,
    ID: number
}

export async function POST(req: NextRequest) {
    const { Data_Inicio, Data_Fim, ID }: reqBory = await req.json()
    const result: Result = await modelElements.dateFilter( Data_Inicio, Data_Fim, ID )
    return NextResponse.json(result.value, { status: result.status })
}