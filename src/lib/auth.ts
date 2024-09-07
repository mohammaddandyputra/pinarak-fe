import { NextAuthOptions, DefaultSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

declare module 'next-auth' {
    interface User {
        token?: string;
        id?: number;
        nama?: string;
        email?: string;
        role_id?: number;
        unit_id?: number;
        is_superadmin?: boolean;
        is_verified?: boolean;
    }

    interface Session {
        user: {
            id?: number,
            nama?: string,
            email?: string,
            role_id?: number,
            unit_id?: number,
            is_superadmin?: boolean,
            is_verified?: boolean
        } & DefaultSession['user']
        accessToken?: string,
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                user_id: { label: "User ID", type: "text" },
                token: { label: "Token", type: "text" }
            },
            async authorize(credentials) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-token`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        user_id: parseInt(credentials?.user_id ?? '0'),
                        token: credentials?.token ?? ''
                    })
                })
                const data = await res.json()

                console.log(credentials)

                console.log(data)

                if (res.ok && data.data.token) {
                    return { 
                        id: data.data.user.id, 
                        token: data.data.token,
                        nama: data.data.user.nama,
                        email: data.data.user.email,
                        role_id: data.data.user.role_id,
                        unit_id: data.data.user.unit_id,
                        is_superadmin: data.data.user.is_superadmin,
                        is_verified: data.data.user.is_verified
                    }
                } else {
                    return null
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60, // 24 jam dalam detik
    },
    jwt: {
        secret: process.env.JWT_SECRET_KEY,
    },
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (account?.provider === 'google' && account.access_token) {
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sso-callback`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ nama: user.name, access_token: account.access_token })
                    });
                    const data = await res.json();
                    if (res.ok && data.data.token) {
                        token = {
                            accessToken: data.data.token,
                            id: data.data.user.id,
                            nama: data.data.user.nama,
                            email: data.data.user.email,
                            role_id: data.data.user.role_id,
                            unit_id: data.data.user.unit_id,
                            is_superadmin: data.data.user.is_superadmin,
                            is_verified: data.data.user.is_verified
                        };
                    } else {
                        throw new Error('SSO callback failed');
                    }
                } catch (error) {
                    console.error('Error during SSO callback:', error);
                    return {};
                }
            } else if (user) {
                console.log(user)
                token.accessToken = user.token;
                token.id = user.id;
                token.nama = user.nama;
                token.email = user.email;
                token.role_id = user.role_id;
                token.unit_id = user.unit_id;
                token.is_superadmin = user.is_superadmin;
                token.is_verified = user.is_verified;
            }

            if (token.id) {
                await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/log`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId: token.id,
                        action: 'login',
                        timestamp: new Date().toISOString()
                    })
                });
            }

            return token;
        },
        async session({ session, token }) {
            console.log(session)
            session.user = {
                ...session.user,
                id: token.id as number | undefined,
                nama: token.nama as string | undefined,
                email: token.email as string | undefined,
                role_id: token.role_id as number | undefined,
                unit_id: token.unit_id as number | undefined,
                is_superadmin: token.is_superadmin as boolean | undefined,
                is_verified: token.is_verified as boolean | undefined
            };
            session.accessToken = token.accessToken as string | undefined;
            return session;
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`
            if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
    },
    secret: process.env.NEXTAUTH_SECRET
}