"use client";

import React from "react";
import NavigationSimple from "../navigation/navigation-simple";
import FooterSimple from "../navigation/footer-simple";
import { CartProvider } from "@/context/cartContext";
import AuthUserProvider from "@/context/AuthUserContext";
import { NotificationProvider } from "@/components/notifications/NotificationProvider";

interface Props {
  children: React.ReactNode;
}

export default function LayoutSimple({ children }: Props) {
  return (
    <AuthUserProvider>
      <CartProvider>
        <NotificationProvider>
          <NavigationSimple />
          {children}  
          <FooterSimple />
        </NotificationProvider>
      </CartProvider>
    </AuthUserProvider>
  );
}

