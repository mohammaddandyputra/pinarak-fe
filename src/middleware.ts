import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'
import { useSession } from 'next-auth/react'

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl
    const token = await getToken({ req, secret: process.env.JWT_SECRET })

    if (token || pathname.includes('/api/auth')) {
        return NextResponse.next()
    }

    if (pathname !== '/login' && pathname !== '/register') {
        const url = req.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }
}

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}