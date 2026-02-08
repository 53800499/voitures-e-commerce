"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/container/container";
import { useCart } from "@/context/cartContext";
import { useCheckout } from "@/hooks/useCheckout";
import { useAuth } from "@/context/AuthUserContext";
import Typography from "@/ui/designSystem/typography/typography";
import Button from "@/ui/designSystem/button/button";
import Image from "next/image";
import { FiLock, FiMapPin } from "react-icons/fi";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, calculateTotalPromoPrice } = useCart();
  const { isLoading, handleStripeCheckout } = useCheckout();
  const { authUser } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: authUser?.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "France",
  });

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  const shippingCost = 300;
  const subtotal = calculateTotalPromoPrice();
  const total = subtotal + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!authUser) {
      router.push("/connexion?redirect=/checkout");
      return;
    }

    if (cart.length === 0) {
      alert("Votre panier est vide");
      return;
    }

    // Valider le formulaire
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.address || !formData.city || !formData.postalCode) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    // Sauvegarder les informations de livraison (optionnel : dans localStorage ou contexte)
    localStorage.setItem("shippingInfo", JSON.stringify(formData));

    // Procéder au paiement
    try {
      await handleStripeCheckout();
    } catch (error) {
      console.error("Erreur lors du paiement:", error);
      alert("Une erreur est survenue lors du paiement. Veuillez réessayer.");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <Container>
          <div className="max-w-2xl mx-auto text-center py-20">
            <Typography variant="h2" theme="black" weight="bold" className="mb-4">
              Votre panier est vide
            </Typography>
            <Link href="/shop">
              <Button variant="accent" size="large">
                Continuer les achats
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
          Finaliser la commande
        </Typography>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire de livraison */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informations de livraison */}
            <div className="bg-white shadow-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary-100 flex items-center justify-center">
                  <FiMapPin className="text-primary text-xl" />
                </div>
                <Typography variant="h4" theme="black" weight="bold">
                  Adresse de livraison
                </Typography>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prénom <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      placeholder="Votre prénom"
                      className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      placeholder="Votre nom"
                      className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="votre.email@exemple.com"
                    className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+33 6 12 34 56 78"
                    className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    placeholder="123 Rue de la République"
                    className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ville <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      placeholder="Paris"
                      className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Code postal <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      placeholder="75001"
                      className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pays
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    title="Sélectionner le pays"
                    className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary">
                    <option value="France">France</option>
                    <option value="Belgique">Belgique</option>
                    <option value="Suisse">Suisse</option>
                    <option value="Luxembourg">Luxembourg</option>
                  </select>
                </div>
              </form>
            </div>

            {/* Résumé des produits */}
            <div className="bg-white shadow-md p-6">
              <Typography
                variant="h4"
                theme="black"
                weight="bold"
                className="mb-6">
                Récapitulatif de la commande
              </Typography>
              <div className="space-y-4">
                {cart.map((item) => {
                  const itemPrice =
                    item.promotion ? Number(item.promotion) : item.prix;
                  const itemTotal = itemPrice * Number(item.quantity);

                  return (
                    <div
                      key={
                        item.cartItemId ||
                        `${item.id}-${item.selectedColor}-${item.selectedSize}`
                      }
                      className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
                      <div className="relative w-20 h-20 overflow-hidden bg-gray-100 shrink-0">
                        <Image
                          src={item.src || "/assets/images.jpg"}
                          alt={item.alt || item.nom}
                          width={100}
                          height={100}
                          quality={100}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1">
                        <Typography
                          variant="body-base"
                          theme="black"
                          weight="bold">
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
                        <Typography
                          variant="body-base"
                          theme="primary"
                          weight="bold"
                          className="mt-1">
                          {formatPrice(itemTotal)}
                        </Typography>
                      </div>
                      <div className="text-right">
                        <Typography variant="caption2" theme="gray">
                          Qté: {item.quantity}
                        </Typography>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Résumé de commande */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-md p-6 sticky top-4">
              <Typography
                variant="h4"
                theme="black"
                weight="bold"
                className="mb-6">
                Résumé
              </Typography>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <Typography variant="body-base" theme="gray">
                    Sous-total
                  </Typography>
                  <Typography variant="body-base" theme="black" weight="bold">
                    {formatPrice(subtotal)}
                  </Typography>
                </div>
                <div className="flex justify-between">
                  <Typography variant="body-base" theme="gray">
                    Livraison
                  </Typography>
                  <Typography variant="body-base" theme="black" weight="bold">
                    {formatPrice(shippingCost)}
                  </Typography>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <Typography variant="h5" theme="black" weight="bold">
                    Total
                  </Typography>
                  <Typography variant="h4" theme="primary" weight="bold">
                    {formatPrice(total)}
                  </Typography>
                </div>
              </div>

              {/* Bouton de paiement dans la colonne de droite */}
              <form onSubmit={handleSubmit}>
                <Button
                  type="submit"
                  variant="accent"
                  size="large"
                  fullwidth
                  isLoading={isLoading}
                  className="mb-4"
                  icon={{ icon: FiLock }}
                  iconPosition="left">
                  Payer maintenant
                </Button>
              </form>

              <div className="flex items-center gap-2 text-sm text-gray-600 justify-center">
                <FiLock className="text-gray-400" />
                <Typography variant="caption2" theme="gray">
                  Paiement 100% sécurisé
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

