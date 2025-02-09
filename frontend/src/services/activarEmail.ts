import { useGetRequest } from "@/hooks/useGetRequest";
import type { ActivaEmailFormData } from "@/types/formData/types";
import type { GenericoResponse } from "@/types/response/types";

export function useActivarEmail(token: string) {
  return useGetRequest<GenericoResponse<{ data: ActivaEmailFormData }>>({
    queryKey: ["verify-email", token],
    url: `/api/auth/verify-email?token=${token}`,
    enabled: !!token,
  });
}
