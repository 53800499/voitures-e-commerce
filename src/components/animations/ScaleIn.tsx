"use client";

import { motion } from "framer-motion";
import { ReactNode, useMemo } from "react";

interface ScaleInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function ScaleIn({ 
  children, 
  delay = 0, 
  duration = 0.3,
  className = "" 
}: ScaleInProps) {
  const transition = useMemo(() => ({
    duration,
    delay,
    ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number]
  }), [duration, delay]);

  const initial = useMemo(() => ({ opacity: 0, scale: 0.95 }), []);
  const animate = useMemo(() => ({ opacity: 1, scale: 1 }), []);

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-50px" }}
      transition={transition}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}

