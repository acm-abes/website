import HeroSection from "@/components/HeroSection";
import WhoWeAre from "@/components/WhoWeAre";
// import OnGoingEventBlindCoding from "@/components/OnGoingEventBlindCoding";
// import OnGoingEventDwanTech from "@/components/OnGoingEventDwanTech";
import SpaceDivider from "@/components/SpaceDivider";
import OnGoingEvent from "@/components/OnGoingEventRecruitment";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <SpaceDivider />
        <OnGoingEvent/>
        {/* <OnGoingEventDwanTech /> */}
        {/* <OnGoingEventBlindCoding /> */}
        <SpaceDivider />
        <WhoWeAre />
        <SpaceDivider />
      </main>
    </>
  );
}
