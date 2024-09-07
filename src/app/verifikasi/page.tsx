"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Input, Button, Card, CardBody, CardHeader } from "@nextui-org/react";

const VerifyPage = () => {
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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
                // Ganti URL_API dengan URL API yang sebenarnya
                const response = await fetch('URL_API', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ code: fullCode }),
                });
                // Proses respons di sini
                console.log(await response.json());
            } catch (error) {
                console.error('Terjadi kesalahan:', error);
            }
        } else {
            alert('Masukkan kode 6 digit yang valid');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            <Card className="w-full max-w-md border border-gray-200">
                <CardHeader className="flex flex-col items-center space-y-4 pt-8 pb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Verifikasi Kode</h1>
                    <p className="text-gray-600 text-center">
                        Masukkan kode 6 digit yang telah dikirim ke perangkat Anda
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
                        Tidak menerima kode? <a href="#" className="text-blue-500 hover:underline">Kirim ulang</a>
                    </p>
                </CardBody>
            </Card>
        </div>
    )
}

export default VerifyPage
