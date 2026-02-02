"use client";

import React from "react";
import { usePathname } from "next/navigation";
import NavigationSimple from "../navigation/navigation-simple";
import FooterSimple from "../navigation/footer-simple";
import { CartProvider } from "@/context/cartContext";
import AuthUserProvider from "@/context/AuthUserContext";
import { NotificationProvider } from "@/components/notifications/NotificationProvider";

interface Props {
  children: React.ReactNode;
}

export default function LayoutSimple({ children }: Props) {
  const pathname = usePathname();
  const isDashboardPage = pathname?.includes("/dashboard");

  return (
    <AuthUserProvider>
      <CartProvider>
        <NotificationProvider>
          {!isDashboardPage && <NavigationSimple />}
          {children}  
          {!isDashboardPage && <FooterSimple />}
        </NotificationProvider>
      </CartProvider>
    </AuthUserProvider>
  );
}

