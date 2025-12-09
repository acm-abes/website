import { EventCarousel } from "@/components/EventCarousel";
import { GlobalArcExplorer } from "@/components/Globe";
import { QuoteSection } from "@/components/QuoteSection";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { FlipWords } from "@/components/ui/flip-words";

const Home = () => {
  const words = ["Ideas", "Leaders", "Solutions", "Communities"];

  return (
    <div className="overflow-hidden">
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(9, 9, 26)"
        gradientBackgroundEnd="rgb(9, 9, 26)"
      >
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center px-8 text-start text-3xl font-bold text-white md:px-16 md:text-4xl lg:px-32 lg:text-7xl">
          <div className="text-4xl font-normal text-neutral-600 md:text-6xl dark:text-neutral-400">
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
      <div>
        <EventCarousel />
      </div>
    </div>
  );
};

export default Home;
