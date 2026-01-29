"use client";

import React from "react";
import { IconType } from "react-icons";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: IconType;
  iconColor?: string;
}

/**
 * Composant FeatureCard - Suit le principe de responsabilité unique (SRP)
 * Responsable uniquement de l'affichage d'une carte de fonctionnalité
 */
export default function FeatureCard({
  title,
  description,
  icon: Icon,
  iconColor = "text-blue-600",
}: FeatureCardProps) {
  return (
    <div className="bg-white p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-1">
      {/* Icône avec fond coloré */}
      <div className="mb-4 flex justify-center">
        <div className={`w-16 h-16 bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`${iconColor} text-3xl`} />
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

