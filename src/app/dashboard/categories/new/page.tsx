"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Typography from "@/ui/designSystem/typography/typography";
import Button from "@/ui/designSystem/button/button";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNotification } from "@/components/notifications/NotificationProvider";
import Link from "next/link";
import Image from "next/image";
import { SimpleInput } from "@/ui/designSystem/forms/SimpleInput";

export default function NewCategoryPage() {
  const router = useRouter();
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    src: "",
    alt: "",
    description: "",
  });

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
      setIsLoading(true);
      const response = await fetch("/api/dashboard/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          alt: formData.alt || formData.nom,
        }),
      });

      const data = await response.json();

      if (data.success) {
        showNotification("Catégorie créée avec succès", "success");
        router.push("/dashboard/categories");
      } else {
        throw new Error(data.error || "Erreur lors de la création");
      }
    } catch (error) {
      console.error("Erreur:", error);
      showNotification(error instanceof Error ? error.message : "Erreur lors de la création", "error");
    } finally {
      setIsLoading(false);
    }
  };

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
            Nouvelle catégorie
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
              placeholder="Sera automatiquement rempli avec le nom si vide"
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
            <Button type="submit" variant="accent" size="large" isLoading={isLoading}>
              <FiSave className="mr-2" />
              Créer la catégorie
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

