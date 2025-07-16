"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Button } from "@radix-ui/themes";
import { useEffect } from "react";

type ModalDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
    buttonText?: string;
    autoClose?: number; // Tiempo en ms para cierre automático (opcional)
    hideCloseButton?: boolean; // Opción para ocultar el botón de cierre
    className?: string; // Clases de Tailwind para personalización
    children?: React.ReactNode; // Contenido personalizado en lugar de "message"
    // Nuevas props para confirmación
    showCancelButton?: boolean;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
    confirmButtonClassName?: string;
    cancelButtonClassName?: string;
};

export const ModalDialog: React.FC<ModalDialogProps> = ({
    isOpen,
    onClose,
    title = "Información",
    message,
    buttonText = "Cerrar",
    autoClose,
    hideCloseButton = false,
    className = "",
    children,
    showCancelButton = false,
    onConfirm,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    confirmButtonClassName = "bg-blue-500 hover:bg-blue-600",
    cancelButtonClassName = "bg-gray-300 hover:bg-gray-400",
}) => {
    // Si autoClose está definido, cierra el modal después del tiempo especificado
    useEffect(() => {
        if (isOpen && autoClose) {
            const timer = setTimeout(onClose, autoClose);
            return () => clearTimeout(timer);
        }
    }, [isOpen, autoClose, onClose]);

    const handleConfirm = () => {
        onConfirm?.();
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/30">
                <DialogPanel className={`max-w-md w-full bg-white p-6 rounded-lg shadow-lg ${className}`}>
                    {title && <DialogTitle className="text-lg font-bold">{title}</DialogTitle>}
                    <div className="mt-2 text-gray-600">{children || message}</div>
                    {!hideCloseButton && (
                        <div className="mt-4 flex justify-end gap-2">
                            {showCancelButton && (
                                <Button
                                    onClick={onClose}
                                    className={`text-gray-700 px-4 py-2 rounded-md transition ${cancelButtonClassName}`}
                                >
                                    {cancelText}
                                </Button>
                            )}
                            <Button
                                onClick={showCancelButton ? handleConfirm : onClose}
                                className={`text-white px-4 py-2 rounded-md transition ${showCancelButton ? confirmButtonClassName : "bg-blue-500 hover:bg-blue-600"}`}
                            >
                                {showCancelButton ? confirmText : buttonText}
                            </Button>
                        </div>
                    )}
                </DialogPanel>
            </div>
        </Dialog>
    );
};
