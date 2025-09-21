"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  angle: number;
  scale: number;
  speed: number;
  distance: number;
}

interface ShootingStarsProps {
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number;      // not used in multi, kept for compat
  maxDelay?: number;      // not used in multi, kept for compat
  starColor?: string;
  trailColor?: string;
  starWidth?: number;
  starHeight?: number;
  className?: string;
  maxStars?: number;      // NEW: cap for concurrent stars
  spawnRateMs?: number;   // NEW: average spawn cadence
}

const getRandomStartPoint = () => {
  const side = Math.floor(Math.random() * 4);
  const offsetX = Math.random() * window.innerWidth;
  const offsetY = Math.random() * window.innerHeight;
  switch (side) {
    case 0: return { x: offsetX, y: 0, angle: 45 };
    case 1: return { x: window.innerWidth, y: offsetY, angle: 135 };
    case 2: return { x: offsetX, y: window.innerHeight, angle: 225 };
    case 3: return { x: 0, y: offsetY, angle: 315 };
    default: return { x: 0, y: 0, angle: 45 };
  }
};

export const ShootingStars: React.FC<ShootingStarsProps> = ({
  minSpeed = 10,
  maxSpeed = 30,
  minDelay = 1800,
  maxDelay = 4200,
  starColor = "#9E00FF",
  trailColor = "#2EB9DF",
  starWidth = 15,
  starHeight = 1,
  className,
  maxStars = 12,
  spawnRateMs = 450, // smaller = more stars on average
}) => {
  const [stars, setStars] = useState<ShootingStar[]>([]);
  const rafRef = useRef<number | null>(null);
  const spawnTimeoutRef = useRef<number | null>(null);

  // spawn stars repeatedly with jitter
  useEffect(() => {
    const spawn = () => {
      setStars((prev) => {
        if (prev.length >= maxStars) return prev;
        const { x, y, angle } = getRandomStartPoint();
        const s: ShootingStar = {
          id: Date.now() + Math.floor(Math.random() * 100000),
          x,
          y,
          angle,
          scale: 1,
          speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
          distance: 0,
        };
        return [...prev, s];
      });

      const jitter = Math.random() * spawnRateMs * 0.6; // ±60% jitter
      const nextDelay = Math.max(60, spawnRateMs - jitter + Math.random() * jitter * 2);
      spawnTimeoutRef.current = window.setTimeout(spawn, nextDelay);
    };

    spawn(); // start spawning

    return () => {
      if (spawnTimeoutRef.current) clearTimeout(spawnTimeoutRef.current);
    };
  }, [minSpeed, maxSpeed, maxStars, spawnRateMs]);

  // animate all stars
  useEffect(() => {
    const tick = () => {
      setStars((prev) => {
        if (prev.length === 0) return prev;
        const updated: ShootingStar[] = [];
        for (const s of prev) {
          const nx = s.x + s.speed * Math.cos((s.angle * Math.PI) / 180);
          const ny = s.y + s.speed * Math.sin((s.angle * Math.PI) / 180);
          const nd = s.distance + s.speed;
          const sc = 1 + nd / 100;

          // keep if still visible
          if (
            nx >= -20 &&
            nx <= window.innerWidth + 20 &&
            ny >= -20 &&
            ny <= window.innerHeight + 20
          ) {
            updated.push({ ...s, x: nx, y: ny, distance: nd, scale: sc });
          }
        }
        return updated;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <svg className={cn("w-full h-full absolute inset-0", className)}>
      {stars.map((star) => (
        <rect
          key={star.id}
          x={star.x}
          y={star.y}
          width={starWidth * star.scale}
          height={starHeight}
          fill="url(#gradient)"
          transform={`rotate(${star.angle}, ${
            star.x + (starWidth * star.scale) / 2
          }, ${star.y + starHeight / 2})`}
        />
      ))}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
          <stop offset="100%" style={{ stopColor: starColor, stopOpacity: 1 }} />
        </linearGradient>
      </defs>
    </svg>
  );
};
