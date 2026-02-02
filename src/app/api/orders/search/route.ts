import { NextRequest, NextResponse } from "next/server";
import { OrderService } from "@/services/payment/order/OrderService";
import { AdminOrderService } from "@/services/dashboard/AdminOrderService";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const searchTerm = searchParams.get("q");

    if (!searchTerm) {
      return NextResponse.json(
        { success: false, error: "Terme de recherche requis" },
        { status: 400 }
      );
    }

    const orderService = new OrderService();
    const adminOrderService = new AdminOrderService();

    // Essayer de trouver la commande par ID
    let order = await orderService.getOrderById(searchTerm);

    // Si pas trouvé, essayer par numéro de suivi
    if (!order) {
      const adminOrder = await adminOrderService.getOrderByTrackingNumber(searchTerm);
      if (adminOrder) {
        // Convertir OrderDocument en OrderData pour la compatibilité
        order = {
          id: adminOrder.id,
          userId: adminOrder.userId,
          userEmail: adminOrder.userEmail,
          items: adminOrder.items,
          totalAmount: adminOrder.totalAmount,
          currency: adminOrder.currency,
          status: adminOrder.status,
          paymentMethod: adminOrder.paymentMethod,
          paymentIntentId: adminOrder.paymentIntentId,
          stripeSessionId: adminOrder.stripeSessionId,
          createdAt: adminOrder.createdAt instanceof Date 
            ? adminOrder.createdAt 
            : adminOrder.createdAt && typeof adminOrder.createdAt === "object" && "toDate" in adminOrder.createdAt && adminOrder.createdAt.toDate
            ? adminOrder.createdAt.toDate()
            : new Date(),
          updatedAt: adminOrder.updatedAt instanceof Date 
            ? adminOrder.updatedAt 
            : adminOrder.updatedAt && typeof adminOrder.updatedAt === "object" && "toDate" in adminOrder.updatedAt && adminOrder.updatedAt.toDate
            ? adminOrder.updatedAt.toDate()
            : new Date(),
          metadata: adminOrder.metadata,
          trackingNumber: adminOrder.trackingNumber,
          shippedAt: adminOrder.shippedAt,
          estimatedDeliveryDate: adminOrder.estimatedDeliveryDate,
          shippingEmailSent: adminOrder.shippingEmailSent,
          shippingEmailSentAt: adminOrder.shippingEmailSentAt,
        };
      }
    }

    if (order) {
      return NextResponse.json({ success: true, order });
    } else {
      return NextResponse.json(
        { success: false, error: "Commande non trouvée" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Erreur lors de la recherche de commande:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Erreur inconnue" 
      },
      { status: 500 }
    );
  }
}

