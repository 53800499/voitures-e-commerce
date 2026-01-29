"use client";

import React from "react";
import Typography from "@/ui/designSystem/typography/typography";
import { FiCheck } from "react-icons/fi";
import { wording } from "@/utils/wording";

interface AuthBenefitsProps {
  title: string;
  description: string;
  benefits: readonly string[];
}

/**
 * Composant réutilisable pour afficher les avantages d'inscription/connexion
 * Suit le principe de responsabilité unique (SRP)
 */
export default function AuthBenefits({
  title,
  description,
  benefits,
}: AuthBenefitsProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
      <Typography variant="h2" theme="white" weight="bold" className="mb-4">
        {title}
      </Typography>
      <Typography variant="body-lg" theme="white" className="opacity-90 mb-6">
        {description}
      </Typography>
      <div className="space-y-3">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-6 h-6 bg-white/20 flex items-center justify-center">
              <FiCheck className="text-white" size={16} />
            </div>
            <Typography variant="body-base" theme="white" className="opacity-90">
              {benefit}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
}

