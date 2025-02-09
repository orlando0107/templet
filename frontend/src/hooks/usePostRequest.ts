import { useMutation } from "@tanstack/react-query";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface PostRequestOptions<TRequest, TResponse> {
  url: string;
  onSuccess?: (data: TResponse) => void;
  onError?: (error: unknown) => void;
}

export function usePostRequest<TRequest, TResponse>(
  options: PostRequestOptions<TRequest, TResponse>
) {
  const { url, onSuccess, onError } = options;

  return useMutation<TResponse, unknown, TRequest>({
    mutationFn: async (data: TRequest) => {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorData = await response.json();
          return Promise.reject(errorData?.message || "Error en la petición");
        }

        return response.json();
      } catch (error) {
        return Promise.reject(
          error instanceof Error ? error.message : "Error desconocido"
        );
      }
    },
    onSuccess,
    onError,
  });
}
