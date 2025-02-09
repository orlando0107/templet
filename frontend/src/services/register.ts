import { usePostRequest } from "@/hooks/usePostRequest";
import type { RegisterFormData } from "@/types/formData/types";
import type { RegisterResponse } from "@/types/response/types";

export function useRegisterUser() {
  return usePostRequest<RegisterFormData, RegisterResponse>({
    url: "/api/auth/register",
    onSuccess: (data) => {
      console.log("Usuario registrado:", data);
    },
    onError: (error) => {
      console.log("Error en el registro:", error);
    },
  });
}
