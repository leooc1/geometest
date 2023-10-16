
import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
    const token = req.cookies.get('tokenGX')?.value
    const signInURL = new URL('/login-cadastro', req.url)
    const homeURL = new URL('/', req.url)
    if (!token) {
        if (req.nextUrl.pathname === '/login-cadastro') {
            return NextResponse.next()
        }
        return NextResponse.redirect(signInURL)
    }
    if (req.nextUrl.pathname === '/login-cadastro') {
        return NextResponse.redirect(homeURL)
    }
}

export const config = {
    matcher: ['/', '/matriz', '/login-cadastro', '/fisica', '/algebra', '/listinha']
}

