import { useMutation } from "@tanstack/react-query";

export function usePutRequest<TRequest, TResponse>(
  options: {
    url: string;
    onSuccess?: (data: TResponse) => void;
    onError?: (error: unknown) => void;
  }
) {
  const { url, onSuccess, onError } = options;

  return useMutation<TResponse, unknown, TRequest>({
    mutationFn: async (data: TRequest) => {
      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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