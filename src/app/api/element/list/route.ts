import { NextRequest, NextResponse } from 'next/server'
import modelElements from '@/app/api/modelElements'

type Result = {
  status: number,
  value: JSON | string
}

export async function POST(req: NextRequest) {
  const { ID }: { ID: number } = await req.json()
  const result: Result = await modelElements.list(ID)
  return NextResponse.json(result.value, { status: result.status })
}