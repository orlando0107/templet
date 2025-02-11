"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/common/client/input";
import { SubmitButton } from "@/components/common/client/SumitButton";
import { Label } from "@/components/common/client/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Link } from "@radix-ui/themes";

// Esquema de validación con Zod
const emailSchema = z.object({
	email: z.string().email({ message: "Email inválido" })
});

type EmailFormData = z.infer<typeof emailSchema>;

export const ForgoteenPasswordForm: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<EmailFormData>({
		resolver: zodResolver(emailSchema),
	});

	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const router = useRouter();

	const onSubmit = async (data: EmailFormData) => {
        console.log(data)
		setErrorMessage(null); // Resetear errores previos


		// Redirigir al dashboard si el login es exitoso
		router.push("/dashboard");
	};

	return (
		<div className="w-full max-w-md mx-auto">
			<div className="p-4 m-12 gap-2 justify-center text-center">
				<h1 className="text-2xl font-bold">Recuperar Contraseña</h1>
				<p className='text-sm'> Porfavor Ingresa su contraseña, para recuperar su password</p>
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
					{errors.email && (
						<p className="text-red-500 text-sm">{errors.email.message}</p>
					)}
				</div>

				{errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

				<SubmitButton text={isSubmitting ? "Enviando..." : "Enviar"} />
			</form>

			<div className="p-4 m-4 gap-2 justify-center text-center">
				<Link href="/auth/login">Ingresar</Link>
				<br />
				<Link href="/help">Necesitas Ayuda para Ingresar?</Link>
			</div>
		</div>
	);
};
