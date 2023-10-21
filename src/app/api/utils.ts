import bcrypt from 'bcrypt'
import mysql from 'mysql'
import mysql2, { Connection } from 'mysql2'
const jwt = require('jsonwebtoken')

const utils = {
    //conexão com o banco de dados

    bdConnection: async () => {
        const MYSQLUSER = process.env.MYSQLUSER
        const MYSQLPORT = process.env.MYSQLPORT
        const MYSQLPASSWORD = process.env.MYSQLPASSWORD
        const MYSQLHOST = process.env.MYSQLHOST
        const MYSQLDATABASE = process.env.MYSQLDATABASE
        // (`mysql://${MYSQLUSER}:${MYSQLPASSWORD}@${MYSQLHOST}:${MYSQLPORT}/${MYSQLDATABASE}`)
        /* const conexao: Connection = await mysql2.createConnection(`mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`)

        return new Promise((resolve, reject) => {
            conexao.connect((err) => {
                if (err) {
                    console.log(err);
                    reject
                } else {
                    console.log('Banco conectado!')
                    resolve(conexao)
                }
            })
        }) */
        // const pool = await mysql2.createPool(`mysql://${MYSQLUSER}:${MYSQLPASSWORD}@${MYSQLHOST}:${MYSQLPORT}/${MYSQLDATABASE}`)
        const pool = await mysql2.createPool({
            uri: `mysql://${MYSQLUSER}:${MYSQLPASSWORD}@${MYSQLHOST}:${MYSQLPORT}/${MYSQLDATABASE}`,
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10,
            idleTimeout: 60000,
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0
        })
        return pool
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
    gerarToken: async (id: number) => {
        const token = await jwt.sign({ id: id }, process.env.SECRET, { expiresIn: 60 * 60 * 24 * 7 })
        return token;

    },
    searchID: async (token: string) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.SECRET, function (err: any, decoded: any) {
                if (err)
                    reject(err)
                else
                    resolve(decoded.id) // 
            })
        })

    },
}

export default utils