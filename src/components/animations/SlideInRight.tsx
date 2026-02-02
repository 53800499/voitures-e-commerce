"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SlideInRightProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  distance?: number;
}

export default function SlideInRight({ 
  children, 
  delay = 0, 
  duration = 0.6,
  className = "",
  distance = 100
}: SlideInRightProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: distance }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}



