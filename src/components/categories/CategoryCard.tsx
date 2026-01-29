"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  name: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  href?: string;
}

/**
 * Composant CategoryCard - Suit le principe de responsabilité unique (SRP)
 * Responsable uniquement de l'affichage d'une carte de catégorie
 */
export default function CategoryCard({
  name,
  description,
  imageUrl,
  imageAlt,
  href = "#",
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1 block"
    >
      {/* Image de la catégorie */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt || name}
            width={400}
            height={300}
            quality={100}
            className="object-cover group-hover:scale-110 transition-transform duration-300 w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
            <span className="text-4xl font-bold text-gray-400">{name.charAt(0)}</span>
          </div>
        )}
        {/* Overlay au survol */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* Contenu */}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </Link>
  );
}

