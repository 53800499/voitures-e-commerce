"use client";

import React, { useState, useEffect, useCallback } from "react";
import Container from "@/components/container/container";
import { wording } from "@/utils/wording";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

/**
 * Composant HomeCarousel - Suit le principe de responsabilité unique (SRP)
 * Responsable uniquement de l'affichage du carrousel de la page d'accueil
 */
export default function HomeCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = wording.carousel.slides;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false); // Arrêter l'auto-play quand l'utilisateur clique manuellement
  };

  // Auto-play avec défilement automatique toutes les 5 secondes
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide, isAutoPlaying]);

  // Reprendre l'auto-play après 10 secondes d'inactivité
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);

    return () => clearTimeout(timeout);
  }, [currentSlide]);

  return (
    <section className="relative bg-black text-white overflow-hidden min-h-[500px] md:min-h-[600px]">
      {/* Fond avec texture horizontale */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.02) 1px, rgba(255,255,255,0.02) 2px)'
            }}
          />
        </div>
      </div>

      {/* Image de voiture en arrière-plan - positionnée en bas */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 right-0 h-2/3 flex items-end justify-start pl-8 md:pl-16">
          {/* Placeholder pour l'image de voiture - à remplacer par une vraie image */}
          <div className="relative w-3/4 md:w-2/3 h-full max-h-[400px]">
            {/* Forme de voiture stylisée */}
            <div className="absolute bottom-0 left-0 w-full h-3/4 bg-gradient-to-t from-gray-900 via-gray-800 to-transparent opacity-60">
              {/* Roue avant */}
              <div className="absolute bottom-0 left-8 w-16 h-16 bg-gray-700 opacity-50"></div>
              {/* Phare avant */}
              <div className="absolute bottom-12 left-4 w-8 h-4 bg-gray-600 rounded opacity-40"></div>
            </div>
            {/* Lueur rouge (feu arrière) */}
            <div className="absolute bottom-8 right-8 w-4 h-12 bg-red-500 opacity-70 blur-sm"></div>
          </div>
        </div>
      </div>

      <Container className="relative z-10 py-16 md:py-24">
        <div className="relative min-h-[400px] flex items-center overflow-hidden">
          {/* Flèche gauche */}
          <button
            onClick={() => {
              prevSlide();
              setIsAutoPlaying(false);
            }}
            className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white hover:opacity-80 transition-opacity"
            aria-label="Slide précédent"
          >
            <FaChevronLeft className="text-2xl md:text-3xl" />
          </button>

          {/* Conteneur des slides avec transition */}
          <div className="relative w-full overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className="min-w-full flex-shrink-0 px-12 md:px-20"
                >
                  <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
                    {/* Titre principal (blanc, grand) */}
                    <h2 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                      {slide.tagline}
                    </h2>

                    {/* Texte de garantie (vert) */}
                    <div className="space-y-2 md:space-y-3 text-green-400 md:text-green-500 text-base md:text-lg lg:text-xl">
                      <p className="font-medium">{slide.guarantee}</p>
                      <div className="space-y-1 md:space-y-2">
                        <p>{slide.guaranteeLine1}</p>
                        <p>{slide.guaranteeLine2}</p>
                        <p className="font-semibold">{slide.guaranteeLine3}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Flèche droite */}
          <button
            onClick={() => {
              nextSlide();
              setIsAutoPlaying(false);
            }}
            className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white hover:opacity-80 transition-opacity"
            aria-label="Slide suivant"
          >
            <FaChevronRight className="text-2xl md:text-3xl" />
          </button>
        </div>

        {/* Indicateurs de slides */}
        {slides.length > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`h-2 transition-all duration-300 ${
                  currentSlide === index
                    ? "bg-white w-8"
                    : "bg-white/30 hover:bg-white/50 w-2"
                }`}
                aria-label={`Aller à la slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

