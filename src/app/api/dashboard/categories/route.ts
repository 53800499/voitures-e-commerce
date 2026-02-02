import { NextRequest, NextResponse } from "next/server";
import { CategoryService } from "@/services/dashboard/CategoryService";
import { CategoryDocument } from "@/services/dashboard/CategoryService";

// GET - Récupérer toutes les catégories
export async function GET() {
  try {
    const categoryService = new CategoryService();
    const categories = await categoryService.getAllCategories();
    return NextResponse.json({ success: true, categories });
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Erreur inconnue" 
      },
      { status: 500 }
    );
  }
}

// POST - Créer une catégorie
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const categoryService = new CategoryService();
    
    // Préparer les données de la catégorie
    const categoryData: Omit<CategoryDocument, "id" | "createdAt" | "updatedAt"> = {
      nom: body.nom || "",
      src: body.src || "",
      alt: body.alt || body.nom || "",
      description: body.description || "",
    };

    const categoryId = await categoryService.createCategory(categoryData);
    return NextResponse.json({ success: true, categoryId });
  } catch (error) {
    console.error("Erreur lors de la création de la catégorie:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Erreur inconnue" 
      },
      { status: 500 }
    );
  }
}

