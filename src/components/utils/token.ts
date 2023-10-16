const jwt = require('jsonwebtoken')

const utilsToken = {

    armazenarToken: (token: string) => {
        localStorage.setItem('tokenGX', token)
    },
    pegarToken: () => {
        return localStorage.getItem('tokenGX')
    },
    getToken: async () => {
        const token = await utilsToken.pegarToken() || ''
        const id = await fetch(`/api/users/token/${token}`)
            .then(response => response.json())
            .catch(err => console.log(err))
        return id
    }
}

export default utilsToken