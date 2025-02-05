"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/common/client/input";
import { SubmitButton } from "@/components/common/client/SumitButton";
import { Label } from "@/components/common/client/label";
import SignInGoogle from "../common/client/buttonGoogle";
import { SignInEmail } from "../common/client/buttonEmail";
import { Box, Text } from "@radix-ui/themes";
import { useRegisterUser } from "@/services/register";
import { registerSchema } from "@/schema/myZods";
import type {z} from 'zod'


type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm: React.FC = () => {
  const { mutate: registerUser, isPending } = useRegisterUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    registerUser(data);
  };

  return (
    <div className="w-full max-w-md mx-auto justify-center-items">
      {/* 📌 Título */}
      <div className="justify-items-center m-2 text-center font-bold">
        <Text>Registrate</Text>
      </div>

      {/* 📌 Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-4">
        {/* Nombre */}
        <div>
          <Label htmlFor="name">Nombre</Label>
          <Input className="read-only:bg-gray-100 valid:border-blue-500 ..." id="name" type="text" {...register("name")} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input className="read-only:bg-gray-100 valid:border-blue-500 ..." id="email" type="email" {...register("email")} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Contraseña */}
        <div>
          <Label htmlFor="password">Contraseña</Label>
          <Input className="read-only:bg-gray-100 valid:border-blue-500 ..." id="password" type="password" {...register("password")} />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        {/* Confirmar Contraseña */}
        <div>
          <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
          <Input className="read-only:bg-gray-100 valid:border-blue-500 ..." id="confirmPassword" type="password" {...register("confirmPassword")} />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </div>

        {/* 📌 Botón de envío con isPending */}
        <SubmitButton text={isPending ? "Registrando..." : "Registrarse"} disabled={isPending} />
      </form>

      {/* 🌟 Separador */}
      <div className="flex items-center my-6 justify-items-center justify-center">
        <span>----------------------</span>
        <span className="mx-4 text-gray-500 text-sm font-bold">O inicia sesión con</span>
        <span>----------------------</span>
      </div>

      {/* 🔑 Opciones de inicio de sesión */}
      <div className="flex flex-col gap-3 justify-items-center justify-center">
        <SignInGoogle />
        <Box>
          <SignInEmail />
        </Box>
      </div>
    </div>
  );
};
