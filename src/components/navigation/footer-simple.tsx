"use client";

import React, { useState } from "react";
import Container from "@/components/container/container";
import Link from "next/link";
import { wording } from "@/utils/wording";
import { FiMail, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";

export default function FooterSimple() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implémenter la logique d'abonnement
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Effets de fond */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
      </div>

      <Container className="relative z-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Colonne 1: À propos */}
          <div className="flex flex-col space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                {wording.metadata.siteName}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {wording.footer.guaranteeDescription}
              </p>
            </div>
            {/* Réseaux sociaux */}
            <div className="flex gap-3">
              <a
                href="#"
                className="group w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-blue-600 hover:border-blue-600 hover:scale-110 text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
              >
                <FiFacebook size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                className="group w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-blue-600 hover:border-blue-600 hover:scale-110 text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
              >
                <FiTwitter size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                className="group w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-blue-600 hover:border-blue-600 hover:scale-110 text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
              >
                <FiInstagram size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                className="group w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-blue-600 hover:border-blue-600 hover:scale-110 text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
              >
                <FiLinkedin size={20} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Colonne 2: Liens rapides */}
          <div className="min-w-[150px]">
            <h5 className="text-lg font-bold text-white mb-5">
              {wording.footer.links.quickLinks}
            </h5>
            <div className="space-y-2">
              <Link
                href="/"
                className="text-gray-300 hover:text-blue-400 transition-all duration-300 hover:translate-x-1 inline-block"
              >
                {wording.navigation.home}
              </Link>
              <br />
              <Link
                href="/shop"
                className="text-gray-300 hover:text-blue-400 transition-all duration-300 hover:translate-x-1 inline-block"
              >
                {wording.navigation.shop}
              </Link>
              <br />
              <Link
                href="/about"
                className="text-gray-300 hover:text-blue-400 transition-all duration-300 hover:translate-x-1 inline-block"
              >
                {wording.navigation.about}
              </Link>
              <br />
              <Link
                href="/contact"
                className="text-gray-300 hover:text-blue-400 transition-all duration-300 hover:translate-x-1 inline-block"
              >
                {wording.navigation.contact}
              </Link>
            </div>
          </div>

          {/* Colonne 3: Service client */}
          <div className="min-w-[150px]">
            <h5 className="text-lg font-bold text-white mb-5">
              {wording.footer.links.customerService}
            </h5>
            <div className="space-y-2">
              <Link
                href="/track-order"
                className="text-gray-300 hover:text-blue-400 transition-all duration-300 hover:translate-x-1 inline-block"
              >
                {wording.navigation.trackOrder}
              </Link>
            </div>
          </div>

          {/* Colonne Newsletter */}
          <div className="flex flex-col space-y-5">
            <div>
              <h5 className="text-lg font-bold text-white mb-3">
                {wording.footer.newsletter.title}
              </h5>
              <p className="text-gray-300 leading-relaxed">
                {wording.footer.newsletter.description}
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="relative group">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={wording.footer.newsletter.emailPlaceholder}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] transform"
              >
                {wording.footer.newsletter.subscribe}
              </button>
            </form>
            <p className="text-gray-400 text-xs">
              {wording.footer.newsletter.privacy}
            </p>
          </div>
        </div>

        {/* Séparateur avec effet */}
        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-gray-900 px-4 text-gray-400 text-sm">
              {wording.metadata.siteName}
            </span>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-400 text-center md:text-left text-sm">
            {wording.footer.copyright} {currentYear} {wording.metadata.siteName}. {wording.footer.allRightsReserved}
          </p>
        </div>
      </Container>
    </footer>
  );
}

