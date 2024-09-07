'use client'

import * as React from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardBody, Input, Button } from "@nextui-org/react"
import successToastify from '@/utils/successToastify'
import errorToastify from '@/utils/errorToastify'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
  </svg>
)

export default function Page() {
  const { data: session, status } = useSession()
  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [userId, setUserId] = useState(null)
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [canResend, setCanResend] = useState(true);
  const [resendTimeout, setResendTimeout] = useState(60);

  useEffect(() => {
    if (status === "loading") {
      return
    }

    if (status === 'authenticated') {
      router.push('/')
    }
  }, [status, router, session])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // const result = await signIn('credentials', {
      //   redirect: false,
      //   email: emailAddress,
      //   password,
      // })

      const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailAddress, password }),
      })

      const data = await result.json()

      console.log(data)

      if (data?.error) {
        errorToastify("Login gagal. Silakan periksa kembali email dan kata sandi Anda")
      } else {
        successToastify("Login berhasil")
        setUserId(data?.data?.id)
        setIsLogin(true)
      }
    } catch (error) {
      console.error('Error:', error)
      errorToastify("Terjadi kesalahan. Gagal melakukan login. Silakan coba lagi nanti.")
    } finally {
      setIsLoading(false)
    }
  }

  // const handleVerifyToken = async (e: React.FormEvent) => {
  // e.preventDefault()
  // setIsLoading(true)

  // try {
  //   const result = await signIn('credentials', {
  //     redirect: false,
  //     user_id: userId,
  //     token: token
  //   })

  //   if (result?.error) {
  //     errorToastify("Verifikasi gagal. Silakan periksa kembali kode OTP Anda")
  //   } else {
  //     successToastify("Verifikasi berhasil")
  //     router.push('/')
  //   }
  // } catch (error) {
  //   console.error('Error:', error)
  //   errorToastify("Terjadi kesalahan. Gagal melakukan login. Silakan coba lagi nanti.")
  // } finally {
  //   setIsLoading(false)
  // }
  // }

  const handleGoogleSSO = () => {
    signIn('google', { callbackUrl: '/' })
  }

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  const handleChange = (index: number, value: string) => {
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    } else if (index === 5 && value) {
      handleVerification();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const newCode = [...verificationCode];
      newCode[index - 1] = '';
      setVerificationCode(newCode);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newCode = [...verificationCode];
    for (let i = 0; i < pastedData.length; i++) {
      newCode[i] = pastedData[i];
    }
    setVerificationCode(newCode);
  };

  const handleVerification = async () => {
    const fullCode = verificationCode.join('');
    if (fullCode.length === 6) {
      try {
        const result = await signIn('credentials', {
          redirect: false,
          user_id: userId,
          token: fullCode
        })

        if (result?.error) {
          errorToastify("Verifikasi gagal. Silakan periksa kembali kode OTP Anda")
        } else {
          successToastify("Verifikasi berhasil")
          router.push('/')
        }
      } catch (error) {
        console.error('Error:', error)
        errorToastify("Terjadi kesalahan. Gagal melakukan login. Silakan coba lagi nanti.")
      } finally {
        setIsLoading(false)
      }
    } else {
      errorToastify("Masukkan kode 6 digit yang valid")
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout; // Gunakan `number` jika di browser
    if (!canResend) {
      interval = setInterval(() => {
        setResendTimeout((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setCanResend(true);
            return 60; // Reset waktu kirim ulang menjadi 60 detik
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [canResend]);

  const handleResendCode = async () => {
    if (!canResend) return;

    try {
      setIsLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/resend-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),
      });

      const data = await response.json()

      if (response.ok) {
        console.log(data)
        setIsLoading(false)
        setCanResend(false);
        successToastify("Kode telah dikirim ke email Anda")
      } else {
        setIsLoading(false)
        if (data?.error) {
          if (data?.error.details === "rate limit exceeded, please try again later") {
            errorToastify("Terlalu banyak mencoba. Silakan coba beberapa menit lagi.")
          } else {
            errorToastify("Terjadi kesalahan. Gagal melakukan resend kode. Silakan coba lagi nanti.")
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false)
      errorToastify("Terjadi kesalahan. Gagal melakukan resend kode. Silakan coba lagi nanti.")
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 bg-cover bg-center" style={{ backgroundImage: "url('/images/background-login.jpg')" }}>
      {isLogin ? (
        <Card className="w-full max-w-md border border-gray-200">
          <CardHeader className="flex flex-col items-center space-y-4 pt-8 pb-6">
            <h1 className="text-3xl font-bold text-gray-800">Verifikasi Kode</h1>
            <p className="text-gray-600 text-center">
              Masukkan kode 6 digit yang telah dikirim ke email Anda. Kode berlaku selama 5 menit.
            </p>
          </CardHeader>
          <CardBody className="px-8 py-10">
            <div className="flex justify-between mb-8" onPaste={handlePaste}>
              {verificationCode.map((digit, index) => (
                <div key={index} className="relative w-14 h-14">
                  <input
                    ref={(el) => {
                      if (el) inputRefs.current[index] = el;
                    }}
                    type="text"
                    maxLength={1}
                    className="w-full h-full text-center text-2xl font-bold bg-white border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200 absolute inset-0 flex items-center justify-center"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    aria-label={`Digit ${index + 1}`}
                  />
                </div>
              ))}
            </div>
            <Button
              color="primary"
              className="w-full py-6 text-lg font-semibold rounded-xl transition-all duration-200 hover:bg-blue-600"
              onClick={handleVerification}
            >
              Verifikasi
            </Button>
            <p className="mt-6 text-center text-gray-600">
              Tidak menerima kode?{' '}
              <button
                onClick={handleResendCode}
                disabled={!canResend}
                className={`text-blue-500 hover:underline ${!canResend ? 'cursor-not-allowed' : ''}`}
              >
                {canResend ? 'Kirim ulang' : `Kirim ulang dalam ${resendTimeout} detik`}
              </button>
            </p>
          </CardBody>
        </Card>
      ) : (
        <Card className="w-full max-w-md shadow-2xl border-none bg-white/80 backdrop-blur-sm">
          <CardBody className="px-10 py-12">
            <>
              <p className="text-center text-gray-600 mb-8">Silakan login untuk melanjutkan</p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Alamat Email"
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  variant="bordered"
                  fullWidth
                  size="lg"
                />
                <Input
                  label="Kata Sandi"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="bordered"
                  fullWidth
                  size="lg"
                />
                <Button type="submit" color="primary" fullWidth size="lg" className="font-semibold mt-4" disabled={isLoading}>
                  {isLoading ? 'Sedang Memproses...' : 'Login'}
                </Button>
              </form>
              <div className="flex items-center my-8">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="px-4 text-gray-500 text-sm">atau</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              <Button
                onClick={handleGoogleSSO}
                variant="bordered"
                fullWidth
                size="lg"
                startContent={<GoogleIcon />}
                className="font-semibold"
              >
                Login dengan Google
              </Button>
              <p className="text-center mt-6 text-sm text-gray-600">
                Belum punya akun?{' '}
                <Link href="/register" className="text-blue-600 hover:underline">
                  Daftar di sini
                </Link>
              </p>
            </>
          </CardBody>
        </Card>
      )}
    </div>
  )
}