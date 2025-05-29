import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
    const { username, password } = await req.json()

    if (
        username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD
    ) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET!, { expiresIn: '1h' })

        const response = NextResponse.json({ success: true })

        response.cookies.set({
            name: 'token',
            value: token,
            httpOnly: true,
            path: '/',
            maxAge: 3600, // 1 giờ
            sameSite: 'strict',
        })
        console.log('Login successful, token set in cookies')

        return response
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
}
