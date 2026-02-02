"use client";

import { wording } from "@/utils/wording";
import Container from "@/components/container/container";
import Typography from "@/ui/designSystem/typography/typography";
import Image from "next/image";
import { FiCheck, FiTarget, FiHeart, FiShield, FiAward, FiUsers, FiTruck, FiHeadphones } from "react-icons/fi";
import SlideUp from "@/components/animations/SlideUp";
import FadeIn from "@/components/animations/FadeIn";
import StaggerContainer from "@/components/animations/StaggerContainer";
import StaggerItem from "@/components/animations/StaggerItem";
import ScaleIn from "@/components/animations/ScaleIn";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-8 md:py-12 relative overflow-hidden">
      {/* Éléments décoratifs en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        {/* En-tête */}
        <FadeIn>
          <div className="text-center mb-12 md:mb-16">
            <Typography variant="h1" theme="black" weight="bold" className="mb-4 text-3xl md:text-4xl lg:text-5xl">
              {wording.about.title}
            </Typography>
            <Typography variant="body-lg" theme="gray" className="max-w-3xl mx-auto text-sm md:text-base">
              {wording.about.description}
            </Typography>
          </div>
        </FadeIn>

        {/* Section Mission, Valeurs, Engagement */}
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            <StaggerItem>
              <div className="bg-white/80 backdrop-blur-lg shadow-xl border border-gray-200/50 p-6 md:p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-xl">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 flex items-center justify-center mb-4 md:mb-6">
                  <FiTarget className="text-primary text-xl md:text-2xl" />
                </div>
                <Typography variant="h3" theme="black" weight="bold" className="mb-4 text-lg md:text-xl">
                  {wording.about.sections.mission.title}
                </Typography>
                <Typography variant="body-base" theme="gray" className="text-sm md:text-base">
                  {wording.about.sections.mission.content}
                </Typography>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-white/80 backdrop-blur-lg shadow-xl border border-gray-200/50 p-6 md:p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-xl">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 flex items-center justify-center mb-4 md:mb-6">
                  <FiHeart className="text-primary text-xl md:text-2xl" />
                </div>
                <Typography variant="h3" theme="black" weight="bold" className="mb-4 text-lg md:text-xl">
                  {wording.about.sections.values.title}
                </Typography>
                <Typography variant="body-base" theme="gray" className="text-sm md:text-base">
                  {wording.about.sections.values.content}
                </Typography>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-white/80 backdrop-blur-lg shadow-xl border border-gray-200/50 p-6 md:p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-xl">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 flex items-center justify-center mb-4 md:mb-6">
                  <FiShield className="text-primary text-xl md:text-2xl" />
                </div>
                <Typography variant="h3" theme="black" weight="bold" className="mb-4 text-lg md:text-xl">
                  {wording.about.sections.commitment.title}
                </Typography>
                <Typography variant="body-base" theme="gray" className="text-sm md:text-base">
                  {wording.about.sections.commitment.content}
                </Typography>
              </div>
            </StaggerItem>
          </div>
        </StaggerContainer>

        {/* Section principale avec images et texte */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Colonne gauche */}
          <div className="space-y-6 md:space-y-8">
            <SlideUp delay={0.2}>
              <div className="relative w-full h-[300px] md:h-[500px] bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden shadow-2xl rounded-xl">
                <div className="absolute inset-0">
                  <Image
                    src="/assets/images.jpg"
                    alt="Voitures sans permis"
                    width={800}
                    height={500}
                    quality={100}
                    className="object-cover w-full h-full opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                </div>
              </div>
            </SlideUp>

            <SlideUp delay={0.4}>
              <div className="bg-white/80 backdrop-blur-lg shadow-xl border border-gray-200/50 p-6 md:p-8 rounded-xl">
                <div className="flex items-center gap-4 mb-4 md:mb-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 flex items-center justify-center">
                    <FiAward className="text-primary text-lg md:text-xl" />
                  </div>
                  <Typography variant="h2" theme="black" weight="bold" className="text-xl md:text-2xl">
                    {wording.about.whyChoose.title}
                  </Typography>
                </div>
                <ul className="space-y-3 md:space-y-4">
                  {wording.about.whyChoose.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 md:gap-4">
                      <div className="w-5 h-5 md:w-6 md:h-6 bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                        <FiCheck className="text-primary text-xs md:text-sm" />
                      </div>
                      <Typography variant="body-base" theme="black" className="flex-1 text-sm md:text-base">
                        {item.split("**").map((part, i) => {
                          if (i % 2 === 1) {
                            return <strong key={i} className="text-primary">{part}</strong>;
                          }
                          return <span key={i}>{part}</span>;
                        })}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
            </SlideUp>
          </div>

          {/* Colonne droite */}
          <div className="space-y-6 md:space-y-8">
            <SlideUp delay={0.3}>
              <div className="bg-white/80 backdrop-blur-lg shadow-xl border border-gray-200/50 p-6 md:p-8 rounded-xl">
                <div className="flex items-center gap-4 mb-4 md:mb-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 flex items-center justify-center">
                    <FiUsers className="text-primary text-lg md:text-xl" />
                  </div>
                  <Typography variant="h2" theme="black" weight="bold" className="text-xl md:text-2xl">
                    {wording.about.history.title}
                  </Typography>
                </div>
                <div className="space-y-3 md:space-y-4">
                  <Typography variant="body-lg" theme="black" className="text-sm md:text-base">
                    {wording.about.history.paragraph1}
                  </Typography>
                  <Typography variant="body-lg" theme="black" className="text-sm md:text-base">
                    {wording.about.history.paragraph2.split("**").map((part, i) => {
                      if (i % 2 === 1) {
                        return <strong key={i} className="text-primary">{part}</strong>;
                      }
                      return <span key={i}>{part}</span>;
                    })}
                  </Typography>
                </div>
              </div>
            </SlideUp>

            <SlideUp delay={0.5}>
              <div className="bg-white/80 backdrop-blur-lg shadow-xl border border-gray-200/50 p-6 md:p-8 rounded-xl">
                <div className="flex items-center gap-4 mb-4 md:mb-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 flex items-center justify-center">
                    <FiTarget className="text-primary text-lg md:text-xl" />
                  </div>
                  <Typography variant="h2" theme="black" weight="bold" className="text-xl md:text-2xl">
                    {wording.about.challenge.title}
                  </Typography>
                </div>
                <div className="space-y-3 md:space-y-4">
                  <Typography variant="body-lg" theme="black" className="text-sm md:text-base">
                    {wording.about.challenge.paragraph1.split("**").map((part, i) => {
                      if (i % 2 === 1) {
                        return <strong key={i} className="text-primary">{part}</strong>;
                      }
                      return <span key={i}>{part}</span>;
                    })}
                  </Typography>
                  <Typography variant="body-lg" theme="black" className="text-sm md:text-base">
                    {wording.about.challenge.paragraph2.split("**").map((part, i) => {
                      if (i % 2 === 1) {
                        return <strong key={i} className="text-primary">{part}</strong>;
                      }
                      return <span key={i}>{part}</span>;
                    })}
                  </Typography>
                </div>
              </div>
            </SlideUp>

            <SlideUp delay={0.6}>
              <div className="relative w-full h-[250px] md:h-[400px] bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden shadow-2xl rounded-xl">
                <div className="absolute inset-0">
                  <Image
                    src="/assets/images.jpg"
                    alt="Voitures sans permis"
                    width={800}
                    height={400}
                    quality={100}
                    className="object-cover w-full h-full opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                </div>
              </div>
            </SlideUp>
          </div>
        </div>

        {/* Section statistiques / Points forts */}
        <StaggerContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
            <StaggerItem>
              <ScaleIn>
                <div className="bg-white/80 backdrop-blur-lg shadow-xl border border-gray-200/50 p-4 md:p-6 text-center rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <FiUsers className="text-primary text-xl md:text-2xl" />
                  </div>
                  <Typography variant="h3" theme="black" weight="bold" className="mb-2 text-xl md:text-2xl">
                    1000+
                  </Typography>
                  <Typography variant="body-sm" theme="gray" className="text-xs md:text-sm">
                    Clients satisfaits
                  </Typography>
                </div>
              </ScaleIn>
            </StaggerItem>

            <StaggerItem>
              <ScaleIn delay={0.1}>
                <div className="bg-white/80 backdrop-blur-lg shadow-xl border border-gray-200/50 p-4 md:p-6 text-center rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <FiTruck className="text-primary text-xl md:text-2xl" />
                  </div>
                  <Typography variant="h3" theme="black" weight="bold" className="mb-2 text-xl md:text-2xl">
                    500+
                  </Typography>
                  <Typography variant="body-sm" theme="gray" className="text-xs md:text-sm">
                    Véhicules livrés
                  </Typography>
                </div>
              </ScaleIn>
            </StaggerItem>

            <StaggerItem>
              <ScaleIn delay={0.2}>
                <div className="bg-white/80 backdrop-blur-lg shadow-xl border border-gray-200/50 p-4 md:p-6 text-center rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <FiAward className="text-primary text-xl md:text-2xl" />
                  </div>
                  <Typography variant="h3" theme="black" weight="bold" className="mb-2 text-xl md:text-2xl">
                    10+
                  </Typography>
                  <Typography variant="body-sm" theme="gray" className="text-xs md:text-sm">
                    Années d&apos;expérience
                  </Typography>
                </div>
              </ScaleIn>
            </StaggerItem>

            <StaggerItem>
              <ScaleIn delay={0.3}>
                <div className="bg-white/80 backdrop-blur-lg shadow-xl border border-gray-200/50 p-4 md:p-6 text-center rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <FiHeadphones className="text-primary text-xl md:text-2xl" />
                  </div>
                  <Typography variant="h3" theme="black" weight="bold" className="mb-2 text-xl md:text-2xl">
                    24/7
                  </Typography>
                  <Typography variant="body-sm" theme="gray" className="text-xs md:text-sm">
                    Support client
                  </Typography>
                </div>
              </ScaleIn>
            </StaggerItem>
          </div>
        </StaggerContainer>
      </Container>
    </div>
  );
}
