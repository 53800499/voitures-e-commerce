"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { wording } from "@/utils/wording";
import Container from "@/components/container/container";
import ProductCard from "@/components/products/ProductCard";
import Typography from "@/ui/designSystem/typography/typography";
import { mockProducts } from "@/data/mockProducts";
import { ProduitType } from "@/types/produitType";

function ShopPageContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");

  const filteredAndSortedProducts = useMemo(() => {
    let filtered: ProduitType[] = mockProducts;

    // Filtre par recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((product) => {
        const nomMatch = product.nom.toLowerCase().includes(query);
        const descMatch = product.description?.toLowerCase().includes(query);
        const desc1Match = product.description1?.toLowerCase().includes(query);
        const categorieMatch = product.categorie.toLowerCase().includes(query);
        return nomMatch || descMatch || desc1Match || categorieMatch;
      });
    }

    // Filtre par catégorie
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.categorie.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Tri
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "priceAsc":
          return (a.promotion ? Number(a.promotion) : a.prix) - (b.promotion ? Number(b.promotion) : b.prix);
        case "priceDesc":
          return (b.promotion ? Number(b.promotion) : b.prix) - (a.promotion ? Number(a.promotion) : a.prix);
        case "nameAZ":
          return a.nom.localeCompare(b.nom);
        default:
          return 0;
      }
    });

    return sorted;
  }, [selectedCategory, sortBy, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <div className="mb-8">
          <Typography variant="h1" theme="black" weight="bold" className="mb-4">
            {wording.shop.title}
          </Typography>
          <Typography variant="body-lg" theme="gray">
            {wording.shop.description}
          </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <div className="bg-white p-6 shadow-md">
              <Typography variant="h4" theme="black" weight="bold" className="mb-4">
                {wording.shop.filters}
              </Typography>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    {wording.shop.category}
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 text-gray-900"
                    aria-label={wording.shop.category}
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="all">{wording.shop.allCategories}</option>
                    <option value="aixam">{wording.home.categories.aixam.name}</option>
                    <option value="ligier">{wording.home.categories.ligier.name}</option>
                    <option value="chatenet">{wording.home.categories.chatenet.name}</option>
                    <option value="casalini">{wording.home.categories.casalini.name}</option>
                  </select>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <Typography variant="body-base" theme="black">
                {filteredAndSortedProducts.length} {wording.shop.product.toLowerCase()}
                {filteredAndSortedProducts.length > 1 ? "s" : ""} trouvé
                {filteredAndSortedProducts.length > 1 ? "s" : ""}
              </Typography>
              <select
                className="p-2 border border-gray-300 text-gray-900"
                aria-label={wording.shop.sortBy}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">{wording.shop.sortBy}</option>
                <option value="priceAsc">{wording.shop.sortOptions.priceAsc}</option>
                <option value="priceDesc">{wording.shop.sortOptions.priceDesc}</option>
                <option value="nameAZ">{wording.shop.sortOptions.nameAZ}</option>
              </select>
            </div>

            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <Typography variant="h4" theme="gray" className="mb-4">
                  {wording.shop.noProducts}
                </Typography>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} rating={4.5} />
                ))}
              </div>
            )}
          </main>
        </div>
      </Container>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 py-12">
        <Container>
          <Typography variant="h1" theme="black" weight="bold" className="mb-4">
            Chargement...
          </Typography>
        </Container>
      </div>
    }>
      <ShopPageContent />
    </Suspense>
  );
}

