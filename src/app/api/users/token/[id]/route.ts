import utils from "@/app/api/utils"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const token = params.id
    const id = await utils.searchID(token)
    return NextResponse.json(id)
}