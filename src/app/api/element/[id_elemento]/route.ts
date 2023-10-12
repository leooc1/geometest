import { NextRequest, NextResponse } from "next/server"
import modelElements from "@/app/api/modelElements"

type Result = {
    status: number,
    value: JSON | string
}
export async function DELETE(req: NextRequest, { params }: { params: { id_elemento: string } }) {
  const id_elemento = params.id_elemento
  const result:Result = await modelElements.delete(Number(id_elemento))
  return NextResponse.json(result.value, { status: result.status })
}