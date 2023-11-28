import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId: '84640656525-43r5lnm9uhhjn46sht79rkvm2na3nddq.apps.googleusercontent.com',
            clientSecret: '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'
        })
    ]
})

export {handler as GET, handler as POST }