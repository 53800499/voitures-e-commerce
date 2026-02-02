import { NextResponse } from "next/server";
import { ProductService } from "@/services/dashboard/ProductService";
import { CategoryService } from "@/services/dashboard/CategoryService";
import { AdminOrderService } from "@/services/dashboard/AdminOrderService";

export async function GET() {
  try {
    // Essayer de charger les statistiques
    // Si Firebase Admin n'est pas configuré, on retourne des valeurs par défaut
    let products: any[] = [];
    let categories: any[] = [];
    let orders: any[] = [];

    try {
      [products, categories, orders] = await Promise.all([
        new ProductService().getAllProducts(),
        new CategoryService().getAllCategories(),
        new AdminOrderService().getAllOrders(),
      ]);
    } catch (adminError: any) {
      // Si l'erreur concerne Firebase Admin, on essaie de récupérer au moins les produits et catégories
      if (adminError?.message?.includes("Firebase Admin SDK") || 
          adminError?.message?.includes("credentials") ||
          adminError?.message?.includes("Could not load")) {
        console.warn("⚠️ Firebase Admin non configuré, récupération partielle des données...");
        try {
          [products, categories] = await Promise.all([
            new ProductService().getAllProducts(),
            new CategoryService().getAllCategories(),
          ]);
          // Les commandes nécessitent Admin SDK, on les laisse à 0
          orders = [];
        } catch (fallbackError) {
          console.error("Erreur lors de la récupération partielle:", fallbackError);
          throw adminError; // Relancer l'erreur originale
        }
      } else {
        throw adminError;
      }
    }

    // Calculer le revenu total depuis les commandes payées
    const revenue = orders
      .filter((order) => order.status === "PAID" || order.status === "SHIPPED" || order.status === "DELIVERED")
      .reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    return NextResponse.json({
      success: true,
      stats: {
        totalProducts: products.length,
        totalCategories: categories.length,
        totalOrders: orders.length,
        totalRevenue: revenue,
      },
    });
  } catch (error) {
    console.error("Erreur lors du chargement des statistiques:", error);
    
    // Message d'erreur plus clair pour l'utilisateur
    let errorMessage = "Erreur inconnue lors du chargement des statistiques";
    if (error instanceof Error) {
      if (error.message.includes("Firebase Admin SDK") || error.message.includes("credentials")) {
        errorMessage = 
          "Firebase Admin SDK n'est pas configuré. " +
          "Veuillez configurer les variables d'environnement FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, et FIREBASE_PRIVATE_KEY.";
      } else {
        errorMessage = error.message;
      }
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage
      },
      { status: 500 }
    );
  }
}

