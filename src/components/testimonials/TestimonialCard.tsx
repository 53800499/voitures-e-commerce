"use client";

import React from "react";
import Typography from "@/ui/designSystem/typography/typography";
import Avatar from "@/ui/designSystem/avatar/avatar";
import { FaStar } from "react-icons/fa";

interface TestimonialCardProps {
  text: string;
  author: string;
  rating?: number;
  avatar?: string;
}

/**
 * Composant TestimonialCard - Suit le principe de responsabilité unique (SRP)
 * Responsable uniquement de l'affichage d'un témoignage moderne
 */
export default function TestimonialCard({
  text,
  author,
  rating = 5,
  avatar,
}: TestimonialCardProps) {
  return (
    <div className="bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group relative overflow-hidden">
      {/* Effet de fond décoratif */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
      
      {/* Quote icon */}
      <div className="absolute top-6 left-6 text-primary-100 text-6xl font-bold opacity-20">
        "
      </div>

      <div className="relative z-10">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`text-sm ${
                i < rating ? "text-yellow-400" : "text-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Texte du témoignage */}
        <Typography
          variant="body-base"
          theme="black"
          weight="regular"
          className="text-gray-700 italic mb-6 leading-relaxed"
        >
          "{text}"
        </Typography>

        {/* Auteur */}
        <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
            {avatar ? (
              <Avatar src={avatar} alt={author} size="small" />
            ) : (
              <span>{author.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div>
            <Typography
              variant="body-base"
              theme="black"
              weight="bold"
              component="p"
            >
              {author}
            </Typography>
            <Typography
              variant="caption2"
              theme="gray"
              weight="regular"
              component="p"
            >
              Client vérifié
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

