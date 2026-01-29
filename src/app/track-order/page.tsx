"use client";

import { useState } from "react";
import { wording } from "@/utils/wording";
import Container from "@/components/container/container";
import Typography from "@/ui/designSystem/typography/typography";
import Button from "@/ui/designSystem/button/button";
import { FiSearch, FiPackage, FiTruck, FiCheckCircle, FiClock, FiXCircle, FiMapPin, FiCalendar } from "react-icons/fi";
import { useNotification } from "@/components/notifications/NotificationProvider";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled" | null;

interface OrderInfo {
  orderNumber: string;
  status: OrderStatus;
  orderDate?: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
}

export default function TrackOrderPage() {
  const { showNotification } = useNotification();
  const [orderNumber, setOrderNumber] = useState("");
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setNotFound(false);
    setOrderInfo(null);

    // TODO: Implémenter la logique de recherche de commande
    // Simulation d'une recherche
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Pour la démo, on simule une commande trouvée
    if (orderNumber.trim().length > 0) {
      setOrderInfo({
        orderNumber: orderNumber.trim(),
        status: "processing",
        orderDate: "2024-01-15",
        estimatedDelivery: "2024-01-20",
        trackingNumber: "TRACK123456",
      });
      showNotification("Commande trouvée", "success");
    } else {
      setNotFound(true);
      showNotification(wording.trackOrder.notFound, "error");
    }
    setIsSearching(false);
  };

  const getStatusConfig = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return {
          icon: FiClock,
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-500",
          label: wording.trackOrder.status.pending,
        };
      case "processing":
        return {
          icon: FiPackage,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-500",
          label: wording.trackOrder.status.processing,
        };
      case "shipped":
        return {
          icon: FiTruck,
          color: "text-purple-600",
          bgColor: "bg-purple-50",
          borderColor: "border-purple-500",
          label: wording.trackOrder.status.shipped,
        };
      case "delivered":
        return {
          icon: FiCheckCircle,
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-500",
          label: wording.trackOrder.status.delivered,
        };
      case "cancelled":
        return {
          icon: FiXCircle,
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-500",
          label: wording.trackOrder.status.cancelled,
        };
      default:
        return null;
    }
  };

  const getTimelineSteps = (status: OrderStatus) => {
    const steps = [
      { key: "pending", label: wording.trackOrder.status.pending, icon: FiClock },
      { key: "processing", label: wording.trackOrder.status.processing, icon: FiPackage },
      { key: "shipped", label: wording.trackOrder.status.shipped, icon: FiTruck },
      { key: "delivered", label: wording.trackOrder.status.delivered, icon: FiCheckCircle },
    ];

    const statusOrder = ["pending", "processing", "shipped", "delivered"];
    const currentIndex = status ? statusOrder.indexOf(status) : -1;

    return steps.map((step) => {
      const isCompleted = status && statusOrder.indexOf(step.key) <= currentIndex;
      const isCurrent = status && statusOrder.indexOf(step.key) === currentIndex;
      const isCancelled = status === "cancelled";

      return {
        ...step,
        isCompleted: isCompleted && !isCancelled,
        isCurrent: isCurrent && !isCancelled,
        isCancelled,
      };
    });
  };

  const statusConfig = orderInfo ? getStatusConfig(orderInfo.status) : null;
  const timelineSteps = orderInfo ? getTimelineSteps(orderInfo.status) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 relative overflow-hidden">
      {/* Éléments décoratifs en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* En-tête */}
          <div className="text-center mb-12">
            <Typography variant="h1" theme="black" weight="bold" className="mb-4">
              {wording.trackOrder.title}
            </Typography>
            <Typography variant="body-lg" theme="gray" className="max-w-2xl mx-auto">
              {wording.trackOrder.description}
            </Typography>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Colonne gauche - Formulaire de recherche */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-lg shadow-2xl border border-gray-200/50 p-8 sticky top-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                    <FiSearch className="text-primary text-xl" />
                  </div>
                  <Typography variant="h3" theme="black" weight="bold">
                    Rechercher
                  </Typography>
                </div>

                <form onSubmit={handleSearch} className="space-y-6">
                  <div>
                    <label
                      htmlFor="orderNumber"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      {wording.trackOrder.orderNumber}
                    </label>
                    <div className="relative group">
                      <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center border-r border-gray-300 bg-gray-50 group-focus-within:bg-primary/5 group-focus-within:border-primary transition-colors">
                        <FiSearch className="text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                      </div>
                      <input
                        type="text"
                        id="orderNumber"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                        placeholder={wording.trackOrder.orderNumberPlaceholder}
                        className="w-full pl-14 pr-4 py-4 border-2 border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white hover:border-gray-400"
                        required
                        aria-label={wording.trackOrder.orderNumber}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="accent"
                    size="large"
                    className="w-full group relative overflow-hidden"
                    disabled={isSearching}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSearching ? (
                        <>
                          <span className="animate-spin">⏳</span>
                          Recherche...
                        </>
                      ) : (
                        <>
                          {wording.trackOrder.search}
                          <FiSearch className="group-hover:scale-110 transition-transform" />
                        </>
                      )}
                    </span>
                    <span className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  </Button>
                </form>

                {notFound && (
                  <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 flex items-start gap-3">
                    <FiXCircle className="text-red-500 text-xl shrink-0 mt-0.5" />
                    <Typography variant="body-sm" theme="black" className="text-red-700">
                      {wording.trackOrder.notFound}
                    </Typography>
                  </div>
                )}
              </div>
            </div>

            {/* Colonne droite - Résultats */}
            <div className="lg:col-span-2">
              {orderInfo && statusConfig ? (
                <div className="space-y-8">
                  {/* Carte principale avec statut */}
                  <div className={`bg-white/80 backdrop-blur-lg shadow-2xl border-2 ${statusConfig.borderColor} p-8`}>
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <Typography variant="h2" theme="black" weight="bold" className="mb-2">
                          {wording.trackOrder.orderStatus}
                        </Typography>
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 ${statusConfig.bgColor} flex items-center justify-center`}>
                            <statusConfig.icon className={`${statusConfig.color} text-xl`} />
                          </div>
                          <Typography variant="h3" theme="black" weight="bold" className={statusConfig.color}>
                            {statusConfig.label}
                          </Typography>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-start gap-3">
                        <FiPackage className="text-gray-400 text-xl mt-1" />
                        <div>
                          <Typography variant="body-sm" theme="gray" className="mb-1">
                            {wording.trackOrder.orderNumberLabel}
                          </Typography>
                          <Typography variant="body-base" theme="black" weight="bold">
                            {orderInfo.orderNumber}
                          </Typography>
                        </div>
                      </div>

                      {orderInfo.trackingNumber && (
                        <div className="flex items-start gap-3">
                          <FiTruck className="text-gray-400 text-xl mt-1" />
                          <div>
                            <Typography variant="body-sm" theme="gray" className="mb-1">
                              Numéro de suivi
                            </Typography>
                            <Typography variant="body-base" theme="black" weight="bold">
                              {orderInfo.trackingNumber}
                            </Typography>
                          </div>
                        </div>
                      )}

                      {orderInfo.orderDate && (
                        <div className="flex items-start gap-3">
                          <FiCalendar className="text-gray-400 text-xl mt-1" />
                          <div>
                            <Typography variant="body-sm" theme="gray" className="mb-1">
                              Date de commande
                            </Typography>
                            <Typography variant="body-base" theme="black" weight="bold">
                              {new Date(orderInfo.orderDate).toLocaleDateString("fr-FR")}
                            </Typography>
                          </div>
                        </div>
                      )}

                      {orderInfo.estimatedDelivery && (
                        <div className="flex items-start gap-3">
                          <FiMapPin className="text-gray-400 text-xl mt-1" />
                          <div>
                            <Typography variant="body-sm" theme="gray" className="mb-1">
                              Livraison estimée
                            </Typography>
                            <Typography variant="body-base" theme="black" weight="bold">
                              {new Date(orderInfo.estimatedDelivery).toLocaleDateString("fr-FR")}
                            </Typography>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="bg-white/80 backdrop-blur-lg shadow-2xl border border-gray-200/50 p-8">
                    <Typography variant="h3" theme="black" weight="bold" className="mb-8">
                      Suivi de votre commande
                    </Typography>
                    <div className="space-y-6">
                      {timelineSteps.map((step, stepIndex) => {
                        const Icon = step.icon;
                        return (
                          <div key={step.key} className="flex items-start gap-4">
                            <div className="relative">
                              <div
                                className={`w-12 h-12 flex items-center justify-center ${
                                  step.isCompleted
                                    ? "bg-green-500 text-white"
                                    : step.isCurrent
                                    ? "bg-primary text-white"
                                    : step.isCancelled
                                    ? "bg-red-500 text-white"
                                    : "bg-gray-200 text-gray-400"
                                } transition-colors`}
                              >
                                <Icon size={20} />
                              </div>
                              {stepIndex < timelineSteps.length - 1 && (
                                <div
                                  className={`absolute left-1/2 top-12 w-0.5 h-6 -translate-x-1/2 ${
                                    step.isCompleted && !step.isCancelled
                                      ? "bg-green-500"
                                      : "bg-gray-200"
                                  }`}
                                />
                              )}
                            </div>
                            <div className="flex-1 pt-2">
                              <Typography
                                variant="body-base"
                                theme="black"
                                weight={step.isCurrent || step.isCompleted ? "bold" : "regular"}
                                className={
                                  step.isCompleted
                                    ? "text-green-600"
                                    : step.isCurrent
                                    ? "text-primary"
                                    : step.isCancelled
                                    ? "text-red-600"
                                    : "text-gray-500"
                                }
                              >
                                {step.label}
                              </Typography>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white/80 backdrop-blur-lg shadow-2xl border border-gray-200/50 p-12 text-center">
                  <div className="w-24 h-24 bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <FiSearch className="text-primary text-4xl" />
                  </div>
                  <Typography variant="h3" theme="black" weight="bold" className="mb-4">
                    Recherchez votre commande
                  </Typography>
                  <Typography variant="body-base" theme="gray">
                    Entrez votre numéro de commande dans le formulaire pour suivre l&apos;état de votre livraison.
                  </Typography>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

