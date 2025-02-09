"use client";
import { Flex, Text } from "@radix-ui/themes";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useActivarEmail } from "@/services/activarEmail";

interface Props {
  token: string;
}
export const VerifyEmail = ({ token }: Props) => {
  const router = useRouter();
  const { data, status } = useActivarEmail(token);

  useEffect(() => {
    if (status === "success" && data) {
      console.log("Usuario verificado:", data);
      router.push("/auth/login"); // Redirige al login
    }
  }, [status, data, router]);

  return (
    <Flex justify="center" align="center" m="2" p="2">
      {status === "pending" && <Text>Cargando...</Text>}
      {status === "error" && <Text color="red">El enlace ha expirado o es inválido.</Text>}
      {status === "success" && <Text>Cuenta verificada. Redirigiendo...</Text>}
    </Flex>
  );
};
