import { NextRequest, NextResponse } from 'next/server'
import utils from '../utils'
import { MysqlError } from 'mysql'

export async function GET() {
    /* const conexao: any = await utils.bdConnection()
    const DATA = await utils.atualDate()
    const { NOME, EMAIL, SENHA } = await req.json()
    conexao.query(`
    SELECT * 
    FROM USUARIO
    `,
        (err: MysqlError, result:any) => {
            if (err) {
                console.log({
                    status: 410,
                    value: 'Erro: ' + err.sqlMessage
                })
            }
            else {
                console.log({
                    status: 200,
                    value: result
                })
            }
        }) */
        const trem = await utils.Token(2)
        const negocio = await utils.searchID(trem)
    return NextResponse.json({
        jwt:trem,
        idDoMinino: negocio
    }, { status: 200 })
}