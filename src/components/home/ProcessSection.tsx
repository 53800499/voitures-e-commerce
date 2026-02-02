"use client";

import { motion } from "framer-motion";
import { FaSearch, FaHandshake, FaCreditCard, FaTruck } from "react-icons/fa";
import Typography from "@/ui/designSystem/typography/typography";

const steps = [
  {
    icon: FaSearch,
    title: "1. Choisissez votre véhicule",
    description: "Parcourez notre catalogue et trouvez le véhicule qui correspond à vos besoins et à votre budget.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: FaHandshake,
    title: "2. Contactez-nous",
    description: "Notre équipe vous accompagne dans votre choix et répond à toutes vos questions.",
    color: "from-green-500 to-green-600",
  },
  {
    icon: FaCreditCard,
    title: "3. Finalisez votre achat",
    description: "Profitez de nos solutions de financement adaptées et finalisez votre commande en toute sécurité.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: FaTruck,
    title: "4. Recevez votre véhicule",
    description: "Votre véhicule est livré rapidement à votre domicile, prêt à rouler !",
    color: "from-orange-500 to-orange-600",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Typography variant="h2" className="text-3xl md:text-4xl font-bold mb-4">
            Comment ça marche ?
          </Typography>
          <Typography variant="body-lg" theme="gray" className="max-w-2xl mx-auto">
            Un processus simple et transparent en 4 étapes pour acquérir votre voiture sans permis
          </Typography>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                {/* Ligne de connexion (sauf pour le dernier) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent -z-10" 
                    style={{ width: 'calc(100% - 4rem)', left: 'calc(100% - 2rem)' }}
                  />
                )}

                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 h-full">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white text-2xl mb-4 mx-auto`}
                  >
                    <Icon />
                  </motion.div>
                  <Typography variant="h3" className="text-xl font-bold mb-3 text-center">
                    {step.title}
                  </Typography>
                  <Typography variant="body" theme="gray" className="text-center">
                    {step.description}
                  </Typography>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

