import React from "react";
import type { Biography, BiographyWithUser } from "@/types/formData/types";
import Myavatar from "@/components/common/servidor/avatar";
import { DeleteBiographyButton } from "./DeleteBiographyButton";

interface BiographyCardProps {
  biography: (Biography | BiographyWithUser) & {
    user?: {
      id: string;
      name: string | null;
      email: string;
      image: string | null;
    };
  };
  showDeleteButton?: boolean;
  onDeleted?: () => void;
}

export const BiographyCard: React.FC<BiographyCardProps> = ({ biography, showDeleteButton, onDeleted }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <Myavatar
          src={biography.user?.image || undefined}
          alt={biography.user?.name || "Usuario"}
          nosrc={biography.user?.name?.[0] || "U"}
        />
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {biography.user?.name || "Usuario"}
          </h2>
          <p className="text-gray-600 text-sm">
            {new Date(biography.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {biography.title && (
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {biography.title}
        </h3>
      )}

      <div className="prose prose-gray max-w-none">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {biography.content}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>
            Última actualización: {new Date(biography.updatedAt).toLocaleDateString()}
          </span>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
            Pública
          </span>
        </div>
      </div>
      {showDeleteButton && (
        <div className="mt-4">
          <DeleteBiographyButton biographyId={biography.id} onDeleted={onDeleted} />
        </div>
      )}
    </div>
  );
}; 