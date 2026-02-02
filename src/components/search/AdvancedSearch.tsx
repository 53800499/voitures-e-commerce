"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaSearch, FaTimes } from "react-icons/fa";
import { mockProducts } from "@/data/mockProducts";
import Typography from "@/ui/designSystem/typography/typography";
// Fonction locale de formatage des prix
const formatPriceLocal = (price: number): string => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price);
};

interface AdvancedSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdvancedSearch({ isOpen, onClose }: AdvancedSearchProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Recherche dans les produits avec useMemo
  const results = React.useMemo(() => {
    const query = searchQuery.trim();
    
    if (!query) {
      return [];
    }

    const lowerQuery = query.toLowerCase();
    
    // Recherche dans nom, description, catégorie
    const filtered = mockProducts.filter((product) => {
      const nomMatch = product.nom.toLowerCase().includes(lowerQuery);
      const descMatch = product.description?.toLowerCase().includes(lowerQuery);
      const desc1Match = product.description1?.toLowerCase().includes(lowerQuery);
      const categorieMatch = product.categorie.toLowerCase().includes(lowerQuery);
      
      return nomMatch || descMatch || desc1Match || categorieMatch;
    });

    // Limiter à 8 résultats
    return filtered.slice(0, 8);
  }, [searchQuery]);

  // Gérer le loading avec un délai
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
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Focus sur l'input quand on ouvre
      setTimeout(() => inputRef.current?.focus(), 100);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleProductClick = (productId: string) => {
    router.push(`/shop/${productId}`);
    onClose();
    setSearchQuery("");
  };

  const handleViewAll = () => {
    router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
    onClose();
    setSearchQuery("");
  };

  if (!isOpen) return null;

  return (
    <div className="max-w-3xl absolute top- right-0 bg-white shadow-lg border-t border-gray-200 z-50 animate-slide-up">
      <div className="mx-auto px-6">
        <div ref={searchRef}>
          {/* Barre de recherche */}
          <div className="flex items-center border-b border-gray-200 p-4">
            <FaSearch className="text-gray-400 mr-3" size={20} />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un produit..."
              className="grow text-gray-900 bg-transparent outline-none text-lg"
            />
            <button
              onClick={onClose}
              className="ml-3 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Fermer"
              title="Fermer">
              <FaTimes size={20} />
            </button>
          </div>

          {/* Résultats */}
          <div className="max-h-96 overflow-y-auto">
            {isLoading ?
              <div className="p-8 text-center">
                <Typography variant="body-base" theme="gray">
                  Recherche en cours...
                </Typography>
              </div>
            : searchQuery.trim() && results.length === 0 ?
              <div className="p-8 text-center">
                <Typography variant="body-base" theme="gray">
                  Aucun produit trouvé pour &quot;{searchQuery}&quot;
                </Typography>
              </div>
            : results.length > 0 ?
              <>
                <div className="divide-y divide-gray-200">
                  {results.map((product) => {
                    const price =
                      product.promotion ?
                        Number(product.promotion)
                      : product.prix;
                    return (
                      <button
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left">
                        <div className="relative w-16 h-16 overflow-hidden bg-gray-100 shrink-0">
                          <Image
                            src={product.src || "/assets/images.jpg"}
                            alt={product.alt || product.nom}
                            width={100}
                            height={100}
                            quality={100}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Typography
                            variant="body-base"
                            theme="black"
                            weight="bold"
                            className="mb-1 truncate">
                            {product.nom}
                          </Typography>
                          <Typography
                            variant="caption2"
                            theme="gray"
                            className="mb-1">
                            {product.categorie}
                          </Typography>
                          <Typography
                            variant="body-base"
                            theme="primary"
                            weight="bold">
                            {formatPriceLocal(price)}
                          </Typography>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {results.length >= 8 && (
                  <div className="p-4 border-t border-gray-200">
                    <button
                      onClick={handleViewAll}
                      className="w-full text-center text-primary hover:underline">
                      <Typography
                        variant="body-base"
                        theme="primary"
                        weight="medium">
                        Voir tous les résultats (
                        {
                          mockProducts.filter(
                            (p) =>
                              p.nom
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase()) ||
                              p.description
                                ?.toLowerCase()
                                .includes(searchQuery.toLowerCase()) ||
                              p.categorie
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase())
                          ).length
                        }
                        )
                      </Typography>
                    </button>
                  </div>
                )}
              </>
            : <div className="p-8 text-center">
                <Typography variant="body-base" theme="gray">
                  Commencez à taper pour rechercher...
                </Typography>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

