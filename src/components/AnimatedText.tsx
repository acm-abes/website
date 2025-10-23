"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  className?: string;
  wordDelay?: number;
  lineDelay?: number;
  staggerType?: 'word' | 'line';
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className,
  wordDelay = 0.05,
  lineDelay = 0.1,
  staggerType = 'word',
  ...rest
}) => {
  const lines = text.split('\n');

  return (
    <div className={cn('overflow-hidden', className)} {...rest}>
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="overflow-hidden">
          {staggerType === 'word' ? (
            line.split(' ').map((word, wordIndex) => (
              <span
                key={wordIndex}
                className="inline-block animate-fade-in-up"
                style={{ animationDelay: `${lineIndex * lineDelay + wordIndex * wordDelay}s` }}
              >
                {word}&nbsp;
              </span>
            ))
          ) : (
            <span
              className="inline-block animate-fade-in-up"
              style={{ animationDelay: `${lineIndex * lineDelay}s` }}
            >
              {line}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default AnimatedText;
