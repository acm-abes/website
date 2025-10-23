"use client";

import React from "react";
import { motion } from "framer-motion";

const BackgroundCircles: React.FC = () => {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Animated pulsing circles */}
        <motion.circle
          cx="200"
          cy="150"
          r="200"
          fill="url(#g1)"
          opacity="0.06"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.06, 0.1, 0.06],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.circle
          cx="600"
          cy="450"
          r="250"
          fill="url(#g2)"
          opacity="0.06"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.06, 0.12, 0.06],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        
        {/* Additional holographic rings */}
        <motion.circle
          cx="400"
          cy="300"
          r="150"
          stroke="url(#g3)"
          strokeWidth="2"
          fill="none"
          opacity="0.15"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 40, repeat: Infinity, ease: "linear" },
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
        />
        
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="g2" x1="0" x2="1">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          <linearGradient id="g3" x1="0" x2="1">
            <stop offset="0%" stopColor="#00eaff">
              <animate attributeName="stop-color" values="#00eaff; #8a2be2; #00eaff" dur="8s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#8a2be2">
              <animate attributeName="stop-color" values="#8a2be2; #00eaff; #8a2be2" dur="8s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default BackgroundCircles;