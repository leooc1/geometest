import mysql from 'mysql'
import bcrypt from 'bcrypt'

const utils = {
    //conexão com o banco de dados
    bdConnection: async () => {
        const conexao: mysql.Connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "geometrix"
        })
        return conexao
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
    }
}

export default utils