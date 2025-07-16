"use client";
import React, { useState } from "react";
import { useDeleteBiography } from "@/services/biography";
import { ModalDialog } from "@/components/modals/modalDialog";

interface DeleteBiographyButtonProps {
  biographyId: string;
  onDeleted?: () => void;
}

export const DeleteBiographyButton: React.FC<DeleteBiographyButtonProps> = ({
  biographyId,
  onDeleted,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const { mutate: deleteBiography, isPending: isDeleting } = useDeleteBiography();

  const handleDelete = () => {
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    deleteBiography(biographyId, {
      onSuccess: () => {
        setModalTitle("Biografía eliminada");
        setModalMessage("Tu biografía ha sido eliminada exitosamente.");
        setShowDeleteModal(true);
        setShowConfirmModal(false);
        onDeleted?.();
      },
      onError: (error) => {
        setModalTitle("Error al eliminar");
        setModalMessage((error as Error).message || "Ocurrió un error al eliminar la biografía.");
        setShowDeleteModal(true);
        setShowConfirmModal(false);
      },
    });
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
      >
        {isDeleting ? "Eliminando..." : "Eliminar Biografía"}
      </button>

      {/* Modal de confirmación */}
      <ModalDialog
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirmar eliminación"
        message="¿Estás seguro de que quieres eliminar tu biografía? Esta acción no se puede deshacer."
        showCancelButton
        onConfirm={confirmDelete}
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
      />

      {/* Modal de resultado */}
      <ModalDialog
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title={modalTitle}
        message={modalMessage}
      />
    </div>
  );
}; 