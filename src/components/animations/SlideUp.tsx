"use client";

import { motion } from "framer-motion";
import { ReactNode, useMemo } from "react";

interface SlideUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  distance?: number;
}

export default function SlideUp({ 
  children, 
  delay = 0, 
  duration = 0.4,
  className = "",
  distance = 30
}: SlideUpProps) {
  const transition = useMemo(() => ({
    duration,
    delay,
    ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number]
  }), [duration, delay]);

  const initial = useMemo(() => ({ opacity: 0, y: distance }), [distance]);
  const animate = useMemo(() => ({ opacity: 1, y: 0 }), []);

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

