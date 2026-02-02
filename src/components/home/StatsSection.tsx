"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { FaUsers, FaCar, FaAward, FaSmile } from "react-icons/fa";
import Typography from "@/ui/designSystem/typography/typography";

interface StatItem {
  icon: typeof FaUsers;
  value: number;
  suffix: string;
  label: string;
  color: string;
}

const stats: StatItem[] = [
  {
    icon: FaUsers,
    value: 5000,
    suffix: "+",
    label: "Clients satisfaits",
    color: "text-blue-600",
  },
  {
    icon: FaCar,
    value: 2000,
    suffix: "+",
    label: "Véhicules vendus",
    color: "text-green-600",
  },
  {
    icon: FaAward,
    value: 15,
    suffix: "+",
    label: "Années d'expérience",
    color: "text-purple-600",
  },
  {
    icon: FaSmile,
    value: 98,
    suffix: "%",
    label: "Taux de satisfaction",
    color: "text-orange-600",
  },
];

function AnimatedCounter({ 
  value, 
  suffix, 
  duration = 2 
}: { 
  value: number; 
  suffix: string; 
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-white to-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Typography variant="h2" className="text-3xl md:text-4xl font-bold mb-4">
            Pourquoi nous choisir ?
          </Typography>
          <Typography variant="body-lg" theme="gray" className="max-w-2xl mx-auto">
            Des années d'expérience et des milliers de clients satisfaits font de nous votre partenaire de confiance
          </Typography>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mb-4 flex justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1 + 0.3,
                      type: "spring",
                      stiffness: 200
                    }}
                    className={`${stat.color} text-4xl md:text-5xl`}
                  >
                    <Icon />
                  </motion.div>
                </div>
                <Typography 
                  variant="h3" 
                  className="text-3xl md:text-4xl font-bold mb-2"
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </Typography>
                <Typography variant="body" theme="gray">
                  {stat.label}
                </Typography>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

