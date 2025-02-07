"use client";

import LayoutPublic from "@/components/layout/layout";
import { useState } from "react";

export default function ResendVerification() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleResend = async () => {
        setLoading(true);
        setMessage("");

        const response = await fetch("/api/auth/resend-verification", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        setMessage(data.message);
        setLoading(false);
    };

    return (
        <LayoutPublic>
            <div className="flex flex-col items-center justify-center h-screen px-4">
                <h1 className="text-2xl font-semibold mb-4">Reenviar Verificación</h1>
                <p className="text-gray-600 mb-4">
                    Ingresa tu correo para recibir un nuevo enlace de activación.
                </p>
                <input
                    type="email"
                    placeholder="Tu correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border rounded-lg px-4 py-2 mb-2 w-80"
                />
                {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                <button
                    onClick={handleResend}
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    {loading ? "Enviando..." : "Reenviar Email"}
                </button>
                {message && <p className="mt-2 text-center">{message}</p>}
            </div>
        </LayoutPublic>
        
    );
}
