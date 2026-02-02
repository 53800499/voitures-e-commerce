"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Typography from "@/ui/designSystem/typography/typography";
import Button from "@/ui/designSystem/button/button";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNotification } from "@/components/notifications/NotificationProvider";
import Link from "next/link";
import { CategoryDocument } from "@/services/dashboard/CategoryService";
import Image from "next/image";
import { SimpleInput } from "@/ui/designSystem/forms/SimpleInput";

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const categoryId = params?.id as string;
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    src: "",
    alt: "",
    description: "",
  });

  useEffect(() => {
    const loadCategory = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/dashboard/categories/${categoryId}`);
        const data = await response.json();

        if (data.success && data.category) {
          const category = data.category as CategoryDocument;
          setFormData({
            nom: category.nom || "",
            src: category.src || "",
            alt: category.alt || "",
            description: category.description || "",
          });
        } else {
          throw new Error(data.error || "Catégorie non trouvée");
        }
      } catch (error) {
        console.error("Erreur:", error);
        showNotification(error instanceof Error ? error.message : "Erreur lors du chargement", "error");
        router.push("/dashboard/categories");
      } finally {
        setIsLoading(false);
      }
    };

    if (categoryId) {
      loadCategory();
    }
  }, [categoryId, router, showNotification]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nom || !formData.src) {
      showNotification("Veuillez remplir tous les champs obligatoires", "error");
      return;
    }

    try {
      setIsSaving(true);
      const response = await fetch(`/api/dashboard/categories/${categoryId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          alt: formData.alt || formData.nom,
        }),
      });

      const data = await response.json();

      if (data.success) {
        showNotification("Catégorie mise à jour avec succès", "success");
        router.push("/dashboard/categories");
      } else {
        throw new Error(data.error || "Erreur lors de la mise à jour");
      }
    } catch (error) {
      console.error("Erreur:", error);
      showNotification(error instanceof Error ? error.message : "Erreur lors de la mise à jour", "error");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <Typography variant="body-lg" theme="gray">
            Chargement de la catégorie...
          </Typography>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard/categories">
            <Button variant="secondary" size="medium">
              <FiArrowLeft className="mr-2" />
              Retour
            </Button>
          </Link>
          <Typography variant="h1" theme="black" weight="bold">
            Modifier la catégorie
          </Typography>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SimpleInput
              id="nom"
              name="nom"
              type="text"
              label="Nom de la catégorie"
              value={formData.nom}
              onChange={handleInputChange}
              required
            />
            <div>
              <SimpleInput
                id="src"
                name="src"
                type="url"
                label="Image (URL)"
                value={formData.src}
                onChange={handleInputChange}
                required
              />
              {formData.src && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">Aperçu :</p>
                  <div className="relative w-full h-48 bg-gray-100 rounded overflow-hidden border border-gray-300">
                    <Image
                      src={formData.src}
                      alt={formData.alt || formData.nom || "Aperçu"}
                      fill
                      className="object-contain"
                      quality={100}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            <SimpleInput
              id="alt"
              name="alt"
              type="text"
              label="Texte alternatif image"
              value={formData.alt}
              onChange={handleInputChange}
            />
          </div>
          <SimpleInput
            id="description"
            name="description"
            type="textarea"
            label="Description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
          />

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <Link href="/dashboard/categories">
              <Button type="button" variant="secondary" size="large">
                Annuler
              </Button>
            </Link>
            <Button type="submit" variant="accent" size="large" isLoading={isSaving}>
              <FiSave className="mr-2" />
              Enregistrer les modifications
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

