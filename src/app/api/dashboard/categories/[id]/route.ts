import { NextRequest, NextResponse } from "next/server";
import { CategoryService } from "@/services/dashboard/CategoryService";
import { CategoryDocument } from "@/services/dashboard/CategoryService";

// GET - Récupérer une catégorie par ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const categoryService = new CategoryService();
    const category = await categoryService.getCategoryById(resolvedParams.id);
    
    if (!category) {
      return NextResponse.json(
        { success: false, error: "Catégorie non trouvée" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, category });
  } catch (error) {
    console.error("Erreur lors de la récupération de la catégorie:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Erreur inconnue" 
      },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour une catégorie
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const body = await request.json();
    const categoryService = new CategoryService();
    
    // Préparer les données de mise à jour
    const updateData: Partial<CategoryDocument> = {};
    if (body.nom !== undefined) updateData.nom = body.nom;
    if (body.src !== undefined) updateData.src = body.src;
    if (body.alt !== undefined) updateData.alt = body.alt;
    if (body.description !== undefined) updateData.description = body.description;

    await categoryService.updateCategory(resolvedParams.id, updateData);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la catégorie:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Erreur inconnue" 
      },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer une catégorie
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const categoryService = new CategoryService();
    await categoryService.deleteCategory(resolvedParams.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la suppression de la catégorie:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Erreur inconnue" 
      },
      { status: 500 }
    );
  }
}

