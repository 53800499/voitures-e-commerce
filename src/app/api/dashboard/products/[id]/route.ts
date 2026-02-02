import { NextRequest, NextResponse } from "next/server";
import { ProductService } from "@/services/dashboard/ProductService";
import { ProductDocument } from "@/services/dashboard/ProductService";

// GET - Récupérer un produit par ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const productService = new ProductService();
    const product = await productService.getProductById(resolvedParams.id);
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: "Produit non trouvé" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("Erreur lors de la récupération du produit:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Erreur inconnue" 
      },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour un produit
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const body = await request.json();
    const productService = new ProductService();
    
    // Préparer les données de mise à jour
    const updateData: Partial<ProductDocument> = {};
    if (body.src !== undefined) updateData.src = body.src;
    if (body.alt !== undefined) updateData.alt = body.alt;
    if (body.prix !== undefined) updateData.prix = body.prix;
    if (body.nom !== undefined) updateData.nom = body.nom;
    if (body.categorie !== undefined) updateData.categorie = body.categorie;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.description1 !== undefined) updateData.description1 = body.description1;
    if (body.quantiteStock !== undefined) updateData.quantiteStock = body.quantiteStock;
    if (body.promotion !== undefined) updateData.promotion = body.promotion;
    if (body.prixPromo !== undefined) updateData.prixPromo = body.prixPromo;
    if (body.images !== undefined) updateData.images = body.images;
    if (body.colors !== undefined) updateData.colors = body.colors;
    if (body.sizes !== undefined) updateData.sizes = body.sizes;

    await productService.updateProduct(resolvedParams.id, updateData);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du produit:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Erreur inconnue" 
      },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un produit
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const productService = new ProductService();
    await productService.deleteProduct(resolvedParams.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la suppression du produit:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Erreur inconnue" 
      },
      { status: 500 }
    );
  }
}

