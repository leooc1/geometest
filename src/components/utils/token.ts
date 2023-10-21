import { setCookie, parseCookies } from "nookies"

const utilsToken = {

    armazenarToken: (token: string) => {
        setCookie(null, 'tokenGX', token, {
            maxAge: 60 * 60 * 24 * 7,
        })
    },
    pegarToken: () => {
        const cookies = parseCookies()
        const token = cookies.tokenGX || ''
        return token
    },
    getId: async () => {
        const token = await utilsToken.pegarToken() || ''
        let id
        if (token !== '') {
            id = await fetch(`/api/users/token/${token}`)
                .then(response => response.json())
                .catch(err => console.log(err))
        }
        else {
            id = 0
        }
        return id
    }
}

export default utilsToken