import utils from "./utils"

type queryPromise = {
    status: number,
    value: JSON | string
}

const modelUsers = {

    verifyEmailExist: async (email: string) => {
        const conexao: any = await utils.bdConnection()
        return new Promise<queryPromise>(async (resolve, reject) => {
            await conexao.promise().query(`
        SELECT U.EMAIL
        FROM USUARIO U
        WHERE U.EMAIL = ?`, [email])
                .then(([rows]: any) => {
                    if (rows.length === 0) {
                        resolve({
                            status: 200,
                            value: 'Pronto para cadastrar'
                        })
                    }
                    else
                        resolve({
                            status: 410,
                            value: 'Tem esse emei já, cabaço'
                        })
                })
                .catch((err: any) => {
                    reject({
                        status: 400,
                        value: err
                    })
                })
                .then(() => conexao.end())
        })
    },
    //cadastro
    register: async (nome: string, email: string, senha: string, date: string) => {
        const conexao: any = await utils.bdConnection()
        return new Promise<queryPromise>(async (resolve, reject) => {
            conexao.promise().query(`
                        INSERT INTO 
                        USUARIO 
                        VALUES('0', ?, ?, ?, ?)`, [nome, email, senha, date])
                .then(([rows]: any) => {
                    resolve({
                        status: 200,
                        value: rows.insertId
                    })
                })
                .catch((err: any) => {
                    reject({
                        status: 400,
                        value: err
                    })
                })
                .then(() => conexao.end())
        /* 
                (err: any, result: []) => {
                    if (err) {
                        reject({
                            status: 410,
                            value: 'Erro: ' + err.sqlMessage
                        })
                    }
                    else {
                        
                                (err: any, result: any) => {
                                    if (err) {
                                        reject({
                                            status: 410,
                                            value: 'Erro: ' + err.sqlMessage
                                        })
                                    }
                                    else {
                                        resolve({
                                            status: 200,
                                            value: result.insertId
                                        })
                                    }
                                })
                        }
                })

         */})
    },

    //login
    login: async (email: string, senha: string) => {
        const conexao: any = await utils.bdConnection()
        return new Promise<queryPromise>(async (resolve, reject) => {
            await conexao.promise().query(`
        SELECT U.ID, U.SENHA
        FROM USUARIO U
        WHERE U.EMAIL = ? `, [email])
                /*  async (err: any, result: any) => {
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
                                     value: result[0].ID
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
  */
                .then(async ([rows]: any) => {
                    if (rows.length) {
                        if (await utils.compareHash(senha, rows[0].SENHA)) {
                            resolve({
                                status: 200,
                                value: rows[0].ID
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
                })
                .catch((err: any) => {
                    reject({
                        status: 400,
                        value: err
                    })
                })
                .then(() => conexao.end())
        })
    }
}
export default modelUsers