"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Typography from "@/ui/designSystem/typography/typography";
import Button from "@/ui/designSystem/button/button";
import { wording } from "@/utils/wording";
import { FiPlus, FiEdit, FiTrash2, FiFolder } from "react-icons/fi";
import { useNotification } from "@/components/notifications/NotificationProvider";
import Link from "next/link";

// Mock data pour la démo
const mockCategories = [
  {
    id: "1",
    nom: "Voitures neuves",
    description: "Voitures sans permis neuves",
  },
  {
    id: "2",
    nom: "Voitures d'occasion",
    description: "Voitures sans permis d'occasion",
  },
];

export default function CategoriesPage() {
  const { showNotification } = useNotification();
  const [categories, setCategories] = useState(mockCategories);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (id: string) => {
    if (!confirm(wording.dashboard.categories.deleteConfirm)) {
      return;
    }

    try {
      setIsLoading(true);
      // TODO: Appeler le service de suppression
      setCategories(categories.filter((c) => c.id !== id));
      showNotification(wording.dashboard.categories.deleteSuccess, "success");
    } catch {
      showNotification("Erreur lors de la suppression", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Typography variant="h1" theme="black" weight="bold" className="mb-2">
              {wording.dashboard.categories.title}
            </Typography>
            <Typography variant="body-base" theme="gray">
              Gérez toutes vos catégories depuis cette page
            </Typography>
          </div>
          <Link href="/dashboard/categories/new">
            <Button variant="accent" size="large" className="w-full sm:w-auto">
              <FiPlus className="mr-2" size={20} />
              {wording.dashboard.categories.add}
            </Button>
          </Link>
        </div>

        {/* Liste des catégories */}
        {categories.length === 0 ? (
          <div className="bg-white p-12 border border-gray-200 text-center">
            <FiFolder className="mx-auto text-gray-400 mb-4" size={48} />
            <Typography variant="body-lg" theme="gray" className="mb-2">
              {wording.dashboard.categories.noCategories}
            </Typography>
            <Link href="/dashboard/categories/new">
              <Button variant="accent" size="medium">
                {wording.dashboard.categories.add}
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <Typography variant="h3" theme="black" weight="bold" className="mb-2">
                      {category.nom}
                    </Typography>
                    <Typography variant="body-sm" theme="gray">
                      {category.description}
                    </Typography>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                  <Link href={`/dashboard/categories/${category.id}/edit`} className="flex-1">
                    <button
                      className="w-full p-2 text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                      title={wording.dashboard.categories.edit}
                    >
                      <FiEdit size={18} />
                      <span className="text-sm">{wording.dashboard.categories.edit}</span>
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="flex-1 p-2 text-red-600 hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                    title={wording.dashboard.categories.delete}
                    disabled={isLoading}
                  >
                    <FiTrash2 size={18} />
                    <span className="text-sm">{wording.dashboard.categories.delete}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

