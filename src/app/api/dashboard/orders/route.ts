import { NextResponse } from "next/server";
import { AdminOrderService } from "@/services/dashboard/AdminOrderService";

export async function GET() {
  try {
    const orderService = new AdminOrderService();
    const orders = await orderService.getAllOrders();
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Erreur inconnue" 
      },
      { status: 500 }
    );
  }
}

