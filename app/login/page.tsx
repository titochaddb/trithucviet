'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Lock, User } from 'lucide-react'
import toast from 'react-hot-toast'

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleLogin = async () => {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })

        if (res.ok) {
            toast.success('Đăng nhập thành công')
            router.push('/admin/teachers')

        } else {
            toast.error('Sai tài khoản hoặc mật khẩu')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-purple-200 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-purple-200">
                <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
                    Đăng nhập Admin
                </h1>

                <div className="space-y-4">
                    <div className="relative">
                        <User className="absolute left-3 top-3.5 text-purple-400" size={18} />
                        <Input
                            className="pl-10"
                            placeholder="Tên đăng nhập"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-3.5 text-purple-400" size={18} />
                        <Input
                            type="password"
                            className="pl-10"
                            placeholder="Mật khẩu"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <Button
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                        onClick={handleLogin}
                    >
                        Đăng nhập
                    </Button>
                </div>
            </div>
        </div>
    )
}
