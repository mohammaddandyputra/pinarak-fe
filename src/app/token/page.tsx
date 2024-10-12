"use client"

import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

const TokenComponent = () => {
    const { getToken } = useAuth()
    const [token, setToken] = useState<string | null>(null)
    const [data, setData] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchToken = async () => {
            const token = await getToken()
            setToken(token)
        }
        fetchToken()
    }, [getToken])

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    const response = await fetch('http://localhost:8080/api/penerima', {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`)
                    }
                    const result = await response.json()
                    setData(result)
                } catch (err:any) {
                    setError(err.message)
                }
            }
        }
        fetchData()
    }, [token])

    return (
        <div>
            {token ? (
                error ? (
                    <div>Error: {error}</div>
                ) : data ? (
                    <div>Data: {JSON.stringify(data)}</div>
                ) : (
                    'Loading data...'
                )
            ) : (
                'Loading token...'
            )}
        </div>
    )
}

export default TokenComponent