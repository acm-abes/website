// import { Vortex } from "@/components/ui/vortex";
import HeroSection from "@/components/HeroSection";
import WhoWeAre from "@/components/WhoWeAre";
import OnGoingEvent from "@/components/OnGoingEvent";
import SpaceDivider from "@/components/SpaceDivider";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <SpaceDivider />
        <OnGoingEvent />
        <SpaceDivider />
        <WhoWeAre />
        <SpaceDivider />
      </main>
    </>
  );
}
