import utils from "./utils"

type queryPromise = {
    status: number,
    value: JSON | string
}

const modelUsers = {

    //cadastro
    register: async (nome: string, email: string, senha: string, date: string) => {
        const conexao = await utils.bdConnection()
        return new Promise<queryPromise>((resolve, reject) => {
            conexao.query(`
        SELECT U.EMAIL
        FROM USUARIO U
        WHERE U.EMAIL = ?`, [email],
                (err, result) => {
                    if (err) {
                        reject({
                            status: 410,
                            value: 'Erro: ' + err.sqlMessage
                        })
                    }
                    else {
                        if (result.length === 0) {
                            conexao.query(`
                        INSERT INTO 
                        USUARIO 
                        VALUES('0', ?, ?, ?, ?)`, [nome, email, senha, date],
                                (err) => {
                                    if (err) {
                                        reject({
                                            status: 410,
                                            value: 'Erro: ' + err.sqlMessage
                                        })
                                    }
                                    else {
                                        resolve({
                                            status: 200,
                                            value: 'Foi'
                                        })
                                    }
                                })
                        }
                        else
                            resolve({
                                status: 200,
                                value: 'Tem esse emei já, cabaço'
                            })
                    }
                })
        })
    },

    //login
    login: async (email: string, senha: string) => {
        const conexao = await utils.bdConnection()
        return new Promise<queryPromise>((resolve, reject) => {
            conexao.query(`
        SELECT u.nome, U.EMAIL, U.SENHA
    FROM USUARIO U
    WHERE U.EMAIL = ? `, [email],
                async (err, result) => {
                    if (err) {
                        reject({
                            status: 400,
                            value: 'Erro:' + err.sqlMessage
                        })
                    }
                    else {
                        if (result.length) {
                            if (await utils.compareHash(senha, result[0].SENHA)) {
                                resolve({
                                    status: 200,
                                    value: 'Logado'
                                })
                            }
                            else {
                                resolve({
                                    status: 404,
                                    value: 'Tem nada disso aqui não, sai vazado'
                                })
                            }
                        }
                        else {
                            resolve({
                                status: 404,
                                value: 'Tem nada disso aqui não, sai vazado'
                            })
                        }
                    }
                }
            )
        })
    }
}
export default modelUsers