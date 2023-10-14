import bcrypt from 'bcrypt'
import mysql2 from 'mysql2'
const jwt = require('jsonwebtoken')

const utils = {
    //conexão com o banco de dados

    bdConnection: async () => {
        const MYSQLUSER = process.env.MYSQLUSER
        const MYSQLPORT = process.env.MYSQLPORT
        const MYSQLPASSWORD = process.env.MYSQLPASSWORD
        const MYSQLHOST = process.env.MYSQLHOST
        const MYSQLDATABASE = process.env.MYSQLDATABASE
        const conexao: mysql2.Connection = await mysql2.createConnection
            (`mysql://${MYSQLUSER}:${MYSQLPASSWORD}@${MYSQLHOST}:${MYSQLPORT}/${MYSQLDATABASE}`)

        return new Promise((resolve, reject) => {
            conexao.connect((err) => {
                if (err) {
                    console.log(err);

                    reject(err)
                } else {
                    console.log('Banco conectado!')
                    resolve(conexao)
                }
            })
        })
    },
    //data atual
    atualDate: async () => {
        const data = await new Date()
        let ano = data.getFullYear()
        let mes = data.getMonth() + 1
        let dia = data.getDate()
        return (`${ano}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`)
    },
    //hash da senha
    hash: async (senha: string) => {
        let hashPassword: string = await bcrypt.hash(senha, 10)
        return hashPassword
    },
    //comparar senha com hash
    compareHash: async (senha: string, hashPassword: string) => {
        return await bcrypt.compare(senha, hashPassword)
            .then(response => response)
            .catch(err => err)
    },
    Token: async (id:number) => {
        var token = await jwt.sign({ id: id }, process.env.SECRET)
        return token;

    },
    searchID: async (token: any) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.SECRET, function (err: any, decoded: any) {
                if (err)
                    reject(err)
                else
                    resolve(decoded.id) // bar
            })
        })

    }
}

export default utils