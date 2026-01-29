"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Typography from "@/ui/designSystem/typography/typography";
import Button from "@/ui/designSystem/button/button";
import { wording } from "@/utils/wording";
import { FiPlus, FiEdit, FiTrash2, FiPackage } from "react-icons/fi";
import { useNotification } from "@/components/notifications/NotificationProvider";
import Link from "next/link";

// Mock data pour la démo
const mockProducts = [
  {
    id: "1",
    nom: "Voiture sans permis Aixam",
    prix: 8990,
    categorie: "Voitures neuves",
    quantiteStock: 5,
  },
  {
    id: "2",
    nom: "Voiture sans permis Ligier",
    prix: 7990,
    categorie: "Voitures neuves",
    quantiteStock: 3,
  },
];

export default function ProductsPage() {
  const { showNotification } = useNotification();
  const [products, setProducts] = useState(mockProducts);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (id: string) => {
    if (!confirm(wording.dashboard.products.deleteConfirm)) {
      return;
    }

    try {
      setIsLoading(true);
      // TODO: Appeler le service de suppression
      setProducts(products.filter((p) => p.id !== id));
      showNotification(wording.dashboard.products.deleteSuccess, "success");
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
              {wording.dashboard.products.title}
            </Typography>
            <Typography variant="body-base" theme="gray">
              Gérez tous vos produits depuis cette page
            </Typography>
          </div>
          <Link href="/dashboard/products/new">
            <Button variant="accent" size="large" className="w-full sm:w-auto">
              <FiPlus className="mr-2" size={20} />
              {wording.dashboard.products.add}
            </Button>
          </Link>
        </div>

        {/* Liste des produits */}
        {products.length === 0 ? (
          <div className="bg-white p-12 border border-gray-200 text-center">
            <FiPackage className="mx-auto text-gray-400 mb-4" size={48} />
            <Typography variant="body-lg" theme="gray" className="mb-2">
              {wording.dashboard.products.noProducts}
            </Typography>
            <Link href="/dashboard/products/new">
              <Button variant="accent" size="medium">
                {wording.dashboard.products.add}
              </Button>
            </Link>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 overflow-hidden">
            {/* Table Header - Desktop */}
            <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200">
              <div className="col-span-4">
                <Typography variant="body-sm" theme="black" weight="bold">
                  {wording.dashboard.products.name}
                </Typography>
              </div>
              <div className="col-span-2">
                <Typography variant="body-sm" theme="black" weight="bold">
                  {wording.dashboard.products.price}
                </Typography>
              </div>
              <div className="col-span-2">
                <Typography variant="body-sm" theme="black" weight="bold">
                  {wording.dashboard.products.category}
                </Typography>
              </div>
              <div className="col-span-2">
                <Typography variant="body-sm" theme="black" weight="bold">
                  {wording.dashboard.products.stock}
                </Typography>
              </div>
              <div className="col-span-2">
                <Typography variant="body-sm" theme="black" weight="bold">
                  {wording.dashboard.products.actions}
                </Typography>
              </div>
            </div>

            {/* Products List */}
            <div className="divide-y divide-gray-200">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="col-span-1 md:col-span-4">
                    <Typography variant="body-base" theme="black" weight="bold" className="mb-1">
                      {product.nom}
                    </Typography>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <Typography variant="body-sm" theme="gray" className="mb-1 md:hidden">
                      {wording.dashboard.products.price}
                    </Typography>
                    <Typography variant="body-base" theme="black">
                      {product.prix.toLocaleString("fr-FR")} €
                    </Typography>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <Typography variant="body-sm" theme="gray" className="mb-1 md:hidden">
                      {wording.dashboard.products.category}
                    </Typography>
                    <Typography variant="body-base" theme="black">
                      {product.categorie}
                    </Typography>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <Typography variant="body-sm" theme="gray" className="mb-1 md:hidden">
                      {wording.dashboard.products.stock}
                    </Typography>
                    <Typography variant="body-base" theme="black">
                      {product.quantiteStock || 0}
                    </Typography>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <Typography variant="body-sm" theme="gray" className="mb-1 md:hidden">
                      {wording.dashboard.products.actions}
                    </Typography>
                    <div className="flex items-center gap-2">
                      <Link href={`/dashboard/products/${product.id}/edit`}>
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-50 transition-colors"
                          title={wording.dashboard.products.edit}
                        >
                          <FiEdit size={18} />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 transition-colors"
                        title={wording.dashboard.products.delete}
                        disabled={isLoading}
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

