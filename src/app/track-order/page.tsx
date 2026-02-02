"use client";

import { useState } from "react";
import { wording } from "@/utils/wording";
import Container from "@/components/container/container";
import Typography from "@/ui/designSystem/typography/typography";
import Button from "@/ui/designSystem/button/button";
import { FiSearch, FiPackage, FiTruck, FiCheckCircle, FiClock, FiXCircle, FiMapPin, FiCalendar } from "react-icons/fi";
import { useNotification } from "@/components/notifications/NotificationProvider";
import SlideUp from "@/components/animations/SlideUp";
import FadeIn from "@/components/animations/FadeIn";
import ScaleIn from "@/components/animations/ScaleIn";

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

    try {
      const searchTerm = orderNumber.trim();
      if (!searchTerm) {
        setNotFound(true);
        showNotification("Veuillez entrer un numéro de commande", "error");
        setIsSearching(false);
        return;
      }

      // Rechercher la commande via l'API
      const response = await fetch(`/api/orders/search?q=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();

      if (!data.success) {
        setNotFound(true);
        showNotification(data.error || wording.trackOrder.notFound, "error");
        setIsSearching(false);
        return;
      }

      const order = data.order;

      if (order) {
        // Convertir le statut pour l'affichage
        const statusMap: Record<string, OrderStatus> = {
          PENDING: "pending",
          PROCESSING: "processing",
          SHIPPED: "shipped",
          DELIVERED: "delivered",
          CANCELLED: "cancelled",
          PAID: "processing",
          FAILED: "cancelled",
        };

        const displayStatus = statusMap[order.status] || "pending";

        // Formater les dates
        const orderDate = order.createdAt instanceof Date 
          ? order.createdAt.toISOString().split("T")[0]
          : order.createdAt && typeof order.createdAt === "object" && "toDate" in order.createdAt && order.createdAt.toDate
          ? order.createdAt.toDate().toISOString().split("T")[0]
          : undefined;

        const estimatedDelivery = order.estimatedDeliveryDate instanceof Date
          ? order.estimatedDeliveryDate.toISOString().split("T")[0]
          : order.estimatedDeliveryDate && typeof order.estimatedDeliveryDate === "object" && "toDate" in order.estimatedDeliveryDate && order.estimatedDeliveryDate.toDate
          ? order.estimatedDeliveryDate.toDate().toISOString().split("T")[0]
          : undefined;

        setOrderInfo({
          orderNumber: order.id || searchTerm,
          status: displayStatus,
          orderDate,
          estimatedDelivery,
          trackingNumber: order.trackingNumber,
        });
        showNotification("Commande trouvée", "success");
      } else {
        setNotFound(true);
        showNotification(wording.trackOrder.notFound, "error");
      }
    } catch (error) {
      console.error("Erreur lors de la recherche de commande:", error);
      setNotFound(true);
      showNotification("Erreur lors de la recherche de commande", "error");
    } finally {
      setIsSearching(false);
    }
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-8 md:py-12 relative overflow-hidden">
      {/* Éléments décoratifs en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* En-tête */}
          <FadeIn>
            <div className="text-center mb-8 md:mb-12">
              <Typography variant="h1" theme="black" weight="bold" className="mb-4 text-3xl md:text-4xl lg:text-5xl">
                {wording.trackOrder.title}
              </Typography>
              <Typography variant="body-lg" theme="gray" className="max-w-2xl mx-auto text-sm md:text-base">
                {wording.trackOrder.description}
              </Typography>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Colonne gauche - Formulaire de recherche */}
            <div className="lg:col-span-1">
              <SlideUp delay={0.2}>
                <div className="bg-white/80 backdrop-blur-lg shadow-2xl border border-gray-200/50 p-6 md:p-8 sticky top-8 rounded-xl">
                  <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 flex items-center justify-center">
                      <FiSearch className="text-primary text-lg md:text-xl" />
                    </div>
                    <Typography variant="h3" theme="black" weight="bold" className="text-lg md:text-xl">
                      Rechercher
                    </Typography>
                  </div>

                  <form onSubmit={handleSearch} className="space-y-4 md:space-y-6">
                    <div>
                      <label
                        htmlFor="orderNumber"
                        className="block text-sm font-semibold text-gray-900 mb-2"
                      >
                        {wording.trackOrder.orderNumber}
                      </label>
                      <div className="relative group">
                        <div className="absolute left-0 top-0 bottom-0 w-10 md:w-12 flex items-center justify-center border-r border-gray-300 bg-gray-50 group-focus-within:bg-primary/5 group-focus-within:border-primary transition-colors rounded-l-lg">
                          <FiSearch className="text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                        </div>
                        <input
                          type="text"
                          id="orderNumber"
                          value={orderNumber}
                          onChange={(e) => setOrderNumber(e.target.value)}
                          placeholder={wording.trackOrder.orderNumberPlaceholder}
                          className="w-full pl-12 md:pl-14 pr-3 md:pr-4 py-3 md:py-4 border-2 border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white hover:border-gray-400 rounded-lg"
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
                    <FadeIn>
                      <div className="mt-4 md:mt-6 p-3 md:p-4 bg-red-50 border-l-4 border-red-500 flex items-start gap-3 rounded">
                        <FiXCircle className="text-red-500 text-lg md:text-xl shrink-0 mt-0.5" />
                        <Typography variant="body-sm" theme="black" className="text-red-700 text-xs md:text-sm">
                          {wording.trackOrder.notFound}
                        </Typography>
                      </div>
                    </FadeIn>
                  )}
                </div>
              </SlideUp>
            </div>

            {/* Colonne droite - Résultats */}
            <div className="lg:col-span-2">
              {orderInfo && statusConfig ? (
                <div className="space-y-6 md:space-y-8">
                  {/* Carte principale avec statut */}
                  <SlideUp delay={0.3}>
                    <div className={`bg-white/80 backdrop-blur-lg shadow-2xl border-2 ${statusConfig.borderColor} p-6 md:p-8 rounded-xl`}>
                      <div className="flex items-start justify-between mb-4 md:mb-6">
                        <div>
                          <Typography variant="h2" theme="black" weight="bold" className="mb-2 text-xl md:text-2xl">
                            {wording.trackOrder.orderStatus}
                          </Typography>
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 md:w-12 md:h-12 ${statusConfig.bgColor} flex items-center justify-center rounded-lg`}>
                              <statusConfig.icon className={`${statusConfig.color} text-lg md:text-xl`} />
                            </div>
                            <Typography variant="h3" theme="black" weight="bold" className={`${statusConfig.color} text-lg md:text-xl`}>
                              {statusConfig.label}
                            </Typography>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="flex items-start gap-3">
                          <FiPackage className="text-gray-400 text-lg md:text-xl mt-1" />
                          <div>
                            <Typography variant="body-sm" theme="gray" className="mb-1 text-xs md:text-sm">
                              {wording.trackOrder.orderNumberLabel}
                            </Typography>
                            <Typography variant="body-base" theme="black" weight="bold" className="text-sm md:text-base">
                              {orderInfo.orderNumber}
                            </Typography>
                          </div>
                        </div>

                        {orderInfo.trackingNumber && (
                          <div className="flex items-start gap-3">
                            <FiTruck className="text-gray-400 text-lg md:text-xl mt-1" />
                            <div>
                              <Typography variant="body-sm" theme="gray" className="mb-1 text-xs md:text-sm">
                                Numéro de suivi
                              </Typography>
                              <Typography variant="body-base" theme="black" weight="bold" className="text-sm md:text-base">
                                {orderInfo.trackingNumber}
                              </Typography>
                            </div>
                          </div>
                        )}

                        {orderInfo.orderDate && (
                          <div className="flex items-start gap-3">
                            <FiCalendar className="text-gray-400 text-lg md:text-xl mt-1" />
                            <div>
                              <Typography variant="body-sm" theme="gray" className="mb-1 text-xs md:text-sm">
                                Date de commande
                              </Typography>
                              <Typography variant="body-base" theme="black" weight="bold" className="text-sm md:text-base">
                                {new Date(orderInfo.orderDate).toLocaleDateString("fr-FR")}
                              </Typography>
                            </div>
                          </div>
                        )}

                        {orderInfo.estimatedDelivery && (
                          <div className="flex items-start gap-3">
                            <FiMapPin className="text-gray-400 text-lg md:text-xl mt-1" />
                            <div>
                              <Typography variant="body-sm" theme="gray" className="mb-1 text-xs md:text-sm">
                                Livraison estimée
                              </Typography>
                              <Typography variant="body-base" theme="black" weight="bold" className="text-sm md:text-base">
                                {new Date(orderInfo.estimatedDelivery).toLocaleDateString("fr-FR")}
                              </Typography>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </SlideUp>

                  {/* Timeline */}
                  <SlideUp delay={0.4}>
                    <div className="bg-white/80 backdrop-blur-lg shadow-2xl border border-gray-200/50 p-6 md:p-8 rounded-xl">
                      <Typography variant="h3" theme="black" weight="bold" className="mb-6 md:mb-8 text-lg md:text-xl">
                        Suivi de votre commande
                      </Typography>
                      <div className="space-y-4 md:space-y-6">
                        {timelineSteps.map((step, stepIndex) => {
                          const Icon = step.icon;
                          return (
                            <div key={step.key} className="flex items-start gap-3 md:gap-4">
                              <div className="relative">
                                <div
                                  className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg transition-colors ${
                                    step.isCompleted
                                      ? "bg-green-500 text-white"
                                      : step.isCurrent
                                      ? "bg-primary text-white"
                                      : step.isCancelled
                                      ? "bg-red-500 text-white"
                                      : "bg-gray-200 text-gray-400"
                                  }`}
                                >
                                  <Icon size={18} />
                                </div>
                                {stepIndex < timelineSteps.length - 1 && (
                                  <div
                                    className={`absolute left-1/2 top-10 md:top-12 w-0.5 h-4 md:h-6 -translate-x-1/2 ${
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
                                  className={`text-sm md:text-base ${
                                    step.isCompleted
                                      ? "text-green-600"
                                      : step.isCurrent
                                      ? "text-primary"
                                      : step.isCancelled
                                      ? "text-red-600"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {step.label}
                                </Typography>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </SlideUp>
                </div>
              ) : (
                <FadeIn>
                  <div className="bg-white/80 backdrop-blur-lg shadow-2xl border border-gray-200/50 p-8 md:p-12 text-center rounded-xl">
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-primary/10 flex items-center justify-center mx-auto mb-4 md:mb-6 rounded-full">
                      <FiSearch className="text-primary text-2xl md:text-4xl" />
                    </div>
                    <Typography variant="h3" theme="black" weight="bold" className="mb-3 md:mb-4 text-lg md:text-xl">
                      Recherchez votre commande
                    </Typography>
                    <Typography variant="body-base" theme="gray" className="text-sm md:text-base">
                      Entrez votre numéro de commande dans le formulaire pour suivre l&apos;état de votre livraison.
                    </Typography>
                  </div>
                </FadeIn>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
