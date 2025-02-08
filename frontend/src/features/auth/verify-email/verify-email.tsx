'use client'

import { useEffect, useState } from "react";

interface Props {
    token: string;
}

export const VerifyEmail = ({ token }: Props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean | null>(null);

    useEffect(() => {
        const verifyToken = async () => {
            if (!token) return;

            try {
                const res = await fetch(`/api/auth/verify-email?token=${token}`);
                const data = await res.json();

                if (res.ok) {
                    setSuccess(true);
                } else {
                    setError(data.message || "Error desconocido");
                }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                setError("Hubo un error al verificar el email.");
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, [token]);

    return (
        <div>
            {loading && <p>Cargando...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p>¡Tu cuenta ha sido verificada correctamente!</p>}
        </div>
    );
};
