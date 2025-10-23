"use client";

import { motion } from "framer-motion";
import AnimatedText from "@/components/AnimatedText";

export default function AboutHeader() {
  return (
    <motion.div
      className="mx-auto max-w-6xl text-center relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="absolute w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"
        style={{ 
          border: '1px solid rgba(11, 188, 214, 0.1)'
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"
        style={{ 
          border: '1px solid rgba(109, 77, 217, 0.1)'
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div 
        className="relative z-10"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <AnimatedText
          text="About ABES ACM Chapters"
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-primary-foreground inline-block gradient-text"
          wordDelay={0.08}
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-6"
      >
        <AnimatedText
          text="Welcome to the ABES ACM Student Chapter, the hub for tech growth and innovation. We're a community of students dedicated to shaping the future of computing."
          className="text-base md:text-lg lg:text-xl text-muted-foreground mb-6 max-w-4xl mx-auto subtle-reveal leading-relaxed"
          style={{ ['--reveal-delay' as any]: '0.12s' }}
          lineDelay={0.1}
          staggerType="line"
        />
      </motion.div>
    </motion.div>
  );
}
