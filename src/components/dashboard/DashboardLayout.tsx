"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthUserContext";
import { isAdmin } from "@/utils/auth";
import { wording } from "@/utils/wording";
import Typography from "@/ui/designSystem/typography/typography";
import { 
  FiLayout, 
  FiPackage, 
  FiFolder, 
  FiShoppingBag, 
  FiLogOut, 
  FiMenu, 
  FiX,
  FiHome
} from "react-icons/fi";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { authUser } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  /* useEffect(() => {
    const checkAdmin = async () => {
      if (authUser) {
        const admin = await isAdmin(authUser);
        setIsAdminUser(admin);
        if (!admin) {
          router.push("/");
        }
      } else {
        router.push("/login");
      }
      setIsLoading(false);
    };
    checkAdmin();
  }, [authUser, router]); */

  const menuItems = [
    { href: "/dashboard", label: wording.dashboard.menu.dashboard, icon: FiLayout },
    { href: "/dashboard/products", label: wording.dashboard.menu.products, icon: FiPackage },
    { href: "/dashboard/categories", label: wording.dashboard.menu.categories, icon: FiFolder },
    { href: "/dashboard/orders", label: wording.dashboard.menu.orders, icon: FiShoppingBag },
  ];

  const handleLogout = async () => {
    // TODO: Implémenter la déconnexion
    router.push("/");
  };

  /* if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Typography variant="body-lg" theme="gray">Chargement...</Typography>
      </div>
    );
  }

  if (!isAdminUser) {
    return null;
  } */

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <Typography variant="h3" theme="black" weight="bold">
            {wording.dashboard.title}
          </Typography>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-600 hover:text-gray-900"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white border-r border-gray-200 min-h-screen sticky top-0">
          <div className="p-6 border-b border-gray-200">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <FiHome className="text-primary" size={20} />
              <Typography variant="body-sm" theme="gray">Retour au site</Typography>
            </Link>
            <Typography variant="h2" theme="black" weight="bold">
              {wording.dashboard.title}
            </Typography>
          </div>
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                        isActive
                          ? "bg-primary text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon size={20} />
                      <Typography variant="body-base" theme={isActive ? "white" : "black"}>
                        {item.label}
                      </Typography>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <FiLogOut size={20} />
              <Typography variant="body-base" theme="black">
                {wording.dashboard.menu.logout}
              </Typography>
            </button>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-xl">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <Typography variant="h3" theme="black" weight="bold">
                    {wording.dashboard.title}
                  </Typography>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-gray-600"
                  >
                    <FiX size={24} />
                  </button>
                </div>
                <Link href="/" className="flex items-center gap-2">
                  <FiHome className="text-primary" size={20} />
                  <Typography variant="body-sm" theme="gray">Retour au site</Typography>
                </Link>
              </div>
              <nav className="flex-1 p-4">
                <ul className="space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                            isActive
                              ? "bg-primary text-white"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          <Icon size={20} />
                          <Typography variant="body-base" theme={isActive ? "white" : "black"}>
                            {item.label}
                          </Typography>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <div className="p-4 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 w-full text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <FiLogOut size={20} />
                  <Typography variant="body-base" theme="black">
                    {wording.dashboard.menu.logout}
                  </Typography>
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          <div className="p-4 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

