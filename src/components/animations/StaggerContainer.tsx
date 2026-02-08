"use client";

import { motion } from "framer-motion";
import { ReactNode, useMemo } from "react";

interface StaggerContainerProps {
  children: ReactNode;
  delay?: number;
  staggerDelay?: number;
  className?: string;
}

export default function StaggerContainer({ 
  children, 
  delay = 0,
  staggerDelay = 0.05,
  className = "" 
}: StaggerContainerProps) {
  const variants = useMemo(() => ({
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  }), [staggerDelay, delay]);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={variants}
      className={className}
      style={{ willChange: 'transform' }}
    >
      {children}
    </motion.div>
  );
}



