"use client";

import { wording } from "@/utils/wording";
import Container from "@/components/container/container";
import Link from "next/link";
import ProductCard from "@/components/products/ProductCard";
import HomeCarousel from "@/components/carousel/HomeCarousel";
import FeatureCard from "@/components/features/FeatureCard";
import CategoryCard from "@/components/categories/CategoryCard";
import TestimonialCard from "@/components/testimonials/TestimonialCard";
import { mockProducts } from "@/data/mockProducts";
import { 
  FaShieldAlt, 
  FaTruck, 
  FaShippingFast, 
  FaHeadset 
} from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative text-white py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/assets/images.jpg')" }}
          ></div>
        </div>
        <Container className="relative z-20">
          <div className="text-center space-y-6">
            <p className="text-lg font-medium">{wording.home.hero.welcome}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              {wording.home.hero.title}
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              {wording.home.hero.description}
            </p>
            <p className="text-base md:text-lg max-w-2xl mx-auto">
              {wording.home.hero.subtitle}
            </p>
            <p className="text-xl font-semibold">
              {wording.home.hero.cta}
            </p>
            <Link
              href="/shop"
              className="inline-block bg-white text-primary px-8 py-3 font-semibold hover:bg-gray-100 transition-colors"
            >
              {wording.home.hero.button}
            </Link>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              title={wording.home.features.securePayment.title}
              description={wording.home.features.securePayment.description}
              icon={FaShieldAlt}
              iconColor="text-green-600"
            />
            <FeatureCard
              title={wording.home.features.deliveryPrice.title}
              description={wording.home.features.deliveryPrice.description}
              icon={FaTruck}
              iconColor="text-blue-600"
            />
            <FeatureCard
              title={wording.home.features.fastDelivery.title}
              description={wording.home.features.fastDelivery.description}
              icon={FaShippingFast}
              iconColor="text-purple-600"
            />
            <FeatureCard
              title={wording.home.features.excellentService.title}
              description={wording.home.features.excellentService.description}
              icon={FaHeadset}
              iconColor="text-orange-600"
            />
          </div>
        </Container>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            {wording.home.categories.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <CategoryCard
              name={wording.home.categories.aixam.name}
              description={wording.home.categories.aixam.description}
              imageUrl="/images/categories/aixam.jpg"
              imageAlt={wording.home.categories.aixam.name}
              href="/shop?category=aixam"
            />
            <CategoryCard
              name={wording.home.categories.ligier.name}
              description={wording.home.categories.ligier.description}
              imageUrl="/images/categories/ligier.jpg"
              imageAlt={wording.home.categories.ligier.name}
              href="/shop?category=ligier"
            />
            <CategoryCard
              name={wording.home.categories.chatenet.name}
              description={wording.home.categories.chatenet.description}
              imageUrl="/images/categories/chatenet.jpg"
              imageAlt={wording.home.categories.chatenet.name}
              href="/shop?category=chatenet"
            />
            <CategoryCard
              name={wording.home.categories.casalini.name}
              description={wording.home.categories.casalini.description}
              imageUrl="/images/categories/casalini.jpg"
              imageAlt={wording.home.categories.casalini.name}
              href="/shop?category=casalini"
            />
          </div>
        </Container>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            {wording.home.products.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockProducts.slice(0, 3).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                rating={4.5}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
            {wording.home.testimonials.title}
          </h2>
          <p className="text-center text-gray-600 mb-12">
            {wording.home.testimonials.subtitle}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {wording.home.testimonials.reviews.map((review, index) => (
              <TestimonialCard
                key={index}
                text={review.text}
                author={review.author}
                rating={5}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Carousel Section */}
      <HomeCarousel />
    </div>
  );
}
