"use client";
import { useState } from "react";
import { z } from "zod";
import { Input } from "@/components/common/client/input";
import { SubmitButton } from "@/components/common/client/SumitButton";
import { Label } from "@/components/common/client/label";
import { ModalDialog } from "../modals/modalDialog";

const schema = z.object({
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirm: z.string(),
}).refine((data) => data.password === data.confirm, {
  message: "Las contraseñas no coinciden",
  path: ["confirm"],
});

type FormData = z.infer<typeof schema>;

export function LinkPasswordForm() {
  const [form, setForm] = useState<FormData>({ password: "", confirm: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      for (const err of result.error.errors) {
        if (err.path[0]) fieldErrors[err.path[0] as keyof FormData] = err.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setIsLoading(true);
    try {
      // Aquí deberías llamar a tu endpoint para guardar la contraseña
      // Por ejemplo: await fetch('/api/user/link-password', { method: 'POST', ... })
      // Simulación de éxito:
      await new Promise((res) => setTimeout(res, 1000));
      setModalTitle("Contraseña vinculada con éxito");
      setModalMessage("Ahora puedes iniciar sesión con tu email y contraseña.");
      setModalOpen(true);
      setForm({ password: "", confirm: "" });
    } catch {
      setModalTitle("Error al vincular contraseña");
      setModalMessage("Ocurrió un error. Intenta nuevamente o contacta a soporte.");
      setModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-8">
      <h2 className="text-xl font-bold mb-4">Vincular contraseña a tu cuenta</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="password">Nueva contraseña</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        <div>
          <Label htmlFor="confirm">Confirmar contraseña</Label>
          <Input
            id="confirm"
            name="confirm"
            type="password"
            value={form.confirm}
            onChange={handleChange}
            autoComplete="new-password"
          />
          {errors.confirm && <p className="text-red-500 text-sm">{errors.confirm}</p>}
        </div>
        <SubmitButton text={isLoading ? "Guardando..." : "Vincular contraseña"} disabled={isLoading} />
      </form>
      <ModalDialog
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        message={modalMessage}
        autoClose={30000}
      />
    </div>
  );
} 