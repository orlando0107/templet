// src/app/auth/login/page.tsx
'use client';

import { signIn } from 'next-auth/react';

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>
            <button
                onClick={() => signIn('google')}
                className="bg-red-500 text-white px-4 py-2 rounded mb-2"
            >
                Iniciar sesión con Google
            </button>
            <button
                onClick={() => signIn('credentials', { email: 'user@example.com', password: 'password123' })}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Iniciar sesión con Credentials
            </button>
        </div>
    );
}