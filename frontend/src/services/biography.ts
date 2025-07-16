// import { mapServerErrorToUserMessage } from "@/utils/serverErrorMessages";import { usePostRequest } from "@/hooks/usePostRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { BiographyFormData, Biography } from "@/types/formData/types";
import { usePostRequest } from "@/hooks/usePostRequest";

export function usePostBiography() {
  return usePostRequest<BiographyFormData, Biography>({
    url: "/api/biography",
    onSuccess: (data) => {
      console.log("Biografía creada:", data);
    },
    onError: (error) => {
      console.log("Error en la creación de la biografía:", error);
    },
  });
}

export function useGetBiography(biographyId: string) {
  return useQuery({
    queryKey: ['biography', biographyId],
    queryFn: async () => {
      const res = await fetch(`/api/biography/${biographyId}`);
      if (!res.ok) throw new Error('Error al obtener biografía');
      return res.json();
    },
  });
}

type UpdateBiographyArgs = { biographyId: string; data: BiographyFormData };

export function useUpdateBiography() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ biographyId, data }: UpdateBiographyArgs) => {
      const res = await fetch(`/api/biography/${biographyId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Error al actualizar biografía');
      return res.json();
    },
    onSuccess: (_, { biographyId }) => {
      queryClient.invalidateQueries({ queryKey: ['biography', biographyId] });
    },
  });
}


export function useDeleteBiography() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (biographyId: string) => {
      const res = await fetch(`/api/biography/${biographyId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar biografía');
      return res.json();
    },
    onSuccess: (_, biographyId) => {
      queryClient.invalidateQueries({ queryKey: ['biography', biographyId] });
    },
  });
}

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// // Función helper para manejar errores de red
// async function handleResponse<T>(response: Response): Promise<T> {
//   if (!response.ok) {
//     const errorData = await response.json().catch(() => ({ message: "Error desconocido" }));
//     const errorMessage = errorData?.message || "Error en la petición";
//     const userMessage = mapServerErrorToUserMessage(errorMessage);
//     throw new Error(userMessage);
//   }
//   return response.json();
// }

// // Obtener biografía del usuario actual
// export async function getBiography(): Promise<Biography> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/api/biography`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     return handleResponse<Biography>(response);
//   } catch (error) {
//     const userMessage = mapServerErrorToUserMessage(error);
//     throw new Error(userMessage);
//   }
// }

// // Obtener biografía pública por ID
// export async function getBiographyById(id: string): Promise<Biography & { user: unknown }> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/api/biography/${id}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     return handleResponse<Biography & { user: unknown }>(response);
//   } catch (error) {
//     const userMessage = mapServerErrorToUserMessage(error);
//     throw new Error(userMessage);
//   }
// }

// // Crear nueva biografía
// export async function createBiography(data: BiographyFormData): Promise<Biography> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/api/biography`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     return handleResponse<Biography>(response);
//   } catch (error) {
//     const userMessage = mapServerErrorToUserMessage(error);
//     throw new Error(userMessage);
//   }
// }

// // Actualizar biografía existente
// export async function updateBiography(data: BiographyFormData): Promise<Biography> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/api/biography`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     return handleResponse<Biography>(response);
//   } catch (error) {
//     const userMessage = mapServerErrorToUserMessage(error);
//     throw new Error(userMessage);
//   }
// }

// // Eliminar biografía
// export async function deleteBiography(): Promise<{ message: string }> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/api/biography`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     return handleResponse<{ message: string }>(response);
//   } catch (error) {
//     const userMessage = mapServerErrorToUserMessage(error);
//     throw new Error(userMessage);
//   }
// }

// // Función helper para validar datos antes de enviar
// export function validateBiographyData(data: BiographyFormData): string | null {
//   if (!data.content || data.content.trim().length < 10) {
//     return "La biografía debe tener al menos 10 caracteres";
//   }
  
//   if (data.content.length > 2000) {
//     return "La biografía no puede exceder 2000 caracteres";
//   }

//   if (data.title && data.title.length > 100) {
//     return "El título no puede exceder 100 caracteres";
//   }

//   return null;
// } 