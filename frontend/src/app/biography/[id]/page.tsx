"use client";
import React from "react";
import { useGetBiographyById } from "@/hooks/useBiography";
import { BiographyCard } from "@/components/biography/BiographyCard";

interface BiographyPageProps {
  params: { id: string };
}

export default function BiographyPage({ params }: BiographyPageProps) {
  const { data: biography, isLoading, error } = useGetBiographyById(params.id);

  if (isLoading) {
    return <div className="text-center py-8">Cargando...</div>;
  }

  if (error || !biography) {
    return <div className="text-center py-8 text-red-500">No se encontró la biografía</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Biografía de {biography.user?.name || "Usuario"}
          </h1>
        </div>
        <BiographyCard biography={biography} />
      </div>
    </div>
  );
}