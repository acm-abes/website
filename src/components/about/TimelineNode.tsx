"use client";

import { motion } from "framer-motion";
import { TimelineNode as TimelineNodeType, TimelineEra } from "@/types/about";

interface TimelineNodeProps {
  node: TimelineNodeType;
  index: number;
  activeEra: TimelineEra;
  onNodeClick: (eraId: TimelineEra) => void;
}

const colorMap: Record<string, { hex: string; rgba15: string; rgba30: string }> = {
  cyan: { hex: "#0bbcd6", rgba15: "rgba(11, 188, 214, 0.15)", rgba30: "rgba(11, 188, 214, 0.3)" },
  purple: { hex: "#6d4dd9", rgba15: "rgba(109, 77, 217, 0.15)", rgba30: "rgba(109, 77, 217, 0.3)" },
  blue: { hex: "#3b82f6", rgba15: "rgba(59, 130, 246, 0.12)", rgba30: "rgba(59, 130, 246, 0.3)" },
  pink: { hex: "#ec6aa1", rgba15: "rgba(236, 106, 161, 0.15)", rgba30: "rgba(236, 106, 161, 0.3)" },
  emerald: { hex: "#20c997", rgba15: "rgba(32, 201, 151, 0.15)", rgba30: "rgba(32, 201, 151, 0.3)" },
};

export default function TimelineNode({ node, index, activeEra, onNodeClick }: TimelineNodeProps) {
  const isActive = activeEra === node.id;
  const isEven = index % 2 === 0;
  const colors = colorMap[node.color] || colorMap.cyan;

  return (
    <motion.div
      className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <motion.button
        onClick={() => onNodeClick(node.id)}
        className={`absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full 
          transition-all duration-300 z-10 flex items-center justify-center group cursor-pointer`}
        style={{
          borderWidth: '4px',
          borderStyle: 'solid',
          borderColor: isActive ? colors.hex : '#4b5563',
          background: isActive ? colors.rgba15 : 'rgba(31, 41, 55, 0.5)',
          boxShadow: isActive ? `0 0 30px ${node.glowColor}` : 'none',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isActive ? 360 : 0 }}
          transition={{ duration: 2, repeat: isActive ? Infinity : 0, ease: "linear" }}
          style={{ color: isActive ? colors.hex : '#9ca3af' }}
        >
          {node.icon}
        </motion.div>
      </motion.button>

      <div className={`flex-1 ${isEven ? 'md:pr-16 pl-24' : 'md:pl-16 pl-24'} md:w-1/2`}>
        <motion.div
          onClick={() => onNodeClick(node.id)}
          className="p-4 md:p-6 rounded-xl cursor-pointer transition-all duration-300"
          style={{
            background: isActive ? colors.rgba15 : 'rgba(0, 0, 0, 0.2)',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: isActive ? colors.rgba30 : 'rgba(55, 65, 81, 0.5)',
            boxShadow: isActive ? `0 0 20px ${node.glowColor}` : 'none',
          }}
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-lg md:text-xl font-bold mb-1" style={{ color: isActive ? colors.hex : '#d1d5db' }}>
            {node.title}
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground font-mono">
            {node.subtitle}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
