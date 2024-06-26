import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from '@/dist';

export const metadata: Metadata = {
    title: "Auth",
    description: "Auth App",
};

const Base = 'https://nestjs-boilerplate-test.herokuapp.com/api/v1/auth';

const RootLayout = ({ children }: Readonly<{children: React.ReactNode}>) => {
    return (
        <html lang="en">
            <body>
                <AuthProvider
                    url={{
                        login: `${Base}/email/login`,
                        logout: `${Base}/logout`,
                        profile: `${Base}/me`,
                        update: `${Base}/update`,
                        refresh: `${Base}/refresh`,
                    }}
                    expire={{
                        token: 0.010417,
                        refreshToken: 7
                    }}
                    path={{
                        '/user': 'User',
                        '/admin': 'Admin'
                    }}
                    route={{
                        login: '/login'
                    }}>
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}

export default RootLayout;