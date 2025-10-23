"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TimelineEra } from "@/types/about";
import { timelineNodes } from "@/data/about/timelineData";
import TimelineNode from "./TimelineNode";

const colorMap: Record<string, { hex: string; rgba15: string; rgba30: string }> = {
  cyan: { hex: "#0bbcd6", rgba15: "rgba(11, 188, 214, 0.15)", rgba30: "rgba(11, 188, 214, 0.3)" },
  purple: { hex: "#6d4dd9", rgba15: "rgba(109, 77, 217, 0.15)", rgba30: "rgba(109, 77, 217, 0.3)" },
  blue: { hex: "#3b82f6", rgba15: "rgba(59, 130, 246, 0.12)", rgba30: "rgba(59, 130, 246, 0.3)" },
  pink: { hex: "#ec6aa1", rgba15: "rgba(236, 106, 161, 0.15)", rgba30: "rgba(236, 106, 161, 0.3)" },
  emerald: { hex: "#20c997", rgba15: "rgba(32, 201, 151, 0.15)", rgba30: "rgba(32, 201, 151, 0.3)" },
};

export default function TimelineConsole() {
  const [activeEra, setActiveEra] = useState<TimelineEra>("present");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNodeClick = (eraId: TimelineEra) => {
    if (eraId !== activeEra) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveEra(eraId);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const activeNode = timelineNodes.find(node => node.id === activeEra) || timelineNodes[0];
  const activeColors = colorMap[activeNode.color] || colorMap.cyan;

  return (
    <motion.section
      className="relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-6"
          style={{
            background: 'rgba(11, 188, 214, 0.1)',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'rgba(11, 188, 214, 0.3)',
          }}
        >
          <Clock className="w-5 h-5 animate-pulse" style={{ color: '#0bbcd6' }} />
          <span className="font-mono text-xs md:text-sm tracking-wider" style={{ color: '#0bbcd6' }}>
            ACCESSING ABES ACM LAYERS...
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
          Navigate through the Console
        </h2>
        <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto">
          Explore ABES ACM's Environment
        </p>
      </motion.div>

      <div className="relative max-w-6xl mx-auto mb-12">
        <div
          className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px]"
          style={{
            background:
              'linear-gradient(to bottom, rgba(11, 188, 214, 0.5), rgba(109, 77, 217, 0.3), rgba(11, 188, 214, 0.5))',
          }}
        />
        
        <div className="space-y-6">
          {timelineNodes.map((node, index) => (
            <TimelineNode
              key={node.id}
              node={node}
              index={index}
              activeEra={activeEra}
              onNodeClick={handleNodeClick}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeEra}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isTransitioning ? 0 : 1, y: isTransitioning ? 20 : 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <Card
            className="backdrop-blur-sm shadow-2xl"
            style={{
              background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2))',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: activeColors.rgba30,
            }}
          >
            <CardHeader
              className="text-center pb-6"
              style={{
                borderBottomWidth: '1px',
                borderBottomStyle: 'solid',
                borderBottomColor: 'rgba(55, 65, 81, 0.5)',
              }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center justify-center gap-3 mb-4"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  style={{ color: activeColors.hex }}
                >
                  {activeNode.icon}
                </motion.div>
                <CardTitle className="text-2xl md:text-3xl lg:text-4xl font-bold" style={{ color: activeColors.hex }}>
                  {activeNode.content.heading}
                </CardTitle>
              </motion.div>
              <div 
                className="h-[2px] w-32 mx-auto bg-gradient-to-r from-transparent via-current to-transparent" 
                style={{ color: activeNode.glowColor }} 
              />
            </CardHeader>
            <CardContent className="pt-8 space-y-4">
              {activeNode.content.paragraphs.map((paragraph, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + (idx * 0.1) }}
                  className="text-sm md:text-base text-muted-foreground leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
}
