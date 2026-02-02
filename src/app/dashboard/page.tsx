/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Typography from "@/ui/designSystem/typography/typography";
import { wording } from "@/utils/wording";
import { FiPackage, FiFolder, FiShoppingBag, FiDollarSign } from "react-icons/fi";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    totalRevenue: 0,
    isLoading: true,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await fetch("/api/dashboard/stats");
        const data = await response.json();

        if (data.success) {
          setStats({
            totalProducts: data.stats.totalProducts,
            totalCategories: data.stats.totalCategories,
            totalOrders: data.stats.totalOrders,
            totalRevenue: data.stats.totalRevenue,
            isLoading: false,
          });
        } else {
          // Afficher un message d'erreur plus clair à l'utilisateur
          const errorMessage = data.error || "Erreur lors du chargement";
          console.error("Erreur lors du chargement des statistiques:", errorMessage);
          
          // Si c'est une erreur de configuration Firebase Admin, afficher un message utile
          if (errorMessage.includes("Firebase Admin SDK") || errorMessage.includes("credentials")) {
            console.warn("⚠️ Firebase Admin SDK n'est pas configuré. Certaines fonctionnalités peuvent être limitées.");
          }
          
          setStats((prev) => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error("Erreur lors du chargement des statistiques:", error);
        setStats((prev) => ({ ...prev, isLoading: false }));
      }
    };

    loadStats();
  }, []);

  const statsData = [
    {
      label: wording.dashboard.stats.totalProducts,
      value: stats.isLoading ? "..." : stats.totalProducts.toString(),
      icon: FiPackage,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: wording.dashboard.stats.totalCategories,
      value: stats.isLoading ? "..." : stats.totalCategories.toString(),
      icon: FiFolder,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: wording.dashboard.stats.totalOrders,
      value: stats.isLoading ? "..." : stats.totalOrders.toString(),
      icon: FiShoppingBag,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      label: wording.dashboard.stats.totalRevenue,
      value: stats.isLoading ? "..." : `${stats.totalRevenue.toLocaleString("fr-FR")} €`,
      icon: FiDollarSign,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* En-tête */}
        <div>
          <Typography variant="h1" theme="black" weight="bold" className="mb-2">
            {wording.dashboard.welcome}
          </Typography>
          <Typography variant="body-base" theme="gray">
            Gérez vos produits, catégories et commandes depuis ce tableau de bord.
          </Typography>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 border border-gray-200 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bgColor} flex items-center justify-center`}>
                    <Icon className={stat.color} size={24} />
                  </div>
                </div>
                <Typography variant="h3" theme="black" weight="bold" className="mb-1">
                  {stat.value}
                </Typography>
                <Typography variant="body-sm" theme="gray">
                  {stat.label}
                </Typography>
              </div>
            );
          })}
        </div>

        {/* Actions rapides */}
        <div className="bg-white p-6 border border-gray-200 shadow-sm">
          <Typography variant="h2" theme="black" weight="bold" className="mb-4">
            Actions rapides
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href="/dashboard/products"
              className="p-4 border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <Typography variant="body-base" theme="black" weight="bold" className="mb-2">
                {wording.dashboard.products.add}
              </Typography>
              <Typography variant="body-sm" theme="gray">
                Ajoutez un nouveau produit à votre catalogue
              </Typography>
            </a>
            <a
              href="/dashboard/categories"
              className="p-4 border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <Typography variant="body-base" theme="black" weight="bold" className="mb-2">
                {wording.dashboard.categories.add}
              </Typography>
              <Typography variant="body-sm" theme="gray">
                Créez une nouvelle catégorie
              </Typography>
            </a>
            <a
              href="/dashboard/orders"
              className="p-4 border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <Typography variant="body-base" theme="black" weight="bold" className="mb-2">
                Voir les commandes
              </Typography>
              <Typography variant="body-sm" theme="gray">
                Consultez toutes les commandes
              </Typography>
            </a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

