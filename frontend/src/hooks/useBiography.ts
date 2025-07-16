import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Biography, BiographyFormData } from "@/types/formData/types";
import type { BiographyWithUser } from "@/types/formData/types";
import { useGetRequest } from "./useGetRequest";
import { usePostRequest } from "./usePostRequest";
import { usePutRequest } from "./usePutRequest";
import { useDeleteRequest } from "./useDeleteRequest";

// ===============================
// Hooks para la biografía del usuario autenticado
// ===============================

/**
 * Obtener la biografía del usuario autenticado
 * GET /api/biography
 */
export function useGetBiography() {
  return useGetRequest<Biography>({
    queryKey: ["biography"],
    url: "/api/biography",
  });
}

/**
 * Crear la biografía del usuario autenticado
 * POST /api/biography
 */
export function useCreateBiography() {
  const queryClient = useQueryClient();
  return usePostRequest<BiographyFormData, Biography>({
    url: "/api/biography",
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["biography"] });
    },
  });
}

/**
 * Actualizar la biografía del usuario autenticado
 * PUT /api/biography
 */
export function useUpdateBiography() {
  const queryClient = useQueryClient();
  return usePutRequest<BiographyFormData, Biography>({
    url: "/api/biography",
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["biography"] });
    },
  });
}

/**
 * Eliminar la biografía del usuario autenticado
 * DELETE /api/biography
 */
export function useDeleteBiography() {
  const queryClient = useQueryClient();
  return useDeleteRequest<{ message: string }>({
    url: "/api/biography",
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["biography"] });
    },
  });
}

// ===============================
// Hooks para biografías públicas o por id
// ===============================

/**
 * Obtener una biografía pública por id
 * GET /api/biography/[id]
 */
export function useGetBiographyById(id: string) {
  return useGetRequest<BiographyWithUser>({
    queryKey: ["biography", id],
    url: `/api/biography/${id}`,
  });
}

/**
 * Actualizar una biografía por id (requiere ser dueño)
 * PUT /api/biography/[id]
 */
export function useUpdateBiographyById(id: string) {
  const queryClient = useQueryClient();
  return useMutation<Biography, Error, BiographyFormData>({
    mutationFn: async (data) => {
      const res = await fetch(`/api/biography/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Error al actualizar biografía");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["biography", id] });
    },
  });
}

/**
 * Eliminar una biografía por id (requiere ser dueño)
 * DELETE /api/biography/[id]
 */
export function useDeleteBiographyById(id: string) {
  const queryClient = useQueryClient();
  return useMutation<{ message: string }, Error, void>({
    mutationFn: async () => {
      const res = await fetch(`/api/biography/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar biografía");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["biography", id] });
    },
  });
} 