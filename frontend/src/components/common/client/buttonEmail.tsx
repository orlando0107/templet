"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@radix-ui/themes";
import { MdOutlineEmail } from "react-icons/md";
import { Input } from "./input";

export function SignInEmail() {
  const [email, setEmail] = useState("");

  const handleSignIn = async () => {
    const result = await signIn("nodemailer", { email, redirect: false });

    // Since signIn returns undefined or an object with 'error' and 'ok' properties,
    // we can safely check for 'error' property.
    if (result && typeof result === "object" && "error" in result && result.error) {
      console.error("Error al iniciar sesión:", result.error);
    } else {
      console.log("Correo enviado, revisa tu bandeja de entrada.");
    }
  };

  return (
    <div className=" flex flex-col space-y-4 justify-items-center">
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Ingresa tu correo electrónico"
        className="w-full text-center border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:outline-none"
      />
      <Button variant="ghost" onClick={handleSignIn} type="button" className="flex items-center gap-2">
        <MdOutlineEmail />
        <span>Iniciar con Correo</span>
      </Button>
    </div>
  );
}
