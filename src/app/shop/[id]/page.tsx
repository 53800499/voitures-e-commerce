"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Container from "@/components/container/container";
import { mockProducts } from "@/data/mockProducts";
import { useCart } from "@/context/cartContext";
import Typography from "@/ui/designSystem/typography/typography";
import Button from "@/ui/designSystem/button/button";
import Image from "next/image";
import { 
  FiHeart, 
  FiShoppingCart, 
  FiCheck, 
  FiTruck, 
  FiShield, 
  FiRotateCw,
  FiChevronLeft,
  FiChevronRight,
  FiX
} from "react-icons/fi";
import { FaHeart, FaStar } from "react-icons/fa";
import Link from "next/link";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.id as string;
  const { addToCart, lastAddedItem } = useCart();
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | number | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showStickyCart, setShowStickyCart] = useState(false);

  // Trouver le produit
  const product = mockProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <Container>
          <div className="text-center py-20">
            <Typography variant="h2" theme="black" weight="bold" className="mb-4">
              Produit non trouvé
            </Typography>
            <Link href="/shop">
              <Button variant="accent" size="large">
                Retour à la boutique
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  const currentPrice = product.promotion ? Number(product.promotion) : product.prix;
  const originalPrice = product.promotion ? product.prix : undefined;
  const discountPercentage = originalPrice
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0;

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  const handleAddToCart = () => {
    // Vérifier que la couleur et la taille sont sélectionnées
    const finalColor = selectedColor || product.colors[0]?.name;
    const finalSize = selectedSize || product.sizes[0];

    if (!finalColor && product.colors.length > 0) {
      alert("Veuillez sélectionner une couleur");
      return;
    }

    if (!finalSize && product.sizes.length > 0) {
      alert("Veuillez sélectionner une taille");
      return;
    }

    addToCart({
      id: product.id,
      src: product.src || "/assets/images.jpg",
      alt: product.alt,
      nom: product.nom,
      prix: product.prix,
      promotion: product.promotion,
      quantity: quantity,
      selectedColor: finalColor,
      selectedSize: finalSize,
      description: product.description,
    });

    // Afficher le message de succès
    setShowSuccessMessage(true);
    setShowStickyCart(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const allImages = product.images.length > 0 
    ? product.images.map(img => ({ ...img, src: img.src || "/assets/images.jpg" }))
    : [{ id: 1, src: product.src || "/assets/images.jpg", alt: product.alt }];

  const handlePreviousImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  // Calculer le prix du dernier élément ajouté
  const lastItemPrice = lastAddedItem 
    ? (lastAddedItem.promotion ? Number(lastAddedItem.promotion) : lastAddedItem.prix) * Number(lastAddedItem.quantity)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Message de succès en haut de page */}
      {showSuccessMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up">
          <div className="bg-green-500 text-white px-6 py-3 shadow-lg flex items-center gap-3">
            <FiCheck className="text-xl" />
            <span className="font-medium">{product.nom} ajouté au panier avec succès !</span>
          </div>
        </div>
      )}

      {/* Sticky cart en bas de page */}
      {showStickyCart && lastAddedItem && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50 animate-slide-up-bottom">
          <Container>
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4 flex-1">
                {/* Image */}
                <div className="relative w-20 h-20 overflow-hidden bg-gray-100 shrink-0">
                  <Image
                    src={lastAddedItem.src || "/assets/images.jpg"}
                    alt={lastAddedItem.alt || lastAddedItem.nom}
                            width={80}
                    height={80}
                    quality={100}
                    className="object-cover w-full h-full"
                  />
                </div>
                
                {/* Informations */}
                <div className="flex-1">
                  <Typography variant="body-base" theme="black" weight="bold" className="mb-1">
                    {lastAddedItem.nom}
                  </Typography>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {lastAddedItem.selectedColor && (
                      <Typography variant="caption2" theme="gray" className="bg-gray-100 px-2 py-1">
                        Couleur: {lastAddedItem.selectedColor}
                      </Typography>
                    )}
                    {lastAddedItem.selectedSize && (
                      <Typography variant="caption2" theme="gray" className="bg-gray-100 px-2 py-1">
                        Taille: {lastAddedItem.selectedSize}
                      </Typography>
                    )}
                    <Typography variant="caption2" theme="gray" className="bg-gray-100 px-2 py-1">
                      Quantité: {lastAddedItem.quantity}
                    </Typography>
                  </div>
                  <Typography variant="h5" theme="primary" weight="bold">
                    {formatPrice(lastItemPrice)}
                  </Typography>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <Link href="/cart">
                  <Button variant="accent" size="medium">
                    Voir le panier
                  </Button>
                </Link>
                <button
                  onClick={() => setShowStickyCart(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Fermer"
                  title="Fermer"
                >
                  <FiX size={20} />
                </button>
              </div>
            </div>
          </Container>
        </div>
      )}

      <Container>
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-primary transition-colors">
              Boutique
            </Link>
            <span>/</span>
            <span className="text-gray-800">{product.nom}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Galerie d'images */}
          <div className="space-y-4">
            {/* Image principale */}
            <div className="relative aspect-square bg-white shadow-lg overflow-hidden group">
              <Image
                src={allImages[selectedImageIndex].src || "/assets/images.jpg"}
                alt={allImages[selectedImageIndex].alt}
                width={800}
                height={800}
                quality={100}
                className="object-cover w-full h-full"
                priority
              />
              
              {/* Navigation des images */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={handlePreviousImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Image précédente"
                    title="Image précédente"
                  >
                    <FiChevronLeft className="text-xl text-gray-800" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Image suivante"
                    title="Image suivante"
                  >
                    <FiChevronRight className="text-xl text-gray-800" />
                  </button>
                </>
              )}

              {/* Badge promo */}
              {product.promotion && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 font-bold shadow-lg">
                  -{discountPercentage}%
                </div>
              )}

              {/* Bouton favori */}
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-all"
                aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
              >
                {isFavorite ? (
                  <FaHeart className="text-xl text-red-500" />
                ) : (
                  <FiHeart className="text-xl text-gray-600" />
                )}
              </button>
            </div>

            {/* Miniatures */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {allImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-square overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index
                        ? "border-primary shadow-md"
                        : "border-transparent hover:border-gray-300"
                    }`}
                    aria-label={`Voir l'image ${index + 1}`}
                    title={`Image ${index + 1}`}
                  >
                    <Image
                      src={image.src || "/assets/images.jpg"}
                      alt={image.alt}
                      width={200}
                      height={200}
                      quality={100}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Informations produit */}
          <div className="space-y-6">
            {/* Catégorie et nom */}
            <div>
              <Typography variant="caption4" theme="primary" weight="medium" className="mb-2">
                {product.categorie}
              </Typography>
              <Typography variant="h1" theme="black" weight="bold" className="mb-4">
                {product.nom}
              </Typography>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-sm ${
                        i < 4 ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <Typography variant="caption2" theme="gray">
                  (4.5) - 12 avis
                </Typography>
              </div>
            </div>

            {/* Prix */}
            <div className="flex items-baseline gap-4">
              {originalPrice && (
                <Typography
                  variant="h4"
                  theme="gray"
                  weight="regular"
                  className="line-through"
                >
                  {formatPrice(originalPrice)}
                </Typography>
              )}
              <Typography variant="h1" theme="primary" weight="bold">
                {formatPrice(currentPrice)}
              </Typography>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Typography variant="h5" theme="black" weight="bold">
                Description
              </Typography>
              <Typography variant="body-base" theme="gray" weight="regular" className="leading-relaxed">
                {product.description}
              </Typography>
              <Typography variant="body-base" theme="gray" weight="regular" className="leading-relaxed">
                {product.description1}
              </Typography>
            </div>

            {/* Couleurs */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-3">
                <Typography variant="h5" theme="black" weight="bold">
                  Couleur
                </Typography>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-12 h-12 border-2 transition-all ${
                        selectedColor === color.name
                          ? "border-primary scale-110 shadow-md"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      style={{ backgroundColor: color.code }}
                      aria-label={color.name}
                    >
                      {selectedColor === color.name && (
                        <div className="w-full h-full flex items-center justify-center">
                          <FiCheck className="text-white text-lg drop-shadow-lg" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Taille */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-3">
                <Typography variant="h5" theme="black" weight="bold">
                  Taille
                </Typography>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 border-2 transition-all ${
                        selectedSize === size
                          ? "border-primary bg-primary-50 text-primary"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <Typography variant="body-base" weight="medium">
                        {size}
                      </Typography>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantité */}
            <div className="space-y-3">
              <Typography variant="h5" theme="black" weight="bold">
                Quantité
              </Typography>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="w-12 h-12 border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <span className="text-xl">−</span>
                </button>
                <Typography variant="h4" theme="black" weight="bold" className="w-16 text-center">
                  {quantity}
                </Typography>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-12 h-12 border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <span className="text-xl">+</span>
                </button>
              </div>
            </div>

            {/* Stock */}
            {product.quantiteStock !== undefined && (
              <div className="flex items-center gap-2">
                {product.quantiteStock > 0 ? (
                  <>
                    <div className="w-3 h-3 bg-green-500"></div>
                    <Typography variant="body-base" theme="primary" weight="medium" className="text-green-600">
                      En stock ({product.quantiteStock} disponible{product.quantiteStock > 1 ? "s" : ""})
                    </Typography>
                  </>
                ) : (
                  <>
                    <div className="w-3 h-3 bg-red-500"></div>
                    <Typography variant="body-base" theme="red" weight="medium">
                      Rupture de stock
                    </Typography>
                  </>
                )}
              </div>
            )}

            {/* Boutons d'action */}
            <div className="flex gap-4 pt-4">
              <Button
                variant="accent"
                size="large"
                fullwidth
                action={handleAddToCart}
                icon={{ icon: FiShoppingCart }}
                iconPosition="left"
                disabled={product.quantiteStock === 0}
              >
                Ajouter au panier
              </Button>
            </div>

            {/* Garanties */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <FiTruck className="text-blue-600 text-xl" />
                </div>
                <div>
                  <Typography variant="body-base" theme="black" weight="bold">
                    Livraison rapide
                  </Typography>
                  <Typography variant="caption2" theme="gray">
                    Livraison en 24-48h
                  </Typography>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <FiShield className="text-green-600 text-xl" />
                </div>
                <div>
                  <Typography variant="body-base" theme="black" weight="bold">
                    Paiement sécurisé
                  </Typography>
                  <Typography variant="caption2" theme="gray">
                    100% sécurisé
                  </Typography>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <FiRotateCw className="text-purple-600 text-xl" />
                </div>
                <div>
                  <Typography variant="body-base" theme="black" weight="bold">
                    Retour facile
                  </Typography>
                  <Typography variant="caption2" theme="gray">
                    30 jours pour retourner
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section détails supplémentaires */}
        <div className="mt-16 bg-white shadow-md p-8">
          <Typography variant="h2" theme="black" weight="bold" className="mb-6">
            Détails du produit
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Typography variant="h5" theme="black" weight="bold" className="mb-2">
                Caractéristiques
              </Typography>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <FiCheck className="text-green-500" />
                  <Typography variant="body-base" theme="gray">
                    Catégorie: {product.categorie}
                  </Typography>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheck className="text-green-500" />
                  <Typography variant="body-base" theme="gray">
                    Stock disponible: {product.quantiteStock || "N/A"}
                  </Typography>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheck className="text-green-500" />
                  <Typography variant="body-base" theme="gray">
                    Date d&apos;ajout: {new Date(product.dateAjout).toLocaleDateString("fr-FR")}
                  </Typography>
                </li>
              </ul>
            </div>
            <div>
              <Typography variant="h5" theme="black" weight="bold" className="mb-2">
                Informations complémentaires
              </Typography>
              <Typography variant="body-base" theme="gray" weight="regular" className="leading-relaxed">
                Ce véhicule sans permis est parfaitement adapté à vos besoins de mobilité. 
                Conçu avec les dernières technologies et respectant les normes de sécurité les plus strictes, 
                il vous offre confort et performance au quotidien.
              </Typography>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

