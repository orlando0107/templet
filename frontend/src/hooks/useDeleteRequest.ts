import { useMutation } from "@tanstack/react-query";

export function useDeleteRequest<TResponse>(
  options: {
    url: string;
    onSuccess?: (data: TResponse) => void;
    onError?: (error: unknown) => void;
  }
) {
  const { url, onSuccess, onError } = options;

  return useMutation<TResponse, unknown, void>({
    mutationFn: async () => {
      const response = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        const errorData = await response.json();
        return Promise.reject(errorData?.message || "Error en la petición");
      }
      return response.json();
    },
    onSuccess,
    onError,
  });
}