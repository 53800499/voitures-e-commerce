import { NextRequest, NextResponse } from "next/server";
import { ProductService } from "@/services/dashboard/ProductService";
import { ProductDocument } from "@/services/dashboard/ProductService";

// GET - Récupérer tous les produits
export async function GET() {
  try {
    const productService = new ProductService();
    const products = await productService.getAllProducts();
    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Erreur inconnue" 
      },
      { status: 500 }
    );
  }
}

// POST - Créer un produit
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const productService = new ProductService();
    
    // Préparer les données du produit
    const productData: Omit<ProductDocument, "id" | "createdAt" | "updatedAt"> = {
      src: body.src || "",
      alt: body.alt || body.nom || "",
      prix: body.prix || 0,
      nom: body.nom || "",
      categorie: body.categorie || "",
      dateAjout: body.dateAjout || new Date().toISOString(),
      description: body.description || "",
      description1: body.description1 || "",
      quantiteStock: body.quantiteStock || 0,
      promotion: body.promotion || null,
      prixPromo: body.prixPromo || null,
      images: body.images || [],
      colors: body.colors || [],
      sizes: body.sizes || [],
    };

    const productId = await productService.createProduct(productData);
    return NextResponse.json({ success: true, productId });
  } catch (error) {
    console.error("Erreur lors de la création du produit:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Erreur inconnue" 
      },
      { status: 500 }
    );
  }
}

