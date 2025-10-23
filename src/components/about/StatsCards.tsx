"use client";

import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Card } from "@/components/ui/card";
import { Users, BookOpen, Award } from "lucide-react";

const stats = [
  {
    icon: BookOpen,
    title: "Innovate",
    subtitle: "New Ideas",
    color: "cyan",
    gradient: "linear-gradient(135deg, #0bbcd6 0%, #00a3b4 100%)",
    glowColor: "rgba(11, 188, 214, 0.3)",
    borderColor: "#0bbcd6",
    textColor: "#0bbcd6",
    delay: 0.5,
    animationDelay: "0s"
  },
  {
    icon: Users,
    title: "Collaborate",
    subtitle: "Community",
    color: "purple",
    gradient: "linear-gradient(135deg, #6d4dd9 0%, #8b66e6 100%)",
    glowColor: "rgba(109, 77, 217, 0.3)",
    borderColor: "#6d4dd9",
    textColor: "#8b66e6",
    delay: 0.6,
    animationDelay: "0.5s"
  },
  {
    icon: Award,
    title: "Excel",
    subtitle: "In Tech",
    color: "blue",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
    glowColor: "rgba(59, 130, 246, 0.3)",
    borderColor: "#3b82f6",
    textColor: "#3b82f6",
    delay: 0.7,
    animationDelay: "1s"
  }
];

export default function StatsCards() {
  return (
    <motion.div
      className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        
        return (
          <Tilt
            key={index}
            tiltMaxAngleX={8}
            tiltMaxAngleY={8}
            glareEnable={true}
            glareMaxOpacity={0.15}
            glareColor={stat.glowColor}
            perspective={1000}
            className="float-animation"
            style={{ animationDelay: stat.animationDelay }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: stat.delay }}
            >
              <Card 
                className="bg-card/20 flex flex-col items-center gap-2 rounded-xl p-6 hover:scale-[1.02] transition-all duration-300 ease-in-out holo-card interactive-glow h-full"
                style={{ 
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: stat.borderColor + '30',
                  boxShadow: `0 4px 6px -1px ${stat.glowColor}, 0 2px 4px -2px ${stat.glowColor}`
                }}
              >
                <div 
                  className="rounded-full p-4"
                  style={{ background: stat.glowColor }}
                >
                  <Icon className="h-8 w-8" style={{ color: stat.textColor }} />
                </div>
                <span className="text-2xl md:text-3xl font-bold" style={{ color: stat.textColor }}>
                  {stat.title}
                </span>
                <span className="text-sm md:text-base" style={{ color: stat.textColor, opacity: 0.8 }}>
                  {stat.subtitle}
                </span>
              </Card>
            </motion.div>
          </Tilt>
        );
      })}
    </motion.div>
  );
}
