'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Input, Card, CardBody } from "@nextui-org/react"
import errorToastify from '@/utils/errorToastify'
import successToastify from '@/utils/successToastify'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
)

const schema = z.object({
    nama: z.string().min(1, "Nama harus diisi"),
    emailAddress: z.string().email("Email tidak valid"),
    password: z.string().min(8, "Kata sandi harus minimal 8 karakter")
        .regex(/[a-z]/, "Kata sandi harus mengandung setidaknya satu huruf kecil")
        .regex(/[0-9]/, "Kata sandi harus mengandung setidaknya satu angka")
        .regex(/[^a-zA-Z0-9]/, "Kata sandi harus mengandung setidaknya satu karakter khusus"),
    confirmPassword: z.string().min(8, "Konfirmasi kata sandi harus minimal 8 karakter"),
    whatsapp: z.string()
        .min(1, "Whatsapp harus diisi")
        .regex(/^\d+$/, "Whatsapp harus berupa nomor"),
}).refine(data => data.password === data.confirmPassword, {
    message: "Kata sandi dan konfirmasi kata sandi tidak cocok",
    path: ["confirmPassword"]
})

export default function Page() {
    const router = useRouter()
    const { data: session, status } = useSession()
    const [otp, setOtp] = useState('')
    const [isVerifying, setIsVerifying] = useState(false)
    const [userId, setUserId] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')

    const { register, handleSubmit, setError, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    })

    useEffect(() => {
        if (status === 'authenticated') {
            if (!session?.user.is_verified) {
                router.push('/verifikasi')
            } else {
                router.push('/')
            }
        }
    }, [status, router, session])

    const handleGoogleSignUp = async () => {
        try {
            await signIn('google', { callbackUrl: '/' })
        } catch (err: any) {
            errorToastify('Terjadi kesalahan saat mendaftar dengan Google')
            console.error('Error pendaftaran dengan Google:', err)
        }
    }

    const onSubmit = async (formData: any) => {
        try {
            const { emailAddress, ...rest } = formData;
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...rest, email: emailAddress }),
            })

            const data = await response.json()

            if (response.ok) {
                successToastify('Pendaftaran berhasil, silakan verifikasi email Anda')
                setIsVerifying(true)
                setUserId(data.data.id)
                setEmailAddress(formData.emailAddress)
                setPassword(formData.password)
            } else {
                const errorData = await response.json()
                errorToastify(`${errorData.message}, ${errorData.error.details}`)
            }
        } catch (err: any) {
            errorToastify('Terjadi kesalahan saat mendaftar')
            console.error('Error detail:', err)
        }
    }

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: emailAddress, token: otp, user_id: userId }),
            })

            if (response.ok) {
                successToastify('Verifikasi berhasil')
                const result = await signIn('credentials', {
                    email: emailAddress,
                    password: password,
                    redirect: false,
                })

                if (result?.error) {
                    errorToastify('Gagal login otomatis')
                } else {
                    router.push('/')
                }
            } else {
                const errorData = await response.json()
                errorToastify(errorData.message || 'Terjadi kesalahan saat verifikasi')
            }
        } catch (err: any) {
            errorToastify('Terjadi kesalahan saat verifikasi')
            console.error('Error detail:', err)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/background-login.jpg')" }}>
            <Card className="w-full max-w-md shadow-2xl border-none bg-white/80 backdrop-blur-sm">
                <CardBody className="px-10 py-12">
                    <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">Selamat Datang</h1>
                    <p className="text-center text-gray-600 mb-8">Silakan daftar untuk melanjutkan</p>
                    {!isVerifying ? (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <Input
                                label="Nama"
                                type="text"
                                {...register('nama')}
                                variant="bordered"
                                fullWidth
                                size="lg"
                            />
                            {errors.nama && <p className="text-red-500">{String(errors.nama.message)}</p>}
                            <Input
                                label="Whatsapp"
                                type="text"
                                {...register('whatsapp')}
                                variant="bordered"
                                fullWidth
                                size="lg"
                            />
                            {errors.whatsapp && <p className="text-red-500">{String(errors.whatsapp.message)}</p>}
                            <Input
                                label="Alamat Email"
                                type="email"
                                {...register('emailAddress')}
                                variant="bordered"
                                fullWidth
                                size="lg"
                            />
                            {errors.emailAddress && <p className="text-red-500">{String(errors.emailAddress.message as string)}</p>}
                            <Input
                                label="Kata Sandi"
                                type="password"
                                {...register('password')}
                                variant="bordered"
                                fullWidth
                                size="lg"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && <p className="text-red-500">{String(errors.password.message as string)}</p>}
                            <Input
                                label="Konfirmasi Kata Sandi"
                                type="password"
                                {...register('confirmPassword')}
                                variant="bordered"
                                fullWidth
                                size="lg"
                            />
                            {errors.confirmPassword && <p className="text-red-500">{String(errors.confirmPassword.message)}</p>}
                            <Button type="submit" color="primary" fullWidth size="lg" className="font-semibold mt-4">
                                Daftar
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp} className="space-y-6">
                            <Input
                                label="Kode OTP"
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                variant="bordered"
                                fullWidth
                                size="lg"
                            />
                            <Button type="submit" color="primary" fullWidth size="lg" className="font-semibold mt-4">
                                Verifikasi
                            </Button>
                        </form>
                    )}
                    <div className="flex items-center my-8">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="px-4 text-gray-500 text-sm">atau</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                    <Button
                        onClick={handleGoogleSignUp}
                        variant="bordered"
                        fullWidth
                        size="lg"
                        startContent={<GoogleIcon />}
                        className="font-semibold"
                    >
                        Daftar dengan Google
                    </Button>
                    <p className="text-center mt-6 text-sm text-gray-600">
                        Sudah punya akun?{' '}
                        <Link href="/login" className="text-blue-600 hover:underline">
                            Login di sini
                        </Link>
                    </p>
                </CardBody>
            </Card>
        </div>
    )
}