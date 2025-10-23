"use client";

import React from 'react';

interface MarqueeProps {
  children: React.ReactNode;
  duration?: number; // seconds
}

const Marquee: React.FC<MarqueeProps> = ({ children, duration = 18 }) => {
  return (
    <div className="marquee w-full overflow-hidden">
      <div className="marquee-track" style={{ animationDuration: `${duration}s` }}>
        <span className="marquee-item text-4xl md:text-6xl font-extrabold tracking-tight">{children}</span>
        <span className="marquee-item text-4xl md:text-6xl font-extrabold tracking-tight">{children}</span>
      </div>
    </div>
  );
};

export default Marquee;
