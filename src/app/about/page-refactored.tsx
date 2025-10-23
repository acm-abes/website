"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import BackgroundCircles from "@/components/BackgroundCircles";
import JarvisLayout from "@/components/JarvisLayout";
import HoloGrid from "@/components/HoloGrid";
import AboutHeader from "@/components/about/AboutHeader";
import StatsCards from "@/components/about/StatsCards";
import TimelineConsole from "@/components/about/TimelineConsole";
import CallToAction from "@/components/about/CallToAction";

export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <JarvisLayout>
      <motion.div style={{ y: backgroundY }}>
        <BackgroundCircles />
      </motion.div>
      <HoloGrid />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="mb-20 flex flex-col gap-16 px-4 pt-24 md:pt-28 md:px-8 lg:px-16 xl:px-20 relative z-10 max-w-[1400px] mx-auto"
      >
        <AboutHeader />
        <StatsCards />

        <motion.div
          className="my-12 h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        />

        <TimelineConsole />

        <motion.div
          className="my-16 h-[2px] w-full bg-gradient-to-r from-transparent via-purple-400 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        />

        <CallToAction />
      </motion.main>
    </JarvisLayout>
  );
}
