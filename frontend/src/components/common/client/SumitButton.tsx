'use client';
import { Button } from "@radix-ui/themes";
import clsx from "clsx"; // Para manejar clases dinámicas

type ButtonProps = {
  text: string;
  type?: "button" | "submit";
  disabled?: boolean;
  isLoading?: boolean; // Nuevo prop para indicar estado de carga
  className?: string; // Permitir personalización de estilos
};

export const SubmitButton: React.FC<ButtonProps> = ({
  text,
  type = "submit",
  disabled = false,
  isLoading = false,
  className,
}) => {
  return (
    <Button
      type={type}
      disabled={disabled || isLoading} // Deshabilita el botón si está cargando
      className={clsx(
        "px-4 py-2 rounded-md transition-all",
        isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600",
        className
      )}
    >
      {isLoading ? "Guardando..." : text} {/* Muestra estado de carga */}
    </Button>
  );
};
