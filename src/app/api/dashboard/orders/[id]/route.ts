import { NextRequest, NextResponse } from "next/server";
import { AdminOrderService } from "@/services/dashboard/AdminOrderService";
import { PaymentStatus } from "@/types/payment.types";

// GET - Récupérer une commande par ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const orderService = new AdminOrderService();
    const order = await orderService.getOrderById(resolvedParams.id);
    
    if (!order) {
      return NextResponse.json(
        { success: false, error: "Commande non trouvée" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Erreur lors de la récupération de la commande:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Erreur inconnue" 
      },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour le statut d'une commande
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const body = await request.json();
    const orderService = new AdminOrderService();
    
    if (body.status) {
      await orderService.updateOrderStatus(resolvedParams.id, body.status as PaymentStatus);
    }
    
    if (body.trackingNumber && body.status === "SHIPPED") {
      await orderService.markOrderAsShipped(
        resolvedParams.id,
        body.trackingNumber,
        body.estimatedDeliveryDate ? new Date(body.estimatedDeliveryDate) : undefined
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la commande:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Erreur inconnue" 
      },
      { status: 500 }
    );
  }
}

