"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Typography from "@/ui/designSystem/typography/typography";
import Button from "@/ui/designSystem/button/button";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNotification } from "@/components/notifications/NotificationProvider";
import Link from "next/link";
import { useCategories } from "@/hooks/useCategories";
import Image from "next/image";
import { SimpleInput } from "@/ui/designSystem/forms/SimpleInput";

export default function NewProductPage() {
  const router = useRouter();
  const { showNotification } = useNotification();
  const { categories } = useCategories();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prix: "",
    categorie: "",
    description: "",
    description1: "",
    quantiteStock: "",
    prixPromo: "",
    src: "",
    alt: "",
    images: [] as Array<{ id: number; src: string; alt: string }>,
    colors: [] as Array<{ id: number; name: string; code: string }>,
    sizes: [] as string[],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (
    field: "images" | "colors" | "sizes",
    index: number,
    value: { id: number; src: string; alt: string } | { id: number; name: string; code: string } | string
  ) => {
    setFormData(prev => {
      const newArray = [...prev[field]] as typeof prev[typeof field];
      newArray[index] = value as typeof newArray[number];
      return { ...prev, [field]: newArray };
    });
  };

  const addArrayItem = (field: "images" | "colors" | "sizes") => {
    setFormData(prev => {
      if (field === "images") {
        return { ...prev, images: [...prev.images, { id: prev.images.length + 1, src: "", alt: "" }] };
      } else if (field === "colors") {
        return { ...prev, colors: [...prev.colors, { id: prev.colors.length + 1, name: "", code: "#000000" }] };
      } else {
        return { ...prev, sizes: [...prev.sizes, ""] };
      }
    });
  };

  const removeArrayItem = (field: "images" | "colors" | "sizes", index: number) => {
    setFormData(prev => {
      const newArray = prev[field].filter((_, i) => i !== index);
      return { ...prev, [field]: newArray };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nom || !formData.prix || !formData.categorie) {
      showNotification("Veuillez remplir tous les champs obligatoires", "error");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/dashboard/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          prix: parseFloat(formData.prix),
          quantiteStock: parseInt(formData.quantiteStock) || 0,
          prixPromo: formData.prixPromo ? parseFloat(formData.prixPromo) : null,
          dateAjout: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        showNotification("Produit créé avec succès", "success");
        router.push("/dashboard/products");
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
          <Link href="/dashboard/products">
            <Button variant="secondary" size="medium">
              <FiArrowLeft className="mr-2" />
              Retour
            </Button>
          </Link>
          <Typography variant="h1" theme="black" weight="bold">
            Nouveau produit
          </Typography>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 p-6 space-y-6">
          {/* Informations de base */}
          <div>
            <Typography variant="h3" theme="black" weight="bold" className="mb-4">
              Informations de base
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SimpleInput
                id="nom"
                name="nom"
                type="text"
                label="Nom du produit"
                value={formData.nom}
                onChange={handleInputChange}
                required
              />
              <SimpleInput
                id="prix"
                name="prix"
                type="number"
                label="Prix (€)"
                value={formData.prix}
                onChange={handleInputChange}
                required
                step="0.01"
                min={0}
              />
              <div>
                <label htmlFor="categorie" className="block text-sm font-medium text-gray-900 mb-2">
                  Catégorie *
                </label>
                <select
                  id="categorie"
                  name="categorie"
                  value={formData.categorie}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map((cat) => (
                    <option key={cat.nom} value={cat.nom}>
                      {cat.nom}
                    </option>
                  ))}
                </select>
              </div>
              <SimpleInput
                id="quantiteStock"
                name="quantiteStock"
                type="number"
                label="Quantité en stock"
                value={formData.quantiteStock}
                onChange={handleInputChange}
                min={0}
              />
              <SimpleInput
                id="prixPromo"
                name="prixPromo"
                type="number"
                label="Prix promotionnel (€)"
                value={formData.prixPromo}
                onChange={handleInputChange}
                step="0.01"
                min={0}
              />
              <div>
                <SimpleInput
                  id="src"
                  name="src"
                  type="url"
                  label="Image principale (URL)"
                  value={formData.src}
                  onChange={handleInputChange}
                />
                {formData.src && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">Aperçu :</p>
                    <div className="relative w-full h-48 bg-gray-100 rounded overflow-hidden border border-gray-300">
                      <Image
                        src={formData.src}
                        alt={formData.alt || "Aperçu"}
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
          </div>

          {/* Descriptions */}
          <div>
            <Typography variant="h3" theme="black" weight="bold" className="mb-4">
              Descriptions
            </Typography>
            <div className="space-y-4">
              <SimpleInput
                id="description"
                name="description"
                type="textarea"
                label="Description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
              />
              <SimpleInput
                id="description1"
                name="description1"
                type="textarea"
                label="Description complémentaire"
                value={formData.description1}
                onChange={handleInputChange}
                rows={4}
              />
            </div>
          </div>

          {/* Images supplémentaires */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <Typography variant="h3" theme="black" weight="bold">
                Images supplémentaires
              </Typography>
              <button
                type="button"
                onClick={() => addArrayItem("images")}
                className="px-4 py-2 text-sm border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Ajouter une image
              </button>
            </div>
            <div className="space-y-4">
              {formData.images.map((image, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex gap-4 items-end">
                    <div className="flex-1">
                      <SimpleInput
                        type="url"
                        label={`URL Image ${index + 1}`}
                        value={image.src}
                        onChange={(e) => handleArrayChange("images", index, { ...image, src: e.target.value })}
                        aria-label={`URL Image ${index + 1}`}
                      />
                    </div>
                    <div className="flex-1">
                      <SimpleInput
                        type="text"
                        label="Texte alternatif"
                        value={image.alt}
                        onChange={(e) => handleArrayChange("images", index, { ...image, alt: e.target.value })}
                        aria-label={`Texte alternatif image ${index + 1}`}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeArrayItem("images", index)}
                      className="px-4 py-2 text-sm border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      Supprimer
                    </button>
                  </div>
                  {image.src && (
                    <div className="relative w-full h-32 bg-gray-100 rounded overflow-hidden border border-gray-300">
                      <Image
                        src={image.src}
                        alt={image.alt || `Aperçu image ${index + 1}`}
                        fill
                        className="object-contain"
                        quality={100}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Couleurs */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <Typography variant="h3" theme="black" weight="bold">
                Couleurs disponibles
              </Typography>
              <button
                type="button"
                onClick={() => addArrayItem("colors")}
                className="px-4 py-2 text-sm border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Ajouter une couleur
              </button>
            </div>
            <div className="space-y-4">
              {formData.colors.map((color, index) => (
                <div key={index} className="flex gap-4 items-end">
                  <div className="flex-1">
                    <SimpleInput
                      type="text"
                      label="Nom de la couleur"
                      value={color.name}
                      onChange={(e) => handleArrayChange("colors", index, { ...color, name: e.target.value })}
                      aria-label={`Nom de la couleur ${index + 1}`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Code couleur
                    </label>
                    <input
                      type="color"
                      value={color.code}
                      onChange={(e) => handleArrayChange("colors", index, { ...color, code: e.target.value })}
                      aria-label={`Code couleur ${index + 1}`}
                      className="w-full h-12 border border-gray-300 rounded"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeArrayItem("colors", index)}
                    className="px-4 py-2 text-sm border border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Tailles */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <Typography variant="h3" theme="black" weight="bold">
                Tailles disponibles
              </Typography>
              <button
                type="button"
                onClick={() => addArrayItem("sizes")}
                className="px-4 py-2 text-sm border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Ajouter une taille
              </button>
            </div>
            <div className="space-y-4">
              {formData.sizes.map((size, index) => (
                <div key={index} className="flex gap-4 items-end">
                  <div className="flex-1">
                    <SimpleInput
                      type="text"
                      label={`Taille ${index + 1}`}
                      value={size}
                      onChange={(e) => handleArrayChange("sizes", index, e.target.value)}
                      placeholder="Ex: S, M, L, XL"
                      aria-label={`Taille ${index + 1}`}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeArrayItem("sizes", index)}
                    className="px-4 py-2 text-sm border border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <Link href="/dashboard/products">
              <Button type="button" variant="secondary" size="large">
                Annuler
              </Button>
            </Link>
            <Button type="submit" variant="accent" size="large" isLoading={isLoading}>
              <FiSave className="mr-2" />
              Créer le produit
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

