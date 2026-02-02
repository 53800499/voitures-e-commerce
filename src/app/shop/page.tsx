"use client";

import { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { wording } from "@/utils/wording";
import Container from "@/components/container/container";
import ProductCard from "@/components/products/ProductCard";
import Typography from "@/ui/designSystem/typography/typography";
import { useProducts } from "@/hooks/useProducts";
import { ProduitType } from "@/types/produitType";
import SlideUp from "@/components/animations/SlideUp";
import FadeIn from "@/components/animations/FadeIn";
import StaggerContainer from "@/components/animations/StaggerContainer";
import StaggerItem from "@/components/animations/StaggerItem";
import { FiSearch, FiX, FiGrid, FiList, FiFilter, FiSliders } from "react-icons/fi";
import Button from "@/ui/designSystem/button/button";

function ShopPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [showPromotionsOnly, setShowPromotionsOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const { products, isLoading, error } = useProducts();

  // Calculer les prix min et max des produits
  const priceRangeData = useMemo(() => {
    if (products.length === 0) return { min: 0, max: 100000 };
    const prices = products.map(p => p.promotion ? Number(p.promotion) : p.prix);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices))
    };
  }, [products]);

  // Initialiser la plage de prix
  useEffect(() => {
    if (priceRangeData.max > 0) {
      setPriceRange([priceRangeData.min, priceRangeData.max]);
    }
  }, [priceRangeData]);

  // Gérer la recherche avec debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearchQuery !== searchQuery) {
        const params = new URLSearchParams(searchParams.toString());
        if (localSearchQuery.trim()) {
          params.set("search", localSearchQuery.trim());
        } else {
          params.delete("search");
        }
        router.push(`/shop?${params.toString()}`);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearchQuery, searchQuery, router, searchParams]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered: ProduitType[] = products;

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

    // Filtre par prix
    filtered = filtered.filter((product) => {
      const price = product.promotion ? Number(product.promotion) : product.prix;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Filtre promotions uniquement
    if (showPromotionsOnly) {
      filtered = filtered.filter((product) => !!product.promotion);
    }

    // Filtre en stock uniquement
    if (inStockOnly) {
      filtered = filtered.filter((product) => 
        product.quantiteStock === undefined || product.quantiteStock > 0
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
  }, [selectedCategory, sortBy, searchQuery, products, priceRange, showPromotionsOnly, inStockOnly]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== "all") count++;
    if (priceRange[0] !== priceRangeData.min || priceRange[1] !== priceRangeData.max) count++;
    if (showPromotionsOnly) count++;
    if (inStockOnly) count++;
    if (searchQuery.trim()) count++;
    return count;
  }, [selectedCategory, priceRange, priceRangeData, showPromotionsOnly, inStockOnly, searchQuery]);

  const resetFilters = () => {
    setLocalSearchQuery("");
    setSelectedCategory("all");
    setPriceRange([priceRangeData.min, priceRangeData.max]);
    setShowPromotionsOnly(false);
    setInStockOnly(false);
    setSortBy("name");
    router.push("/shop");
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-6 md:py-8 lg:py-12">
      <Container>
        {/* En-tête avec recherche */}
        <SlideUp>
          <div className="mb-6 md:mb-8">
            <Typography variant="h1" theme="black" weight="bold" className="mb-4 text-2xl md:text-3xl lg:text-4xl">
              {wording.shop.title}
            </Typography>
            <Typography variant="body-lg" theme="gray" className="mb-6 text-sm md:text-base">
              {wording.shop.description}
            </Typography>

            {/* Barre de recherche */}
            <div className="relative max-w-2xl">
              <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center text-gray-400">
                <FiSearch size={20} />
              </div>
              <input
                type="text"
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                placeholder="Rechercher un produit..."
                className="w-full pl-12 pr-10 py-3 md:py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white text-sm md:text-base"
              />
              {localSearchQuery && (
                <button
                  onClick={() => setLocalSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Effacer la recherche"
                >
                  <FiX size={18} />
                </button>
              )}
            </div>
          </div>
        </SlideUp>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <SlideUp delay={0.2}>
              <div className="bg-white p-4 md:p-6 shadow-lg rounded-xl sticky top-4">
                {/* En-tête des filtres */}
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <div className="flex items-center gap-2">
                    <FiSliders className="text-primary text-lg md:text-xl" />
                    <Typography variant="h4" theme="black" weight="bold" className="text-lg md:text-xl">
                      {wording.shop.filters}
                    </Typography>
                    {activeFiltersCount > 0 && (
                      <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                        {activeFiltersCount}
                      </span>
                    )}
                  </div>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={resetFilters}
                      className="text-primary hover:text-primary-600 text-sm font-medium transition-colors"
                      aria-label="Réinitialiser les filtres"
                    >
                      Réinitialiser
                    </button>
                  )}
                </div>

                <div className="space-y-4 md:space-y-6">
                  {/* Catégorie */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      {wording.shop.category}
                    </label>
                    <select
                      className="w-full p-2 md:p-3 border-2 border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white"
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

                  {/* Plage de prix */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Prix : {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min={priceRangeData.min}
                        max={priceRangeData.max}
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <input
                        type="range"
                        min={priceRangeData.min}
                        max={priceRangeData.max}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>{formatPrice(priceRangeData.min)}</span>
                        <span>{formatPrice(priceRangeData.max)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Filtres checkbox */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={showPromotionsOnly}
                        onChange={(e) => setShowPromotionsOnly(e.target.checked)}
                        className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
                      />
                      <span className="text-sm md:text-base text-gray-700 group-hover:text-gray-900 transition-colors">
                        Promotions uniquement
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => setInStockOnly(e.target.checked)}
                        className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
                      />
                      <span className="text-sm md:text-base text-gray-700 group-hover:text-gray-900 transition-colors">
                        En stock uniquement
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </SlideUp>
          </aside>

          {/* Products Grid */}
          <main className="lg:col-span-3">
            {/* Barre d'outils */}
            <FadeIn delay={0.3}>
              <div className="bg-white p-4 md:p-6 rounded-xl shadow-md mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <Typography variant="body-base" theme="black" weight="bold" className="text-sm md:text-base">
                      {filteredAndSortedProducts.length} {wording.shop.product.toLowerCase()}
                      {filteredAndSortedProducts.length > 1 ? "s" : ""} trouvé
                      {filteredAndSortedProducts.length > 1 ? "s" : ""}
                    </Typography>
                    {activeFiltersCount > 0 && (
                      <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {activeFiltersCount} filtre{activeFiltersCount > 1 ? "s" : ""} actif{activeFiltersCount > 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    {/* Mode de vue */}
                    <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded transition-colors ${
                          viewMode === "grid"
                            ? "bg-white text-primary shadow-sm"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                        aria-label="Vue grille"
                      >
                        <FiGrid size={18} />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 rounded transition-colors ${
                          viewMode === "list"
                            ? "bg-white text-primary shadow-sm"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                        aria-label="Vue liste"
                      >
                        <FiList size={18} />
                      </button>
                    </div>

                    {/* Tri */}
                    <select
                      className="flex-1 sm:flex-none p-2 md:p-3 border-2 border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm md:text-base bg-white"
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
                </div>
              </div>
            </FadeIn>

            {/* Liste des produits */}
            {isLoading ? (
              <FadeIn>
                <div className="text-center py-12 md:py-16">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
                  <Typography variant="h4" theme="gray" className="mb-4">
                    Chargement des produits...
                  </Typography>
                </div>
              </FadeIn>
            ) : error ? (
              <FadeIn>
                <div className="text-center py-12 md:py-16 bg-red-50 rounded-xl p-8">
                  <Typography variant="h4" theme="red" weight="bold" className="mb-4">
                    Erreur lors du chargement des produits
                  </Typography>
                  <Typography variant="body-base" theme="gray">
                    Veuillez réessayer plus tard.
                  </Typography>
                </div>
              </FadeIn>
            ) : filteredAndSortedProducts.length === 0 ? (
              <FadeIn>
                <div className="text-center py-12 md:py-16 bg-white rounded-xl shadow-md">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiSearch className="text-gray-400 text-2xl" />
                  </div>
                  <Typography variant="h4" theme="black" weight="bold" className="mb-2">
                    {wording.shop.noProducts}
                  </Typography>
                  <Typography variant="body-base" theme="gray" className="mb-6">
                    Essayez de modifier vos filtres de recherche
                  </Typography>
                  {activeFiltersCount > 0 && (
                    <Button variant="accent" size="medium" action={resetFilters}>
                      Réinitialiser les filtres
                    </Button>
                  )}
                </div>
              </FadeIn>
            ) : (
              <StaggerContainer>
                <div className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6"
                    : "space-y-4 md:space-y-6"
                }>
                  {filteredAndSortedProducts.map((product, index) => (
                    <StaggerItem key={product.id}>
                      <ProductCard product={product} rating={4.5} />
                    </StaggerItem>
                  ))}
                </div>
              </StaggerContainer>
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
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
            <Typography variant="h1" theme="black" weight="bold" className="mb-4">
              Chargement...
            </Typography>
          </div>
        </Container>
      </div>
    }>
      <ShopPageContent />
    </Suspense>
  );
}
