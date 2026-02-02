"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Typography from "@/ui/designSystem/typography/typography";
import Button from "@/ui/designSystem/button/button";
import { wording } from "@/utils/wording";
import { FiPlus, FiEdit, FiTrash2, FiFolder } from "react-icons/fi";
import { useNotification } from "@/components/notifications/NotificationProvider";
import Link from "next/link";
import { CategoryDocument } from "@/services/dashboard/CategoryService";
import Image from "next/image";

export default function CategoriesPage() {
  const { showNotification } = useNotification();
  const [categories, setCategories] = useState<CategoryDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/dashboard/categories");
        const data = await response.json();

        if (data.success) {
          setCategories(data.categories);
        } else {
          throw new Error(data.error || "Erreur lors du chargement");
        }
      } catch (error) {
        console.error("Erreur lors du chargement des catégories:", error);
        showNotification(error instanceof Error ? error.message : "Erreur lors du chargement des catégories", "error");
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, [showNotification]);

  const handleDelete = async (id: string) => {
    if (!id) return;
    
    if (!confirm(wording.dashboard.categories.deleteConfirm)) {
      return;
    }

    try {
      setIsDeleting(true);
      const response = await fetch(`/api/dashboard/categories/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setCategories(categories.filter((c) => c.id !== id));
        showNotification(wording.dashboard.categories.deleteSuccess, "success");
      } else {
        throw new Error(data.error || "Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      showNotification(error instanceof Error ? error.message : "Erreur lors de la suppression", "error");
    } finally {
      setIsDeleting(false);
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
        {isLoading ? (
          <div className="bg-white p-12 border border-gray-200 text-center">
            <Typography variant="body-lg" theme="gray">
              Chargement des catégories...
            </Typography>
          </div>
        ) : categories.length === 0 ? (
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
                <div className="flex items-start gap-4 mb-4">
                  {/* Image */}
                  <div className="relative w-20 h-20 bg-gray-100 rounded overflow-hidden shrink-0">
                    {category.src ? (
                      <Image
                        src={category.src}
                        alt={category.alt || category.nom || "Catégorie"}
                        fill
                        className="object-cover"
                        quality={100}
                        sizes="80px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <FiFolder className="text-gray-400" size={24} />
                      </div>
                    )}
                  </div>
                  {/* Contenu */}
                  <div className="flex-1">
                    <Typography variant="h3" theme="black" weight="bold" className="mb-2">
                      {category.nom}
                    </Typography>
                    <Typography variant="body-sm" theme="gray">
                      {category.description || "Aucune description"}
                    </Typography>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                  {category.id && (
                    <Link href={`/dashboard/categories/${category.id}/edit`} className="flex-1">
                      <button
                        className="w-full p-2 text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                        title={wording.dashboard.categories.edit}
                      >
                        <FiEdit size={18} />
                        <span className="text-sm">{wording.dashboard.categories.edit}</span>
                      </button>
                    </Link>
                  )}
                  <button
                    onClick={() => category.id && handleDelete(category.id)}
                    className="flex-1 p-2 text-red-600 hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                    title={wording.dashboard.categories.delete}
                    disabled={isDeleting || !category.id}
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

