/** @format */

"use client";

import React, { useState, useEffect, useRef } from "react";
import Container from "@/components/container/container";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { wording } from "@/utils/wording";
import { useCart } from "@/context/cartContext";
import { useAuth } from "@/context/AuthUserContext";
import { isAdmin } from "@/utils/auth";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FaBars, FaSearch, FaTimes } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import clsx from "clsx";
import AdvancedSearch from "@/components/search/AdvancedSearch";
import SearchBar from "../search/SearchBar";

interface NavigationLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

function NavigationLink({ href, children, className }: NavigationLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      prefetch={isActive ? false : undefined}
      className={clsx(
        className,
        isActive ? "text-primary font-medium" : "text-gray-900",
        "hover:text-primary transition-colors"
      )}>
      {children}
    </Link>
  );
}

export default function NavigationSimple() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const adminCheckRef = useRef<string | null>(null);
  const { getCartItemsCount } = useCart();
  const { authUser } = useAuth();
  const cartItemsCount = getCartItemsCount();

  // Vérifier le statut admin (mémorisé pour éviter les vérifications répétées)
  useEffect(() => {
    const userId = authUser?.uid || null;
    
    // Si l'utilisateur n'a pas changé, ne pas re-vérifier
    if (adminCheckRef.current === userId) {
      return;
    }

    const checkAdminStatus = async () => {
      if (authUser) {
        const admin = await isAdmin(authUser);
        setUserIsAdmin(admin);
        setCheckingAdmin(false);
        adminCheckRef.current = userId;
      } else {
        setCheckingAdmin(false);
        setUserIsAdmin(false);
        adminCheckRef.current = null;
      }
    };
    checkAdminStatus();
  }, [authUser]);

  // Fermer le menu utilisateur si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const handleSearchClick = () => {
    setIsAdvancedSearchOpen(true);
  };

  return (
    <>
      <nav className="bg-transparent lg:bg-white shadow sticky top-0 z-50">
        {" "}
        <Container>
          {/* Mobile-First: Header compact sur mobile */}
          <div className="flex items-center justify-between py-2 px-4 lg:py-3 lg:px-6">
            {/* Logo - Plus petit sur mobile */}
            <Link
              href="/"
              prefetch={undefined}
              className="flex items-center gap-1.5 lg:gap-2 transition-all duration-300">
              <div className="w-7 h-7 lg:w-9 lg:h-9 bg-primary flex items-center justify-center text-white font-bold text-xs lg:text-sm">
                AL
              </div>
              <span className="text-sm lg:text-lg font-bold text-gray-800">
                {wording.metadata.siteName}
              </span>
            </Link>

            {/* Actions - Toujours visibles */}
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Search Button - Mobile */}
              <button
                onClick={handleSearchClick}
                className="p-2 text-gray-600 hover:text-primary transition-colors lg:hidden"
                aria-label="Rechercher"
                title="Rechercher">
                <FaSearch size={18} />
              </button>

              {/* Cart - Toujours visible */}
              <Link
                href="/cart"
                prefetch={undefined}
                className="relative p-2 text-gray-600 hover:text-primary transition-colors"
                aria-label={wording.navigation.cart}
                title={wording.navigation.cart}>
                <HiOutlineShoppingCart size={20} className="lg:w-6 lg:h-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 lg:w-5 lg:h-5 bg-primary text-white text-[10px] lg:text-xs font-bold flex items-center justify-center">
                    {cartItemsCount > 99 ? "99+" : cartItemsCount}
                  </span>
                )}
              </Link>

              {/* User Menu - Mobile */}
              {authUser ?
                <div className="relative lg:hidden" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="p-2 text-gray-600 hover:text-primary transition-colors"
                    aria-label="Menu utilisateur">
                    <div className="relative">
                      <FiUser size={18} />
                      <span className="absolute top-0 right-0 w-1.5 h-1.5 lg:w-2 lg:h-2 bg-green-500 border border-white"></span>
                    </div>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 z-50 mt-2 w-48 bg-white border border-gray-200 shadow-lg">
                      <div className="px-3 py-2 border-b border-gray-200">
                        <p className="text-xs font-medium text-gray-900 truncate">
                          {authUser.prenom ||
                            authUser.email?.split("@")[0] ||
                            "Profil"}
                        </p>
                        <p className="text-[10px] text-gray-500 truncate">
                          {authUser.email}
                        </p>
                      </div>
                      <div className="py-1">
                        <Link
                          href="/profile"
                          prefetch={undefined}
                          className="block px-3 py-2 text-xs text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}>
                          {wording.navigation.profile}
                        </Link>
                        {!checkingAdmin && userIsAdmin && (
                          <Link
                            href="/dashboard"
                            prefetch={undefined}
                            className="block px-3 py-2 text-xs font-medium text-primary hover:bg-gray-100"
                            onClick={() => setIsUserMenuOpen(false)}>
                            {wording.navigation.adminDashboard}
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              : <Link
                  href="/login"
                  prefetch={undefined}
                  className="p-2 text-gray-600 hover:text-primary transition-colors lg:hidden"
                  aria-label={wording.navigation.login}>
                  <FiUser size={18} />
                </Link>
              }

              {/* User Menu - Desktop */}
              {authUser ?
                <div className="hidden lg:block relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-primary transition-colors"
                    aria-label="Menu utilisateur">
                    <div className="relative">
                      <FiUser size={20} />
                      <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 border-2 border-white"></span>
                    </div>
                    <span className="text-sm font-medium">
                      {authUser.prenom ||
                        authUser.email?.split("@")[0] ||
                        "Profil"}
                    </span>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 z-50 mt-2 w-56 bg-white border border-gray-200 shadow-lg">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">
                          {authUser.prenom ||
                            authUser.email?.split("@")[0] ||
                            "Profil"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {authUser.email}
                        </p>
                      </div>
                      <div className="py-1">
                        <Link
                          href="/profile"
                          prefetch={undefined}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}>
                          {wording.navigation.profile}
                        </Link>
                        {!checkingAdmin && userIsAdmin && (
                          <Link
                            href="/dashboard"
                            prefetch={undefined}
                            className="block px-4 py-2 text-sm font-medium text-primary hover:bg-gray-100"
                            onClick={() => setIsUserMenuOpen(false)}>
                            {wording.navigation.adminDashboard}
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              : <Link
                  href="/login"
                  prefetch={undefined}
                  className="hidden lg:flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-primary transition-colors">
                  <FiUser size={20} />
                  <span className="text-sm font-medium">
                    {wording.navigation.login}
                  </span>
                </Link>
              }

              {/* Menu Hamburger - Mobile uniquement */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-600 hover:text-primary transition-colors lg:hidden"
                aria-label="Toggle mobile menu">
                {isMobileMenuOpen ?
                  <FaTimes size={20} />
                : <FaBars size={20} />}
              </button>
            </div>
          </div>

          {/* Desktop Menu - Caché sur mobile */}
          <div className="hidden lg:flex items-center justify-between px-6 pb-2 border-t border-gray-300">
            <div className="flex items-center gap-6">
              <NavigationLink href="/" className="text-sm font-medium">
                {wording.navigation.home}
              </NavigationLink>
              <NavigationLink href="/shop" className="text-sm font-medium">
                {wording.navigation.shop}
              </NavigationLink>
              <NavigationLink
                href="/track-order"
                className="text-sm font-medium">
                {wording.navigation.trackOrder}
              </NavigationLink>
              <NavigationLink href="/about" className="text-sm font-medium">
                {wording.navigation.about}
              </NavigationLink>
              <NavigationLink href="/contact" className="text-sm font-medium">
                {wording.navigation.contact}
              </NavigationLink>
            </div>
            {/* Desktop Search Bar */}
            <SearchBar />
            {/* <form
              onSubmit={handleSearch}
              className="flex items-center px-3 py-2 my-2 bg-gray-100 border w-64">
              <input
                type="text"
                placeholder={wording.navigation.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchClick}
                className="grow text-sm text-gray-700 bg-transparent outline-none"
              />
              <button
                type="submit"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Rechercher"
                title="Rechercher">
                <FaSearch size={16} />
              </button>
            </form> */}
          </div>
        </Container>
        {/* Mobile Menu - Slide in depuis le haut */}
        <div
          className={clsx(
            "lg:hidden bg-white border-t border-gray-200 transition-all duration-300 ease-in-out overflow-hidden",
            isMobileMenuOpen ? "max-h-[calc(100vh-4rem)]" : "max-h-0"
          )}>
          <div className="px-4 py-3 space-y-1">
            <Link
              href="/"
              prefetch={undefined}
              className="block py-2.5 px-4 text-sm font-medium hover:bg-gray-50 transition-colors text-gray-900"
              onClick={() => setIsMobileMenuOpen(false)}>
              {wording.navigation.home}
            </Link>
            <Link
              href="/shop"
              prefetch={undefined}
              className="block py-2.5 px-4 text-sm font-medium hover:bg-gray-50 transition-colors text-gray-900"
              onClick={() => setIsMobileMenuOpen(false)}>
              {wording.navigation.shop}
            </Link>
            <Link
              href="/track-order"
              prefetch={undefined}
              className="block py-2.5 px-4 text-sm font-medium hover:bg-gray-50 transition-colors text-gray-900"
              onClick={() => setIsMobileMenuOpen(false)}>
              {wording.navigation.trackOrder}
            </Link>
            <Link
              href="/about"
              prefetch={undefined}
              className="block py-2.5 px-4 text-sm font-medium hover:bg-gray-50 transition-colors text-gray-900"
              onClick={() => setIsMobileMenuOpen(false)}>
              {wording.navigation.about}
            </Link>
            <Link
              href="/contact"
              prefetch={undefined}
              className="block py-2.5 px-4 text-sm font-medium hover:bg-gray-50 transition-colors text-gray-900"
              onClick={() => setIsMobileMenuOpen(false)}>
              {wording.navigation.contact}
            </Link>
            {authUser && (
              <>
                <div className="border-t border-gray-200 my-2"></div>
                <Link
                  href="/profile"
                  prefetch={undefined}
                  className="block py-2.5 px-4 text-sm font-medium hover:bg-gray-50 transition-colors text-gray-900"
                  onClick={() => setIsMobileMenuOpen(false)}>
                  {wording.navigation.profile}
                </Link>
                {!checkingAdmin && userIsAdmin && (
                  <Link
                    href="/dashboard"
                    prefetch={undefined}
                    className="block py-2.5 px-4 text-sm font-medium text-primary hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}>
                    {wording.navigation.adminDashboard}
                  </Link>
                )}
              </>
            )}
            {!authUser && (
              <>
                <div className="border-t border-gray-200 my-2"></div>
                <Link
                  href="/login"
                  prefetch={undefined}
                  className="block py-2.5 px-4 text-sm font-medium hover:bg-gray-50 transition-colors text-gray-900"
                  onClick={() => setIsMobileMenuOpen(false)}>
                  {wording.navigation.login}
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Recherche avancée */}
      <AdvancedSearch
        isOpen={isAdvancedSearchOpen}
        onClose={() => {
          setIsAdvancedSearchOpen(false);
        }}
      />
    </>
  );
}
