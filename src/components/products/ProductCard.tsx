"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiHeart, FiShoppingCart, FiEye } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useCart } from "@/context/cartContext";
import { ProduitType } from "@/types/produitType";
import Typography from "@/ui/designSystem/typography/typography";

interface ProductCardProps {
  product: ProduitType;
  rating?: number;
}

/**
 * Composant ProductCard - Suit le principe de responsabilité unique (SRP)
 * Responsable uniquement de l'affichage d'une carte produit moderne
 */
export default function ProductCard({
  product,
  rating = 0,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const price = product.promotion ? Number(product.promotion) : product.prix;
  const originalPrice = product.promotion ? product.prix : undefined;
  const isPromo = !!product.promotion;
  const discountPercentage = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      src: product.src,
      alt: product.alt,
      nom: product.nom,
      prix: product.prix,
      promotion: product.promotion,
      quantity: 1,
      selectedColor: product.selectedColor,
      selectedSize: product.selectedSize,
    });
  };

  return (
    <div
      className="bg-white shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge Promo */}
      {isPromo && (
        <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-3 py-1 text-sm font-bold shadow-lg">
          -{discountPercentage}%
        </div>
      )}

      {/* Bouton favori */}
      <button
        onClick={handleFavoriteClick}
        className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-all duration-300 hover:scale-110"
        aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      >
        {isFavorite ? (
          <FaHeart className="text-red-500 text-xl" />
        ) : (
          <FiHeart className="text-gray-600 text-xl" />
        )}
      </button>

      {/* Image du produit */}
      <Link href={`/shop/${product.id}`} className="block relative">
        <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          <Image
            src={product.src || "/assets/images.jpg"}
            alt={product.alt || product.nom}
            width={500}
            height={500}
            quality={100}
            className="object-cover group-hover:scale-110 transition-transform duration-500 w-full h-full"
          />
          
          {/* Overlay avec actions au survol */}
          <div
            className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-4 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = `/shop/${product.id}`;
              }}
              className="w-12 h-12 bg-white flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg"
              aria-label="Voir le produit"
              title="Voir le produit"
            >
              <FiEye className="text-xl" />
            </button>
            <button
              className="w-12 h-12 bg-white flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg"
              aria-label="Ajouter au panier"
              title="Ajouter au panier"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToCart(e);
              }}
            >
              <FiShoppingCart className="text-xl" />
            </button>
          </div>
        </div>
      </Link>

      {/* Contenu */}
      <div className="p-5">
        {/* Catégorie */}
        <Typography variant="caption4" theme="primary" weight="medium">
          {product.categorie}
        </Typography>

        {/* Nom du produit */}
        <Link href={`/shop/${product.id}`}>
          <Typography
            variant="h5"
            theme="black"
            weight="bold"
            component="h3"
            className="mb-2 group-hover:text-primary transition-colors line-clamp-2"
          >
            {product.nom}
          </Typography>
        </Link>

        {/* Rating (si disponible) */}
        {rating > 0 && (
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-sm ${
                  i < rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
            <span className="text-xs text-gray-500 ml-1">({rating})</span>
          </div>
        )}

        {/* Prix */}
        <div className="flex items-baseline gap-2 mb-4">
          {isPromo && originalPrice && (
            <Typography variant="body-sm" theme="gray" className="line-through">
              {formatPrice(originalPrice)}
            </Typography>
          )}
          <Typography variant="h4" theme="primary" weight="bold">
            {formatPrice(price)}
          </Typography>
        </div>

        {/* Bouton d'action rapide */}
        {/* <Button
          variant="accent"
          size="medium"
          fullwidth
          action={handleAddToCart}
          className="mt-2"
        >
          Ajouter au panier
        </Button> */}
      </div>
    </div>
  );
}

