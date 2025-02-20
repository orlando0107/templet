import { usePostRequest } from "@/hooks/usePostRequest";
import type { Email } from "@/types/formData/types";
import type { GenericoResponse } from "@/types/response/types";

export function useForgoteenPassword(){
    return usePostRequest<Email, GenericoResponse<unknown>>({
        url:"/api/auth/forgot-password",
        onSuccess:(data) => {
            console.log("Correo enviado", data);
        },
        onError:(error) => {
            console.log("Email no registrado", error);
        },
    });
}