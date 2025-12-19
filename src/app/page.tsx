/** @format */
import { EventCarousel } from "@/components/EventCarousel";
import { GlobalArcExplorer } from "@/components/Globe";
import { QuoteSection } from "@/components/QuoteSection";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { FlipWords } from "@/components/ui/flip-words";
import React from "react";

const Home = () => {
  const words = ["Ideas", "Leaders", "Solutions", "Communities"];

  return (
    <div className="overflow-hidden">
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(9, 9, 26)"
        gradientBackgroundEnd="rgb(9, 9, 26)"
      >
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center px-28 text-start text-3xl font-bold text-white md:text-4xl lg:text-7xl">
          <div className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal text-neutral-600 dark:text-neutral-400">
            At ACM, <br />
            We Build
            <FlipWords words={words} duration={2000} /> <br />
            For a Better Tomorrow
          </div>
        </div>
      </BackgroundGradientAnimation>

      <QuoteSection />

      <div className="h-screen bg-[linear-gradient(-40deg,var(--gradient-background-end),var(--gradient-background-start))]">
        <GlobalArcExplorer />
      </div>
      <div><br/>
        <EventCarousel />
      </div>
    </div>
  );
};

export default Home;
