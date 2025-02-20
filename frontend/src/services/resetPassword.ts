import { usePostRequest } from "@/hooks/usePostRequest";
import type { ResetPasswordFormData } from "@/types/formData/types";
import type { GenericoResponse } from "@/types/response/types";

export function useResetPassword() {
  return usePostRequest<ResetPasswordFormData, GenericoResponse<unknown>>({
    url: "/api/auth/reset-password",
    onSuccess: (data) => {
      console.log("Contraseña restablecida:", data);
    },
    onError: (error) => {
      console.log("Error al restablecer la contraseña:", error);
    },
  });
}
