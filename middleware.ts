import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
        const { payload } = await jwtVerify(token, secret)

        if (payload.username !== process.env.ADMIN_USERNAME) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        return NextResponse.next()
    } catch (err) {
        console.log('JWT verification error:', err)
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: ['/admin/:path*'],
}
