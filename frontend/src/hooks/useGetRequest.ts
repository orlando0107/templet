import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";


interface GetRequestOptions<TResponse>
  extends Omit<
    UseQueryOptions<TResponse, unknown, TResponse, readonly unknown[]>,
    "queryKey" | "queryFn"
  > {
  queryKey: string | string[];
  url: string;
}

export function useGetRequest<TResponse>({
  queryKey,
  url,
  ...options
}: GetRequestOptions<TResponse>) {
  return useQuery<TResponse, unknown, TResponse, readonly unknown[]>({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn: async () => {
      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        return (errorData?.message || "Error en la petición");
      }
      return response.json();
    },
    ...options,
  });
}