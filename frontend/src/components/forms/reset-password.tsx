"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SubmitButton } from "@/components/common/client/SumitButton";
import { Label } from "@/components/common/client/label";
import { useState } from "react";
import { Link } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { ModalDialog } from "../modals/modalDialog";
import { useResetPassword } from "@/services/resetPassword";
import { Input } from "@/components/common/client/input";

interface Props {
    token: string;
}

// Esquema de validación con Zod
const resetPassword = z.object({
    token: z.string().min(1),
    email: z.string().email({ message: "Email inválido" }),
    password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    confirmPassword: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
})
.refine((data)=> data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
});

type PasswordFormData = z.infer<typeof resetPassword>;

export const ResetPasswordForm = ({token}: Props) => {
    const { mutate: resetPasswordMutate, isPending} = useResetPassword();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<PasswordFormData>({
        resolver: zodResolver(resetPassword),
        defaultValues: {
            token: token,
        }
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();
    const [successMessage, setSuccessMessage] = useState<string| null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalTitle, setModalTitle] = useState("");

    const onSubmit = async (data: PasswordFormData) => {
        console.log(data);
        if(!token) {
            setErrorMessage("Token no encontrado");
            return;
        };
        const dataS = {
            token,
            email: data.email,
            password: data.password
        }
        resetPasswordMutate(dataS, {
            onSuccess: (response) => {
                setModalTitle("Contraseña Restablecida con Exito");
                setModalMessage("Tu contraseña ha sido restablecida con éxito.");
                setModalOpen(true);
                router.push("/auth/login");
            },
            onError: (error) => {
                console.log("Error al restablecer la contraseña");
                console.log(error);
                setModalTitle("Error al restablecer la contraseña");
                setModalMessage((error as Error).message
                    || "Ocurrió un problema, intenta nuevamente.");
                setModalOpen(true);
            },
        });
        setErrorMessage(null); // Resetear errores previos
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="p-4 m-12 gap-2 justify-center text-center">
                <h1 className="text-2x1 font-bold">
                    Cambiar password
                </h1>

            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md space-y-4"
            >
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        className="read-only:bg-gray-100 valid:border-blue-500"
                        id="email"
                        type="email"
                        {...register("email")}
                    />
                </div>
                <div>
                    <Label htmlFor="password">Nueva Contraseña</Label>
                    <Input
                        className="read-only:bg-gray-100 valid:border-blue-500"
                        id="password"
                        type="password"
                        {...register("password")}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}
                </div>

                <div>
                    <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                    <Input
                        className="read-only:bg-gray-100 valid:border-blue-500"
                        id="confirmPassword"
                        type="password"
                        {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                    )}
                </div>

                {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

                <SubmitButton text={isSubmitting || isPending? "Restableciendo..." : "Restablecer"}
                                disabled={isSubmitting || isPending || !token}/>
            </form>

            <ModalDialog
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={modalTitle}
                message={modalMessage}
                autoClose={30000} // Se cierra en 5 segundos automáticamente
            />
        </div >
    )
}