"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Typography from "@/ui/designSystem/typography/typography";
import { wording } from "@/utils/wording";
import { FiShoppingBag, FiEye } from "react-icons/fi";
import Link from "next/link";

// Mock data pour la démo
const mockOrders = [
  {
    id: "1",
    orderNumber: "CMD-2024-001",
    customer: "Jean Dupont",
    email: "jean.dupont@example.com",
    date: "2024-01-15",
    total: 8990,
    status: "processing",
  },
  {
    id: "2",
    orderNumber: "CMD-2024-002",
    customer: "Marie Martin",
    email: "marie.martin@example.com",
    date: "2024-01-16",
    total: 7990,
    status: "shipped",
  },
];

export default function OrdersPage() {
  const [orders] = useState(mockOrders);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    return wording.dashboard.orders.statuses[status as keyof typeof wording.dashboard.orders.statuses] || status;
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
        {orders.length === 0 ? (
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
                      {order.orderNumber}
                    </Typography>
                  </div>
                  <div className="col-span-1 md:col-span-3">
                    <Typography variant="body-sm" theme="gray" className="mb-1 md:hidden">
                      {wording.dashboard.orders.customer}
                    </Typography>
                    <Typography variant="body-base" theme="black" className="mb-1">
                      {order.customer}
                    </Typography>
                    <Typography variant="body-sm" theme="gray">
                      {order.email}
                    </Typography>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <Typography variant="body-sm" theme="gray" className="mb-1 md:hidden">
                      {wording.dashboard.orders.date}
                    </Typography>
                    <Typography variant="body-base" theme="black">
                      {new Date(order.date).toLocaleDateString("fr-FR")}
                    </Typography>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <Typography variant="body-sm" theme="gray" className="mb-1 md:hidden">
                      {wording.dashboard.orders.total}
                    </Typography>
                    <Typography variant="body-base" theme="black" weight="bold">
                      {order.total.toLocaleString("fr-FR")} €
                    </Typography>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <Typography variant="body-sm" theme="gray" className="mb-1 md:hidden">
                      {wording.dashboard.orders.status}
                    </Typography>
                    <span
                      className={`inline-block px-3 py-1 text-sm ${getStatusColor(order.status)}`}
                    >
                      {getStatusLabel(order.status)}
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

