/** @format */

import React, { createContext, useContext, useState } from "react";

interface Context {
  children: React.ReactNode;
}

interface Product {
  id: number | string;
  src: string;
  alt: string;
  nom: string;
  prix: number;
  promotion?: string | number | null;
  date?: string;
  description?: string;
  size?: number | string | undefined;
  quantity: number | string;
  selectedColor?: string;
  selectedSize?: string | number;
  cartItemId?: string; // ID unique pour chaque item dans le panier
}

interface CartContextType {
  cart: Product[];
  lastAddedItem: Product | null;
  addToCart: (product: Product) => void;
  updateCartItem: (cartItemId: string, quantity: number) => void;
  removeCartItem: (cartItemId: string) => void;
  calculateTotalPrice: () => number;
  calculateTotalPromoPrice: () => number;
  calculateDiscountRate: () => number;
  getCartItemsCount: () => number;
  setNotificationHandler: (callback: (message: string, type?: "success" | "error" | "info" | "warning") => void) => void;
}

// Créez le contexte avec un type explicite ou undefined
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

// Fournisseur du contexte
export function CartProvider({ children }: Context) {
  const [cart, setCart] = useState<Product[]>([]);
  const [lastAddedItem, setLastAddedItem] = useState<Product | null>(null);
  const [notificationCallback, setNotificationCallback] = useState<((message: string, type?: "success" | "error" | "info" | "warning") => void) | null>(null);

  // Fonction pour enregistrer le callback de notification
  const setNotificationHandler = (callback: (message: string, type?: "success" | "error" | "info" | "warning") => void) => {
    setNotificationCallback(() => callback);
  };

  // Fonction pour générer un ID unique pour un item du panier
  const generateCartItemId = (product: Product): string => {
    return `${product.id}-${product.selectedColor || 'no-color'}-${product.selectedSize || 'no-size'}`;
  };

  // Fonction pour ajouter un produit au panier
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const cartItemId = generateCartItemId(product);
      
      // Vérifie si le produit est déjà dans le panier avec les mêmes options
      const existingProductIndex = prevCart.findIndex(
        (item) => item.cartItemId === cartItemId
      );

      if (existingProductIndex !== -1) {
        // Si le produit existe déjà, augmenter la quantité
        const updatedCart = [...prevCart];
        const oldQuantity = Number(updatedCart[existingProductIndex].quantity);
        const newQuantity = oldQuantity + Number(product.quantity);
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: newQuantity,
        };
        // Mettre à jour le dernier élément ajouté
        setLastAddedItem({ ...updatedCart[existingProductIndex] });
        // Afficher notification de manière asynchrone pour éviter l'erreur React
        if (notificationCallback) {
          setTimeout(() => {
            notificationCallback(
              `Quantité de "${product.nom}" mise à jour (${newQuantity})`,
              "success"
            );
          }, 0);
        }
        return updatedCart;
      }

      // Sinon, ajouter le nouveau produit avec son cartItemId unique
      const newProduct = { ...product, cartItemId };
      setLastAddedItem(newProduct);
      // Afficher notification de manière asynchrone pour éviter l'erreur React
      if (notificationCallback) {
        setTimeout(() => {
          notificationCallback(
            `"${product.nom}" a été ajouté au panier`,
            "success"
          );
        }, 0);
      }
      return [...prevCart, newProduct];
    });
  };

  // Fonction pour mettre à jour la quantité d'un produit dans le panier
  const updateCartItem = (cartItemId: string, quantity: number) => {
    setCart((prevCart) => {
      const product = prevCart.find((p) => p.cartItemId === cartItemId);
      if (product && notificationCallback) {
        // Afficher notification de manière asynchrone pour éviter l'erreur React
        setTimeout(() => {
          notificationCallback(
            `Quantité de "${product.nom}" mise à jour (${quantity})`,
            "success"
          );
        }, 0);
      }
      return prevCart.map((product) =>
        product.cartItemId === cartItemId ? { ...product, quantity } : product
      );
    });
  };

  // Fonction pour supprimer un produit du panier
  const removeCartItem = (cartItemId: string) => {
    setCart((prevCart) => {
      const product = prevCart.find((p) => p.cartItemId === cartItemId);
      if (product && notificationCallback) {
        // Afficher notification de manière asynchrone pour éviter l'erreur React
        setTimeout(() => {
          notificationCallback(
            `"${product.nom}" a été retiré du panier`,
            "info"
          );
        }, 0);
      }
      return prevCart.filter((product) => product.cartItemId !== cartItemId);
    });
  };

  // Fonction pour calculer le prix total des produits du panier
  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => {
      return total + product.prix * Number(product.quantity);
    }, 0);
  };

  // Fonction pour calculer le prix total en tenant compte des promotions
  const calculateTotalPromoPrice = () => {
    return cart.reduce((total, product) => {
      const price = product.promotion
        ? Number(product.promotion)
        : product.prix;
      return total + price * Number(product.quantity);
    }, 0);
  };

  // Fonction pour calculer le pourcentage moyen de réduction
  const calculateDiscountRate = () => {
    const totalNormalPrice = calculateTotalPrice();
    const totalPromoPrice = calculateTotalPromoPrice();

    if (totalNormalPrice === 0) return 0; // Éviter la division par zéro

    const discount = totalNormalPrice - totalPromoPrice;
    return (discount / totalNormalPrice) * 100;
  };

  // Fonction pour obtenir le nombre total d'items dans le panier
  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + Number(item.quantity), 0);
  };

  // Ajout des fonctions au contexte
  return (
    <CartContext.Provider
      value={{
        cart,
        lastAddedItem,
        addToCart,
        updateCartItem,
        removeCartItem,
        calculateTotalPrice,
        calculateTotalPromoPrice,
        calculateDiscountRate,
        getCartItemsCount,
        setNotificationHandler
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook personnalisé pour utiliser le contexte du panier
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
