"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/common/client/input";
import { SubmitButton } from "@/components/common/client/SumitButton";
import { Label } from "@/components/common/client/label";
import SignInGoogle from "../common/client/buttonGoogle";
import { SignInEmail } from "../common/client/buttonEmail";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Esquema de validación con Zod
const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    setErrorMessage(null); // Resetear errores previos

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false, // No redirigir automáticamente
    });

    if (result?.error) {
      setErrorMessage("Credenciales incorrectas o cuenta no verificada.");
      return;
    }

    // Redirigir al dashboard si el login es exitoso
    router.push("/dashboard");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input className="read-only:bg-gray-100 valid:border-blue-500" id="email" type="email" {...register("email")} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <Label htmlFor="password">Contraseña</Label>
          <Input className="read-only:bg-gray-100 valid:border-blue-500" id="password" type="password" {...register("password")} />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        <SubmitButton text={isSubmitting ? "Ingresando..." : "Ingresar"} />
      </form>

      <div className="flex items-center my-6 justify-center">
        <span>-----------</span>
        <span className="mx-4 text-gray-500 text-sm">O inicia sesión con</span>
        <span>-----------</span>
      </div>

      <div className="flex flex-col gap-3">
        <SignInGoogle />
        <SignInEmail />
      </div>
    </div>
  );
};
