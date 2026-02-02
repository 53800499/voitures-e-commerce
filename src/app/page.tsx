"use client";

import { wording } from "@/utils/wording";
import Container from "@/components/container/container";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/products/ProductCard";
import HomeCarousel from "@/components/carousel/HomeCarousel";
import FeatureCard from "@/components/features/FeatureCard";
import CategoryCard from "@/components/categories/CategoryCard";
import TestimonialCard from "@/components/testimonials/TestimonialCard";
import { useProducts } from "@/hooks/useProducts";
import {
  FaShieldAlt,
  FaTruck,
  FaShippingFast,
  FaHeadset,
  FaCheckCircle,
  FaEnvelope,
  FaShoppingBag,
  FaArrowRight
} from "react-icons/fa";
import Typography from "@/ui/designSystem/typography/typography";
import SlideUp from "@/components/animations/SlideUp";
import FadeIn from "@/components/animations/FadeIn";
import ScaleIn from "@/components/animations/ScaleIn";
import StaggerContainer from "@/components/animations/StaggerContainer";
import StaggerItem from "@/components/animations/StaggerItem";
import { useState, useEffect } from "react";

export default function Home() {
  const { products, isLoading } = useProducts();
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  // Afficher le CTA sticky après un certain scroll sur mobile
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768) {
        setShowStickyCTA(window.scrollY > 300);
      } else {
        setShowStickyCTA(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setNewsletterStatus("success");
      setEmail("");
      setTimeout(() => setNewsletterStatus("idle"), 3000);
    } catch {
      setNewsletterStatus("error");
      setTimeout(() => setNewsletterStatus("idle"), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section optimisé mobile */}
      <section className="relative text-white py-12 md:py-20 lg:py-32 overflow-hidden min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
        {/* Image de fond */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="/assets/image1.jpg"
              alt="Hero background"
              fill
              unoptimized
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        </div>
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 z-10"></div>

        <Container className="relative z-20">
          <div className="text-center space-y-4 md:space-y-6 lg:space-y-8">
            <SlideUp delay={0.1}>
              <Typography className="text-base md:text-lg lg:text-xl font-medium text-white/90">
                {wording.home.hero.welcome}
              </Typography>
            </SlideUp>

            <SlideUp delay={0.2}>
              <Typography
                variant="h1"
                theme="primary"
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight px-2">
                {wording.home.hero.title}
              </Typography>
            </SlideUp>

            <SlideUp delay={0.3}>
              <Typography
                variant="body"
                className="text-base md:text-lg lg:text-xl max-w-3xl mx-auto text-white/90 px-4">
                {wording.home.hero.description}
              </Typography>
            </SlideUp>

            <SlideUp delay={0.4}>
              <div className="space-y-4 md:space-y-6">
                <Link
                  href="/shop"
                  className="inline-block bg-white text-primary px-6 py-3 md:px-8 md:py-4 lg:px-12 lg:py-5 font-semibold hover:bg-gray-100 transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 text-sm md:text-base">
                  {wording.home.hero.button}
                </Link>
              </div>
            </SlideUp>
          </div>
        </Container>
      </section>

      {/* Features Section - Compact sur mobile */}
      <section className="py-8 md:py-12 lg:py-16 bg-white">
        <Container>
          <StaggerContainer>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              <StaggerItem>
                <FeatureCard
                  title={wording.home.features.securePayment.title}
                  description={wording.home.features.securePayment.description}
                  icon={FaShieldAlt}
                  iconColor="text-green-600"
                />
              </StaggerItem>
              <StaggerItem>
                <FeatureCard
                  title={wording.home.features.deliveryPrice.title}
                  description={wording.home.features.deliveryPrice.description}
                  icon={FaTruck}
                  iconColor="text-blue-600"
                />
              </StaggerItem>
              <StaggerItem>
                <FeatureCard
                  title={wording.home.features.fastDelivery.title}
                  description={wording.home.features.fastDelivery.description}
                  icon={FaShippingFast}
                  iconColor="text-purple-600"
                />
              </StaggerItem>
              <StaggerItem>
                <FeatureCard
                  title={wording.home.features.excellentService.title}
                  description={
                    wording.home.features.excellentService.description
                  }
                  icon={FaHeadset}
                  iconColor="text-orange-600"
                />
              </StaggerItem>
            </div>
          </StaggerContainer>
        </Container>
      </section>

      {/* Categories Section - Raccourcis rapides */}
      <section className="py-8 md:py-12 lg:py-16 bg-gray-50">
        <Container>
          <FadeIn>
            <Typography
              variant="h2"
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 md:mb-8 lg:mb-12">
              {wording.home.categories.title}
            </Typography>
          </FadeIn>

          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              <StaggerItem>
                <CategoryCard
                  name={wording.home.categories.aixam.name}
                  description={wording.home.categories.aixam.description}
                  imageUrl="/images/categories/aixam.jpg"
                  imageAlt={wording.home.categories.aixam.name}
                  href="/shop?category=aixam"
                />
              </StaggerItem>
              <StaggerItem>
                <CategoryCard
                  name={wording.home.categories.ligier.name}
                  description={wording.home.categories.ligier.description}
                  imageUrl="/images/categories/ligier.jpg"
                  imageAlt={wording.home.categories.ligier.name}
                  href="/shop?category=ligier"
                />
              </StaggerItem>
              <StaggerItem>
                <CategoryCard
                  name={wording.home.categories.chatenet.name}
                  description={wording.home.categories.chatenet.description}
                  imageUrl="/images/categories/chatenet.jpg"
                  imageAlt={wording.home.categories.chatenet.name}
                  href="/shop?category=chatenet"
                />
              </StaggerItem>
              <StaggerItem>
                <CategoryCard
                  name={wording.home.categories.casalini.name}
                  description={wording.home.categories.casalini.description}
                  imageUrl="/images/categories/casalini.jpg"
                  imageAlt={wording.home.categories.casalini.name}
                  href="/shop?category=casalini"
                />
              </StaggerItem>
            </div>
          </StaggerContainer>
        </Container>
      </section>

      {/* Products Section - PRIORITÉ #1 juste après hero */}
      <section className="py-8 md:py-12 lg:py-16 bg-white">
        <Container>
          <div className="flex items-center justify-between mb-6 md:mb-8 lg:mb-12">
            <FadeIn>
              <Typography
                variant="h2"
                className="text-2xl md:text-3xl lg:text-4xl font-bold">
                {wording.home.products.title}
              </Typography>
            </FadeIn>
            <FadeIn delay={0.2}>
              <Link
                href="/shop"
                className="hidden md:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all text-sm md:text-base">
                Voir tout
                <FaArrowRight />
              </Link>
            </FadeIn>
          </div>

          <StaggerContainer>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {isLoading ?
                <div className="col-span-2 md:col-span-3 text-center py-8 md:py-12">
                  <Typography variant="body-lg" theme="gray">
                    Chargement des produits...
                  </Typography>
                </div>
              : products.length > 0 ?
                <>
                  {products.slice(0, 4).map((product) => (
                    <StaggerItem key={product.id}>
                      <ProductCard product={product} rating={4.5} />
                    </StaggerItem>
                  ))}
                </>
              : <div className="col-span-2 md:col-span-3 text-center py-8 md:py-12">
                  <Typography variant="body-lg" theme="gray">
                    Aucun produit disponible
                  </Typography>
                </div>
              }
            </div>
          </StaggerContainer>

          {/* Bouton "Voir tous les produits" visible sur mobile */}
          <div className="mt-6 md:hidden text-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all w-full max-w-xs">
              <FaShoppingBag />
              Voir tous les produits
            </Link>
          </div>
        </Container>
      </section>

      {/* Stats Section - Réduit sur mobile */}
      <section className="py-8 md:py-12 lg:py-16 bg-gradient-to-br from-primary/10 via-primary/5 to-white hidden md:block">
        <Container>
          <FadeIn delay={0.2}>
            <div className="text-center mb-8 md:mb-12 lg:mb-16">
              <Typography
                variant="h2"
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                {wording.home.stats.title}
              </Typography>
              <Typography
                variant="body"
                className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                {wording.home.stats.subtitle}
              </Typography>
            </div>
          </FadeIn>

          <StaggerContainer>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {wording.home.stats.items.map((stat, index) => (
                <StaggerItem key={index}>
                  <ScaleIn delay={index * 0.1}>
                    <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center border border-gray-100">
                      <div className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary mb-2">
                        {stat.number}
                      </div>
                      <div className="text-xs md:text-sm lg:text-base font-semibold text-gray-800 mb-1">
                        {stat.label}
                      </div>
                      <div className="text-xs md:text-sm text-gray-600 hidden md:block">
                        {stat.description}
                      </div>
                    </div>
                  </ScaleIn>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </Container>
      </section>

      {/* Process Section - Simplifié sur mobile */}
      <section className="py-8 md:py-12 lg:py-16 bg-white">
        <Container>
          <FadeIn>
            <div className="text-center mb-6 md:mb-8 lg:mb-12">
              <Typography
                variant="h2"
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                {wording.home.process.title}
              </Typography>
              <Typography
                variant="body"
                className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto hidden md:block">
                {wording.home.process.subtitle}
              </Typography>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {wording.home.process.steps.map((step, index) => (
              <SlideUp key={index} delay={index * 0.1}>
                <div className="relative bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-primary/20">
                  <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 w-10 h-10 md:w-12 md:h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm md:text-lg shadow-lg">
                    {step.number}
                  </div>
                  <div className="mt-2 md:mt-4">
                    <Typography
                      variant="h3"
                      className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-3">
                      {step.title}
                    </Typography>
                    <Typography
                      variant="body"
                      className="text-sm md:text-base text-gray-600">
                      {step.description}
                    </Typography>
                  </div>
                </div>
              </SlideUp>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Us Section - Compact */}
      <section className="py-8 md:py-12 lg:py-16 bg-gray-50">
        <Container>
          <FadeIn>
            <div className="text-center mb-6 md:mb-8 lg:mb-12">
              <Typography
                variant="h2"
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                {wording.home.whyChooseUs.title}
              </Typography>
              <Typography
                variant="body"
                className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto hidden md:block">
                {wording.home.whyChooseUs.subtitle}
              </Typography>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {wording.home.whyChooseUs.items.map((item, index) => (
              <SlideUp key={index} delay={index * 0.08}>
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                  <div className="flex items-start space-x-3 md:space-x-4">
                    <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FaCheckCircle className="text-primary text-lg md:text-xl" />
                    </div>
                    <div>
                      <Typography
                        variant="h3"
                        className="text-lg md:text-xl font-bold mb-2">
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body"
                        className="text-sm md:text-base text-gray-600">
                        {item.description}
                      </Typography>
                    </div>
                  </div>
                </div>
              </SlideUp>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-8 md:py-12 lg:py-16 bg-white">
        <Container>
          <FadeIn>
            <div className="text-center mb-6 md:mb-8 lg:mb-12">
              <Typography
                variant="h2"
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                {wording.home.testimonials.title}
              </Typography>
              <Typography
                variant="body"
                className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto hidden md:block">
                {wording.home.testimonials.subtitle}
              </Typography>
            </div>
          </FadeIn>

          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {wording.home.testimonials.reviews.map((review, index) => (
                <StaggerItem key={index}>
                  <TestimonialCard
                    text={review.text}
                    author={review.author}
                    rating={5}
                  />
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </Container>
      </section>

      {/* Newsletter Section */}
      <section className="py-8 md:py-12 lg:py-16 bg-gradient-to-br from-primary via-primary-600 to-primary-700 text-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <div className="text-center mb-6 md:mb-8">
                <FaEnvelope className="text-4xl md:text-5xl lg:text-6xl mx-auto mb-4 md:mb-6 opacity-80" />
                <Typography
                  variant="h2"
                  className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                  {wording.home.newsletter.title}
                </Typography>
                <Typography
                  variant="body"
                  className="text-base md:text-lg lg:text-xl text-white/90">
                  {wording.home.newsletter.subtitle}
                </Typography>
              </div>
            </FadeIn>

            <SlideUp delay={0.2}>
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={wording.home.newsletter.placeholder}
                  required
                  className="flex-1 px-4 md:px-6 py-3 md:py-4 rounded-xl text-gray-900 placeholder-gray-700 focus:outline-none focus:ring-1 ring-2 ring-white focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-primary ring-offset-primary text-sm md:text-base"
                />
                <button
                  type="submit"
                  className="bg-white text-primary px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg whitespace-nowrap text-sm md:text-base">
                  {wording.home.newsletter.button}
                </button>
              </form>
            </SlideUp>

            {newsletterStatus === "success" && (
              <FadeIn>
                <div className="mt-4 text-center text-green-200 font-medium text-sm md:text-base">
                  {wording.home.newsletter.success}
                </div>
              </FadeIn>
            )}
            {newsletterStatus === "error" && (
              <FadeIn>
                <div className="mt-4 text-center text-red-200 font-medium text-sm md:text-base">
                  {wording.home.newsletter.error}
                </div>
              </FadeIn>
            )}
          </div>
        </Container>
      </section>

      {/* Carousel Section */}
      <HomeCarousel />

      {/* CTA Sticky sur mobile */}
      {showStickyCTA && (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 shadow-2xl p-4 animate-slide-up-bottom">
          <Link
            href="/shop"
            className="flex items-center justify-center gap-3 bg-primary text-white px-6 py-4 rounded-xl font-semibold shadow-lg w-full">
            <FaShoppingBag className="text-xl" />
            <span>Voir tous les produits</span>
            <FaArrowRight />
          </Link>
        </div>
      )}

      {/* Padding pour éviter que le contenu soit caché par le CTA sticky */}
      {showStickyCTA && <div className="h-24 md:h-0"></div>}
    </div>
  );
}
