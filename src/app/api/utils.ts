import bcrypt from 'bcrypt'
import mysql from 'mysql'
import mysql2 from 'mysql2'
const jwt = require('jsonwebtoken')

const utils = {
    //conexão com o banco de dados

    bdConnection: async () => {
        /* const MYSQLUSER = process.env.MYSQLUSER
        const MYSQLPORT = process.env.MYSQLPORT
        const MYSQLPASSWORD = process.env.MYSQLPASSWORD
        const MYSQLHOST = process.env.MYSQLHOST
        const MYSQLDATABASE = process.env.MYSQLDATABASE */
        // (`mysql://${MYSQLUSER}:${MYSQLPASSWORD}@${MYSQLHOST}:${MYSQLPORT}/${MYSQLDATABASE}`)
        const conexao: mysql.Connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "geometrix",
        })

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