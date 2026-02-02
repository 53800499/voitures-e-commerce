"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaSearch, FaTimes } from "react-icons/fa";
import { mockProducts } from "@/data/mockProducts";
import Typography from "@/ui/designSystem/typography/typography";

const formatPriceLocal = (price: number): string => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price);
};

export default function SearchBar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Recherche dans les produits
  const results = React.useMemo(() => {
    const query = searchQuery.trim();
    
    if (!query) {
      return [];
    }

    const lowerQuery = query.toLowerCase();
    
    const filtered = mockProducts.filter((product) => {
      const nomMatch = product.nom.toLowerCase().includes(lowerQuery);
      const descMatch = product.description?.toLowerCase().includes(lowerQuery);
      const desc1Match = product.description1?.toLowerCase().includes(lowerQuery);
      const categorieMatch = product.categorie.toLowerCase().includes(lowerQuery);
      
      return nomMatch || descMatch || desc1Match || categorieMatch;
    });

    return filtered.slice(0, 8);
  }, [searchQuery]);

  // Gérer le loading
  useEffect(() => {
    if (searchQuery.trim()) {
      const timeoutId1 = setTimeout(() => {
        setIsLoading(true);
      }, 0);
      const timeoutId2 = setTimeout(() => {
        setIsLoading(false);
      }, 100);
      return () => {
        clearTimeout(timeoutId1);
        clearTimeout(timeoutId2);
      };
    } else {
      const timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery]);

  // Fermer quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleProductClick = (productId: string) => {
    router.push(`/shop/${productId}`);
    setIsOpen(false);
    setSearchQuery("");
  };

  const handleViewAll = () => {
    router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div ref={searchRef} className="relative w-full lg:w-80 mt-2">
      {/* Barre de recherche */}
      <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 hover:border-gray-300 transition-all duration-200 focus-within:bg-white focus-within:border-primary focus-within:shadow-md focus-within:ring-2 focus-within:ring-primary/20">
        <FaSearch className="text-gray-400 flex-shrink-0 group-hover:text-primary transition-colors" size={16} />
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Rechercher un produit..."
          className="flex-grow text-gray-700 bg-transparent outline-none text-sm placeholder:text-gray-500 font-medium"
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery("");
              inputRef.current?.focus();
            }}
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded transition-colors"
            aria-label="Effacer"
          >
            <FaTimes size={16} />
          </button>
        )}
      </div>

      {/* Dropdown des résultats */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white shadow-xl border border-gray-200 rounded-lg z-50 overflow-hidden">
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="flex justify-center mb-3">
                  <div className="animate-spin">
                    <FaSearch className="text-primary text-2xl" />
                  </div>
                </div>
                <Typography variant="body-base" theme="gray">
                  Recherche en cours...
                </Typography>
              </div>
            ) : searchQuery.trim() && results.length === 0 ? (
              <div className="p-8 text-center">
                <Typography variant="body-base" theme="gray" className="mb-1">
                  Aucun produit trouvé pour &quot;<span className="font-semibold text-gray-900">{searchQuery}</span>&quot;
                </Typography>
                <Typography variant="caption2" theme="gray">
                  Essayez avec d'autres mots-clés
                </Typography>
              </div>
            ) : results.length > 0 ? (
              <>
                <div className="divide-y divide-gray-100">
                  {results.map((product) => {
                    const price = product.promotion ? Number(product.promotion) : product.prix;
                    return (
                      <button
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-blue-50 transition-all duration-200 group text-left"
                      >
                        <div className="relative w-16 h-16 overflow-hidden bg-gray-100 rounded-md shrink-0 border border-gray-200 group-hover:border-primary transition-colors">
                          <Image
                            src={product.src || "/assets/images.jpg"}
                            alt={product.alt || product.nom}
                            width={80}
                            height={80}
                            quality={100}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Typography variant="body-base" theme="black" weight="bold" className="mb-1 truncate group-hover:text-primary transition-colors">
                            {product.nom}
                          </Typography>
                          <Typography variant="caption2" theme="gray" className="inline-block px-2 py-0.5 bg-gray-100 rounded text-xs mb-1">
                            {product.categorie}
                          </Typography>
                          <div className="flex items-baseline gap-2">
                            <Typography variant="body-base" theme="primary" weight="bold" className="text-sm">
                              {formatPriceLocal(price)}
                            </Typography>
                            {product.promotion && (
                              <Typography variant="caption2" theme="gray" className="line-through text-xs">
                                {formatPriceLocal(product.prix)}
                              </Typography>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {results.length >= 8 && (
                  <div className="p-3 border-t border-gray-100 bg-gray-50">
                    <button
                      onClick={handleViewAll}
                      className="w-full py-2 px-3 text-center text-primary hover:bg-primary hover:text-white rounded transition-all duration-200 font-medium text-sm"
                    >
                      Voir tous les résultats ({mockProducts.filter(p => 
                        p.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.categorie.toLowerCase().includes(searchQuery.toLowerCase())
                      ).length})
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="p-8 text-center">
                <div className="text-3xl mb-2">🔍</div>
                <Typography variant="body-base" theme="gray" className="font-medium text-sm">
                  Commencez à taper pour rechercher
                </Typography>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
