import { useMutation } from "@tanstack/react-query";

interface PostRequestOptions<TRequest, TResponse> {
  url: string;
  onSuccess?: (data: TResponse) => void;
  onError?: (error: unknown) => void;
}

export function usePostRequest<TRequest, TResponse>({
  url,
  onSuccess,
  onError,
}: PostRequestOptions<TRequest, TResponse>) {
  return useMutation<TResponse, unknown, TRequest>({
    mutationFn: async (data: TRequest) => {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la petición");
      }

      return response.json();
    },
    onSuccess,
    onError,
  });
}
