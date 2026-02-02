"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Typography from "@/ui/designSystem/typography/typography";
import Button from "@/ui/designSystem/button/button";
import { wording } from "@/utils/wording";
import { FiPlus, FiEdit, FiTrash2, FiPackage } from "react-icons/fi";
import { useNotification } from "@/components/notifications/NotificationProvider";
import Link from "next/link";
import { ProductDocument } from "@/services/dashboard/ProductService";
import Image from "next/image";

export default function ProductsPage() {
  const { showNotification } = useNotification();
  const [products, setProducts] = useState<ProductDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/dashboard/products");
        const data = await response.json();

        if (data.success) {
          setProducts(data.products);
        } else {
          throw new Error(data.error || "Erreur lors du chargement");
        }
      } catch (error) {
        console.error("Erreur lors du chargement des produits:", error);
        showNotification(error instanceof Error ? error.message : "Erreur lors du chargement des produits", "error");
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [showNotification]);

  const handleDelete = async (id: string) => {
    if (!confirm(wording.dashboard.products.deleteConfirm)) {
      return;
    }

    try {
      setIsDeleting(true);
      const response = await fetch(`/api/dashboard/products/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setProducts(products.filter((p) => p.id !== id));
        showNotification(wording.dashboard.products.deleteSuccess, "success");
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
        {isLoading ? (
          <div className="bg-white p-12 border border-gray-200 text-center">
            <Typography variant="body-lg" theme="gray">
              Chargement des produits...
            </Typography>
          </div>
        ) : products.length === 0 ? (
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
              <div className="col-span-1">
                <Typography variant="body-sm" theme="black" weight="bold">
                  Image
                </Typography>
              </div>
              <div className="col-span-3">
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
                  {/* Image */}
                  <div className="col-span-1">
                    <Typography variant="body-sm" theme="gray" className="mb-1 md:hidden">
                      Image
                    </Typography>
                    <div className="relative w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded overflow-hidden shrink-0">
                      {product.src ? (
                        <Image
                          src={product.src}
                          alt={product.alt || product.nom || "Produit"}
                          fill
                          className="object-cover"
                          quality={100}
                          sizes="(max-width: 768px) 64px, 80px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <FiPackage className="text-gray-400" size={24} />
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Nom */}
                  <div className="col-span-1 md:col-span-3">
                    <Typography variant="body-sm" theme="gray" className="mb-1 md:hidden">
                      {wording.dashboard.products.name}
                    </Typography>
                    <Typography variant="body-base" theme="black" weight="bold" className="mb-1">
                      {product.nom}
                    </Typography>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <Typography variant="body-sm" theme="gray" className="mb-1 md:hidden">
                      {wording.dashboard.products.price}
                    </Typography>
                    <Typography variant="body-base" theme="black">
                      {(product.prix || 0).toLocaleString("fr-FR")} €
                    </Typography>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <Typography variant="body-sm" theme="gray" className="mb-1 md:hidden">
                      {wording.dashboard.products.category}
                    </Typography>
                    <Typography variant="body-base" theme="black">
                      {product.categorie || "Non catégorisé"}
                    </Typography>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <Typography variant="body-sm" theme="gray" className="mb-1 md:hidden">
                      {wording.dashboard.products.stock}
                    </Typography>
                    <Typography variant="body-base" theme="black">
                      {product.quantiteStock ?? 0}
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
                        disabled={isDeleting}
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

