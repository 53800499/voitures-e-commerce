"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Typography from "@/ui/designSystem/typography/typography";
import { wording } from "@/utils/wording";
import { FiShoppingBag, FiEye } from "react-icons/fi";
import Link from "next/link";
import { OrderDocument } from "@/types/order.types";
import { useNotification } from "@/components/notifications/NotificationProvider";

export default function OrdersPage() {
  const { showNotification } = useNotification();
  const [orders, setOrders] = useState<OrderDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/dashboard/orders");
        const data = await response.json();

        if (data.success) {
          setOrders(data.orders);
        } else {
          throw new Error(data.error || "Erreur lors du chargement");
        }
      } catch (error) {
        console.error("Erreur lors du chargement des commandes:", error);
        showNotification("Erreur lors du chargement des commandes", "error");
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, [showNotification]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "PROCESSING":
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "SHIPPED":
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "DELIVERED":
      case "delivered":
        return "bg-green-100 text-green-800";
      case "PAID":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    const statusKey = status.toLowerCase() as keyof typeof wording.dashboard.orders.statuses;
    return wording.dashboard.orders.statuses[statusKey] || status;
  };

  const formatOrderDate = (date: Date | { toDate?: () => Date } | undefined) => {
    if (!date) return "Date inconnue";
    if (date instanceof Date) {
      return date.toLocaleDateString("fr-FR");
    }
    if (typeof date === "object" && "toDate" in date && date.toDate) {
      return date.toDate().toLocaleDateString("fr-FR");
    }
    return "Date inconnue";
  };

  const getOrderNumber = (order: OrderDocument) => {
    return order.id ? `CMD-${order.id.substring(0, 8).toUpperCase()}` : "N/A";
  };

  const getCustomerName = (order: OrderDocument) => {
    // Essayer de récupérer le nom depuis les métadonnées ou utiliser l'email
    if (order.metadata?.firstName && order.metadata?.lastName) {
      return `${order.metadata.firstName} ${order.metadata.lastName}`;
    }
    return order.userEmail?.split("@")[0] || "Client";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div>
          <Typography variant="h1" theme="black" weight="bold" className="mb-2">
            {wording.dashboard.orders.title}
          </Typography>
          <Typography variant="body-base" theme="gray">
            Consultez et gérez toutes les commandes
          </Typography>
        </div>

        {/* Liste des commandes */}
        {isLoading ? (
          <div className="bg-white p-12 border border-gray-200 text-center">
            <Typography variant="body-lg" theme="gray">
              Chargement des commandes...
            </Typography>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white p-12 border border-gray-200 text-center">
            <FiShoppingBag className="mx-auto text-gray-400 mb-4" size={48} />
            <Typography variant="body-lg" theme="gray">
              {wording.dashboard.orders.noOrders}
            </Typography>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 overflow-hidden">
            {/* Table Header - Desktop */}
            <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200">
              <div className="col-span-2">
                <Typography variant="body-sm" theme="black" weight="bold">
                  {wording.dashboard.orders.orderNumber}
                </Typography>
              </div>
              <div className="col-span-3">
                <Typography variant="body-sm" theme="black" weight="bold">
                  {wording.dashboard.orders.customer}
                </Typography>
              </div>
              <div className="col-span-2">
                <Typography variant="body-sm" theme="black" weight="bold">
                  {wording.dashboard.orders.date}
                </Typography>
              </div>
              <div className="col-span-2">
                <Typography variant="body-sm" theme="black" weight="bold">
                  {wording.dashboard.orders.total}
                </Typography>
              </div>
              <div className="col-span-2">
                <Typography variant="body-sm" theme="black" weight="bold">
                  {wording.dashboard.orders.status}
                </Typography>
              </div>
              <div className="col-span-1">
                <Typography variant="body-sm" theme="black" weight="bold">
                  {wording.dashboard.orders.actions}
                </Typography>
              </div>
            </div>

            {/* Orders List */}
            <div className="divide-y divide-gray-200">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="col-span-1 md:col-span-2">
                    <Typography variant="body-sm" theme="gray" className="mb-1 md:hidden">
                      {wording.dashboard.orders.orderNumber}
                    </Typography>
                    <Typography variant="body-base" theme="black" weight="bold">
                      {getOrderNumber(order)}
                    </Typography>
                  </div>
                  <div className="col-span-1 md:col-span-3">
                    <Typography variant="body-sm" theme="gray" className="mb-1 md:hidden">
                      {wording.dashboard.orders.customer}
                    </Typography>
                    <Typography variant="body-base" theme="black" className="mb-1">
                      {getCustomerName(order)}
                    </Typography>
                    <Typography variant="body-sm" theme="gray">
                      {order.userEmail || "Email inconnu"}
                    </Typography>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <Typography variant="body-sm" theme="gray" className="mb-1 md:hidden">
                      {wording.dashboard.orders.date}
                    </Typography>
                    <Typography variant="body-base" theme="black">
                      {formatOrderDate(order.createdAt)}
                    </Typography>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <Typography variant="body-sm" theme="gray" className="mb-1 md:hidden">
                      {wording.dashboard.orders.total}
                    </Typography>
                    <Typography variant="body-base" theme="black" weight="bold">
                      {order.totalAmount.toLocaleString("fr-FR")} {order.currency || "€"}
                    </Typography>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <Typography variant="body-sm" theme="gray" className="mb-1 md:hidden">
                      {wording.dashboard.orders.status}
                    </Typography>
                    <span
                      className={`inline-block px-3 py-1 text-sm ${getStatusColor(order.status)}`}
                    >
                      {getStatusLabel(order.status || "PENDING")}
                    </span>
                  </div>
                  <div className="col-span-1">
                    <Typography variant="body-sm" theme="gray" className="mb-1 md:hidden">
                      {wording.dashboard.orders.actions}
                    </Typography>
                    <Link href={`/dashboard/orders/${order.id}`}>
                      <button
                        className="p-2 text-primary hover:bg-primary/10 transition-colors"
                        title={wording.dashboard.orders.view}
                      >
                        <FiEye size={18} />
                      </button>
                    </Link>
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

