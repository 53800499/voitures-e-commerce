"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/container/container";
import { useCart } from "@/context/cartContext";
import Typography from "@/ui/designSystem/typography/typography";
import Button from "@/ui/designSystem/button/button";
import Image from "next/image";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { wording } from "@/utils/wording";
import Link from "next/link";

export default function CartPage() {
  const router = useRouter();
  const { cart, updateCartItem, removeCartItem, calculateTotalPromoPrice } = useCart();

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  const shippingCost = 300;
  const total = calculateTotalPromoPrice() + shippingCost;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <Container>
          <div className="max-w-2xl mx-auto text-center py-20">
            <Typography variant="h2" theme="black" weight="bold" className="mb-4">
              {wording.cart.empty}
            </Typography>
            <Link href="/shop">
              <Button variant="accent" size="large">
                {wording.cart.continueShopping}
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <Typography variant="h1" theme="black" weight="bold" className="mb-8">
          {wording.cart.title}
        </Typography>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Liste des produits */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              const itemPrice = item.promotion
                ? Number(item.promotion)
                : item.prix;
              const itemTotal = itemPrice * Number(item.quantity);

              return (
                <div
                  key={item.cartItemId || item.id}
                  className="bg-white shadow-md p-6 flex flex-col md:flex-row gap-4"
                >
                  {/* Image */}
                  <div className="relative w-full md:w-32 h-32 overflow-hidden bg-gray-100 shrink-0">
                    <Image
                      src={item.src || "/assets/images.jpg"}
                      alt={item.alt || item.nom}
                      width={200}
                      height={200}
                      quality={100}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  {/* Détails */}
                  <div className="flex-1">
                    <Typography variant="h5" theme="black" weight="bold" className="mb-2">
                      {item.nom}
                    </Typography>
                    {item.selectedColor && (
                      <Typography variant="caption2" theme="gray">
                        Couleur: {item.selectedColor}
                      </Typography>
                    )}
                    {item.selectedSize && (
                      <Typography variant="caption2" theme="gray">
                        Taille: {item.selectedSize}
                      </Typography>
                    )}

                    {/* Prix et quantité */}
                    <div className="flex items-center justify-between mt-4">
                      <div>
                        {item.promotion && (
                          <Typography
                            variant="body-sm"
                            theme="gray"
                            className="line-through"
                          >
                            {formatPrice(item.prix)}
                          </Typography>
                        )}
                        <Typography variant="h5" theme="primary" weight="bold">
                          {formatPrice(itemPrice)}
                        </Typography>
                      </div>

                      {/* Contrôles de quantité */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            const newQty = Number(item.quantity) - 1;
                            if (newQty > 0 && item.cartItemId) {
                              updateCartItem(item.cartItemId, newQty);
                            }
                          }}
                          className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          aria-label="Diminuer la quantité"
                          title="Diminuer la quantité"
                        >
                          <FiMinus className="text-gray-600" />
                        </button>
                        <Typography variant="body-base" theme="black" weight="bold">
                          {item.quantity}
                        </Typography>
                        <button
                          onClick={() => {
                            if (item.cartItemId) {
                              updateCartItem(item.cartItemId, Number(item.quantity) + 1);
                            }
                          }}
                          className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          aria-label="Augmenter la quantité"
                          title="Augmenter la quantité"
                        >
                          <FiPlus className="text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Total et supprimer */}
                  <div className="flex flex-col items-end justify-between">
                    <Typography variant="h5" theme="black" weight="bold">
                      {formatPrice(itemTotal)}
                    </Typography>
                    <button
                      onClick={() => {
                        if (item.cartItemId) {
                          removeCartItem(item.cartItemId);
                        }
                      }}
                      className="text-red-500 hover:text-red-700 transition-colors p-2"
                      aria-label="Supprimer"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Résumé de commande */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-md p-6 sticky top-4">
              <Typography variant="h4" theme="black" weight="bold" className="mb-6">
                Résumé de la commande
              </Typography>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <Typography variant="body-base" theme="gray">
                    {wording.cart.subtotal}
                  </Typography>
                  <Typography variant="body-base" theme="black" weight="bold">
                    {formatPrice(calculateTotalPromoPrice())}
                  </Typography>
                </div>
                <div className="flex justify-between">
                  <Typography variant="body-base" theme="gray">
                    {wording.cart.shipping}
                  </Typography>
                  <Typography variant="body-base" theme="black" weight="bold">
                    {formatPrice(shippingCost)}
                  </Typography>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <Typography variant="h5" theme="black" weight="bold">
                    {wording.cart.total}
                  </Typography>
                  <Typography variant="h4" theme="primary" weight="bold">
                    {formatPrice(total)}
                  </Typography>
                </div>
              </div>

              <Button
                variant="accent"
                size="large"
                fullwidth
                action={() => router.push("/checkout")}
                className="mb-4"
              >
                {wording.cart.checkout}
              </Button>

              <Link href="/shop">
                <Button variant="outline" size="medium" fullwidth>
                  {wording.cart.continueShopping}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

