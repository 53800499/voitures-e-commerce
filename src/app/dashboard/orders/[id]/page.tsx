/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Typography from "@/ui/designSystem/typography/typography";
import Button from "@/ui/designSystem/button/button";
import { wording } from "@/utils/wording";
import { FiArrowLeft, FiSave, FiPackage, FiTruck, FiUser, FiMail, FiCalendar, FiDollarSign } from "react-icons/fi";
import { useNotification } from "@/components/notifications/NotificationProvider";
import Link from "next/link";
import { OrderDocument } from "@/types/order.types";
import { PaymentStatus } from "@/types/payment.types";

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params?.id as string;
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [order, setOrder] = useState<OrderDocument | null>(null);
  const [formData, setFormData] = useState({
    status: "" as PaymentStatus,
    trackingNumber: "",
    estimatedDeliveryDate: "",
  });

  useEffect(() => {
    const loadOrder = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/dashboard/orders/${orderId}`);
        const data = await response.json();

        if (data.success && data.order) {
          const orderData = data.order as OrderDocument;
          setOrder(orderData);
          
          // Formater les dates pour les inputs
          const estimatedDate = orderData.estimatedDeliveryDate instanceof Date
            ? orderData.estimatedDeliveryDate.toISOString().split("T")[0]
            : orderData.estimatedDeliveryDate && typeof orderData.estimatedDeliveryDate === "object" && "toDate" in orderData.estimatedDeliveryDate
            ? (orderData.estimatedDeliveryDate as any).toDate().toISOString().split("T")[0]
            : "";

          setFormData({
            status: orderData.status || "PENDING",
            trackingNumber: orderData.trackingNumber || "",
            estimatedDeliveryDate: estimatedDate,
          });
        } else {
          throw new Error(data.error || "Commande non trouvée");
        }
      } catch (error) {
        console.error("Erreur:", error);
        showNotification(error instanceof Error ? error.message : "Erreur lors du chargement", "error");
        router.push("/dashboard/orders");
      } finally {
        setIsLoading(false);
      }
    };

    if (orderId) {
      loadOrder();
    }
  }, [orderId, router, showNotification]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSaving(true);
      const response = await fetch(`/api/dashboard/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: formData.status,
          trackingNumber: formData.trackingNumber,
          estimatedDeliveryDate: formData.estimatedDeliveryDate || undefined,
        }),
      });

      const data = await response.json();

      if (data.success) {
        showNotification("Commande mise à jour avec succès", "success");
        // Recharger la commande
        const reloadResponse = await fetch(`/api/dashboard/orders/${orderId}`);
        const reloadData = await reloadResponse.json();
        if (reloadData.success) {
          setOrder(reloadData.order);
        }
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

  const formatDate = (date: Date | { toDate?: () => Date } | undefined) => {
    if (!date) return "Non définie";
    if (date instanceof Date) {
      return date.toLocaleDateString("fr-FR", { 
        year: "numeric", 
        month: "long", 
        day: "numeric" 
      });
    }
    if (typeof date === "object" && "toDate" in date && date.toDate) {
      return date.toDate().toLocaleDateString("fr-FR", { 
        year: "numeric", 
        month: "long", 
        day: "numeric" 
      });
    }
    return "Non définie";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "PAID":
      case "PROCESSING":
        return "bg-blue-100 text-blue-800";
      case "SHIPPED":
        return "bg-purple-100 text-purple-800";
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
      case "FAILED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <Typography variant="body-lg" theme="gray">
            Chargement de la commande...
          </Typography>
        </div>
      </DashboardLayout>
    );
  }

  if (!order) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <Typography variant="h3" theme="black" weight="bold" className="mb-4">
            Commande non trouvée
          </Typography>
          <Link href="/dashboard/orders">
            <Button variant="accent" size="large">
              Retour aux commandes
            </Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard/orders">
            <Button variant="secondary" size="medium">
              <FiArrowLeft className="mr-2" />
              Retour
            </Button>
          </Link>
          <div className="flex-1">
            <Typography variant="h1" theme="black" weight="bold">
              Commande #{order.id.substring(0, 8).toUpperCase()}
            </Typography>
            <span className={`inline-block px-3 py-1 text-sm mt-2 ${getStatusColor(order.status || "PENDING")}`}>
              {order.status || "PENDING"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne principale - Détails */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informations client */}
            <div className="bg-white border border-gray-200 p-6">
              <Typography variant="h3" theme="black" weight="bold" className="mb-4">
                Informations client
              </Typography>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FiUser className="text-gray-400" />
                  <div>
                    <Typography variant="body-sm" theme="gray">
                      Nom
                    </Typography>
                    <Typography variant="body-base" theme="black" weight="bold">
                      {order.metadata?.firstName && order.metadata?.lastName
                        ? `${order.metadata.firstName} ${order.metadata.lastName}`
                        : order.userEmail?.split("@")[0] || "Client"}
                    </Typography>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FiMail className="text-gray-400" />
                  <div>
                    <Typography variant="body-sm" theme="gray">
                      Email
                    </Typography>
                    <Typography variant="body-base" theme="black">
                      {order.userEmail || "Non renseigné"}
                    </Typography>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FiCalendar className="text-gray-400" />
                  <div>
                    <Typography variant="body-sm" theme="gray">
                      Date de commande
                    </Typography>
                    <Typography variant="body-base" theme="black">
                      {formatDate(order.createdAt)}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>

            {/* Articles commandés */}
            <div className="bg-white border border-gray-200 p-6">
              <Typography variant="h3" theme="black" weight="bold" className="mb-4">
                Articles commandés
              </Typography>
              <div className="space-y-4">
                {order.items?.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 pb-4 border-b border-gray-200 last:border-0">
                    {item.imageUrl && (
                      <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden shrink-0">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1">
                      <Typography variant="body-base" theme="black" weight="bold">
                        {item.name}
                      </Typography>
                      {item.description && (
                        <Typography variant="body-sm" theme="gray">
                          {item.description}
                        </Typography>
                      )}
                      <Typography variant="body-sm" theme="gray">
                        Quantité: {item.quantity}
                      </Typography>
                    </div>
                    <Typography variant="body-base" theme="black" weight="bold">
                      {(item.price * item.quantity).toLocaleString("fr-FR")} {order.currency || "€"}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne latérale - Gestion */}
          <div className="space-y-6">
            {/* Résumé */}
            <div className="bg-white border border-gray-200 p-6">
              <Typography variant="h3" theme="black" weight="bold" className="mb-4">
                Résumé
              </Typography>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Typography variant="body-base" theme="gray">
                    Sous-total
                  </Typography>
                  <Typography variant="body-base" theme="black" weight="bold">
                    {order.totalAmount.toLocaleString("fr-FR")} {order.currency || "€"}
                  </Typography>
                </div>
                <div className="pt-3 border-t border-gray-200 flex justify-between">
                  <Typography variant="h4" theme="black" weight="bold">
                    Total
                  </Typography>
                  <Typography variant="h4" theme="primary" weight="bold">
                    {order.totalAmount.toLocaleString("fr-FR")} {order.currency || "€"}
                  </Typography>
                </div>
              </div>
            </div>

            {/* Gestion du statut */}
            <div className="bg-white border border-gray-200 p-6">
              <Typography variant="h3" theme="black" weight="bold" className="mb-4">
                Gestion de la commande
              </Typography>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Statut *
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="PENDING">En attente</option>
                    <option value="PAID">Payée</option>
                    <option value="PROCESSING">En traitement</option>
                    <option value="SHIPPED">Expédiée</option>
                    <option value="DELIVERED">Livrée</option>
                    <option value="CANCELLED">Annulée</option>
                  </select>
                </div>

                {formData.status === "SHIPPED" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Numéro de suivi
                      </label>
                      <input
                        type="text"
                        name="trackingNumber"
                        value={formData.trackingNumber}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Date de livraison estimée
                      </label>
                      <input
                        type="date"
                        name="estimatedDeliveryDate"
                        value={formData.estimatedDeliveryDate}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                  </>
                )}

                {order.trackingNumber && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                    <div className="flex items-center gap-2 mb-1">
                      <FiTruck className="text-blue-600" />
                      <Typography variant="body-sm" theme="black" weight="bold">
                        Numéro de suivi
                      </Typography>
                    </div>
                    <Typography variant="body-base" theme="black">
                      {order.trackingNumber}
                    </Typography>
                    {order.estimatedDeliveryDate && (
                      <Typography variant="body-sm" theme="gray" className="mt-1">
                        Livraison estimée: {formatDate(order.estimatedDeliveryDate)}
                      </Typography>
                    )}
                  </div>
                )}

                <Button type="submit" variant="accent" size="large" fullwidth isLoading={isSaving}>
                  <FiSave className="mr-2" />
                  Enregistrer les modifications
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

