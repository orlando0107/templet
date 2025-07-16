"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { biographySchema } from "@/schema/myZods";
import { BiographyFormData } from "@/types/formData/types";
import { useGetBiography, useCreateBiography, useUpdateBiography } from "@/hooks/useBiography";
import { Label } from "@/components/common/client/label";
import { Input } from "@/components/common/client/input";
import { SubmitButton } from "@/components/common/client/SumitButton";
import { ModalDialog } from "@/components/modals/modalDialog";

interface BiographyFormProps {
  onSuccess?: () => void;
}

export const BiographyForm: React.FC<BiographyFormProps> = ({ onSuccess }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  // Hooks para operaciones CRUD
  const { data: existingBiography, isLoading: isLoadingBiography } = useGetBiography();
  const { mutate: createBiography, isPending: isCreating } = useCreateBiography();
  const { mutate: updateBiography, isPending: isUpdating } = useUpdateBiography();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<BiographyFormData>({
    resolver: zodResolver(biographySchema),
    defaultValues: {
      content: "",
      title: "",
      isPublic: false,
    },
  });

  // Cargar datos existentes cuando se obtienen
  useEffect(() => {
    if (existingBiography) {
      setValue("content", existingBiography.content);
      setValue("title", existingBiography.title || "");
      setValue("isPublic", existingBiography.isPublic);
    }
  }, [existingBiography, setValue]);

  const onSubmit = (data: BiographyFormData) => {
    if (existingBiography) {
      // Actualizar biografía existente
      updateBiography(data, {
        onSuccess: () => {
          setModalTitle("Biografía actualizada");
          setModalMessage("Tu biografía ha sido actualizada exitosamente.");
          setModalOpen(true);
          onSuccess?.();
        },
        onError: (error) => {
          setModalTitle("Error al actualizar");
          setModalMessage((error as Error).message || "Ocurrió un error al actualizar la biografía.");
          setModalOpen(true);
        },
      });
    } else {
      // Crear nueva biografía
      createBiography(data, {
        onSuccess: () => {
          setModalTitle("Biografía creada");
          setModalMessage("Tu biografía ha sido creada exitosamente.");
          setModalOpen(true);
          onSuccess?.();
        },
        onError: (error) => {
          setModalTitle("Error al crear");
          setModalMessage((error as Error).message || "Ocurrió un error al crear la biografía.");
          setModalOpen(true);
        },
      });
    }
  };

  if (isLoadingBiography) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {existingBiography ? "Editar Biografía" : "Crear Biografía"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="title">Título (opcional)</Label>
            <Input
              id="title"
              type="text"
              placeholder="Un título para tu biografía..."
              {...register("title")}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="content">Biografía</Label>
            <textarea
              id="content"
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Cuéntanos sobre ti..."
              {...register("content")}
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
            )}
          </div>

          <div className="flex items-center">
            <input
              id="isPublic"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              {...register("isPublic")}
            />
            <Label htmlFor="isPublic" className="ml-2 text-sm text-gray-700">
              Hacer pública mi biografía
            </Label>
          </div>

          <div className="flex gap-4">
            <SubmitButton
              text={
                isCreating || isUpdating
                  ? existingBiography
                    ? "Actualizando..."
                    : "Creando..."
                  : existingBiography
                  ? "Actualizar Biografía"
                  : "Crear Biografía"
              }
              className="flex-1"
            />
            {existingBiography && (
              <button
                type="button"
                onClick={() => reset()}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Restaurar
              </button>
            )}
          </div>
        </form>

        {existingBiography && (
          <div className="mt-6 p-4 bg-blue-50 rounded-md">
            <h3 className="text-sm font-medium text-blue-800 mb-2">
              Información de tu biografía
            </h3>
            <div className="text-sm text-blue-700 space-y-1">
              <p>
                <span className="font-medium">Estado:</span>{" "}
                {existingBiography.isPublic ? "Pública" : "Privada"}
              </p>
              <p>
                <span className="font-medium">Creada:</span>{" "}
                {new Date(existingBiography.createdAt).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Última actualización:</span>{" "}
                {new Date(existingBiography.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </div>

      <ModalDialog
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        message={modalMessage}
      />
    </div>
  );
}; 