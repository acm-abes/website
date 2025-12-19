"use client";

import { Old_Standard_TT } from "next/font/google";
import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";
import {
  Trophy,
  Users,
  Clock,
  Sparkles,
  Zap,
  Code2,
  Gift,
  AlertCircle,
  CheckCircle2,
  Calendar,
  MapPin,
  IndianRupee,
} from "lucide-react";

const oldStandardTT = Old_Standard_TT({
  subsets: ["latin"],
  weight: "400",
});

export default function SahPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    // GSAP animations for hero section
    const ctx = gsap.context(() => {
      gsap.from(".hero-title", {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: "power4.out",
      });

      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.3,
        ease: "power4.out",
      });

      gsap.from(".hero-cta", {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        delay: 0.6,
        ease: "back.out(1.7)",
      });

      // Floating animation for decorative elements
      gsap.to(".float", {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.2,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-gray-950 via-emerald-950/20 to-gray-950 text-white">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity, scale }}
        className="relative flex min-h-screen items-center justify-center px-4 py-20"
      >
        {/* Animated Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98120_1px,transparent_1px),linear-gradient(to_bottom,#10b98120_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] bg-[size:4rem_4rem]" />

        {/* Glowing orbs */}
        <div className="float absolute top-20 left-10 h-72 w-72 rounded-full bg-emerald-500/30 blur-[100px]" />
        <div className="float absolute right-10 bottom-20 h-96 w-96 rounded-full bg-purple-500/20 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-400/10 blur-[150px]" />

        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "backOut" }}
            className="mb-6 inline-block"
          >
            <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-6 py-2 backdrop-blur-sm">
              <span className="flex items-center gap-2 font-mono text-sm text-emerald-400">
                <Sparkles className="h-4 w-4" />
                The Premier Algorithmic Showdown
              </span>
            </div>
          </motion.div>

          <h1 className="hero-title mb-6 bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-500 bg-clip-text text-7xl font-black tracking-tighter text-transparent md:text-9xl">
            SAH 2K26
          </h1>

          <p className="hero-subtitle mb-4 text-xl font-light text-gray-300 md:text-3xl">
            Smart ABES Hackathon
          </p>

          <p className="hero-subtitle mx-auto mb-12 max-w-3xl text-lg text-emerald-400/80 md:text-xl">
            Where algorithms and development collaborate. Infinite possibilities.
          </p>

          <div className="hero-cta flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.a
              href="https://unstop.com/hackathons/acpc-2k25-abes-engineering-college-1576067"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(16, 185, 129, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 px-8 py-4 text-lg font-bold shadow-lg shadow-emerald-500/50 transition-all hover:shadow-emerald-500/70"
            >
              <Zap className="h-5 w-5" />
              Register date will be announced soon
            </motion.a>
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4"
          >
            {[
              { icon: Clock, label: "Duration", value: "12 or 24 Hours (confirmed soon)" },
              { icon: Code2, label: "Problems", value: "6 tracks" },
              { icon: IndianRupee, label: "Prize Pool", value: "Declared soon" },
              { icon: Trophy, label: "Format", value: "Industry level hackathon" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, borderColor: "rgba(16, 185, 129, 0.8)" }}
                className="rounded-xl border border-emerald-500/20 bg-gray-900/50 p-6 backdrop-blur-sm transition-all hover:bg-gray-900/70"
              >
                <stat.icon className="mx-auto mb-3 h-8 w-8 text-emerald-400" />
                <div className="mb-1 text-2xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* About Section */}
      <AboutSection />

      {/* Prizes Section */}
      <PrizesSection />

      {/* Guidelines Section */}
      <GuidelinesSection />

      {/* Rules Section */}
      <RulesSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};

// About Section Component
const AboutSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="relative px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
            The Ultimate Arena
          </h2>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-300">
            SAH is a hackathon based on theme ALGORYTHM. It aims to make a rhythm between development with 
            algorithms. ALGORYTHM aims to bridge the gap between academic brilliance and industry needs by challenging 
            students to solve real-world problem statements using cutting-edge algorithms.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: Users,
              title: "Team Spirit",
              description:
                "Form teams across colleges and specializations. Collaboration is key.",
              color: "from-emerald-500 to-green-500",
            },
            {
              icon: Zap,
              title: "Intense Competition",
              description:
                "6 algorithmic challenges designed to test your logic and creativity.",
              color: "from-green-500 to-emerald-400",
            },
            {
              icon: Trophy,
              title: "Glory Awaits",
              description:
                "Compete for prizes, trophies, and recognition as the best problem solvers.",
              color: "from-emerald-400 to-teal-400",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              <div
                className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(to right, var(--tw-gradient-stops))`,
                }}
              />
              <div className="h-full rounded-2xl border border-emerald-500/20 bg-gray-900/50 p-8 backdrop-blur-sm transition-all hover:border-emerald-500/50">
                <div
                  className={`h-16 w-16 rounded-xl bg-gradient-to-br ${feature.color} mb-6 flex items-center justify-center transition-transform group-hover:scale-110`}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-white">
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-gray-400">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Prizes Section Component
const PrizesSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="relative px-4 py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 bg-gradient-to-r from-yellow-400 via-emerald-400 to-green-400 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
            What You'll Win
          </h2>
          <p className="text-xl text-gray-300">
            More than just bragging rights
          </p>
        </motion.div>

        {/*<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: IndianRupee,
              title: "₹15,000",
              subtitle: "Cash Prizes",
              color: "yellow",
            },
            {
              icon: Trophy,
              title: "Trophies",
              subtitle: "For Top Teams",
              color: "emerald",
            },
            {
              icon: Gift,
              title: "Swag & Merch",
              subtitle: "For All Participants",
              color: "green",
            },
            {
              icon: Sparkles,
              title: "Certificates",
              subtitle: "Achievement Recognition",
              color: "teal",
            },
          ].map((prize, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="rounded-2xl border-2 border-emerald-500/30 bg-gray-900/70 p-8 text-center backdrop-blur-sm transition-all hover:border-emerald-500/60"
            >
              <div
                className={`mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-${prize.color}-500 to-${prize.color}-400 flex items-center justify-center shadow-lg shadow-${prize.color}-500/50`}
              >
                <prize.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">
                {prize.title}
              </h3>
              <p className="text-gray-400">{prize.subtitle}</p>
            </motion.div>
          ))}
        </div>*/}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-green-500/10 p-8 text-center backdrop-blur-sm"
        >
          <p className="text-lg text-gray-300">
            🎉 The prize pool will be announced soon. Don't worry! it's worth it.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// Guidelines Section Component
const GuidelinesSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const guidelines = [
    "Bring your laptop and required items (pen, paper, charger)",
    "Report to venue on time with College ID (mandatory)",
    "Inter-college and inter-specialization teams allowed",
    "Unfair means will result in immediate disqualification",
  ];

  return (
    <section ref={ref} className="px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-12 text-center"
        >
          <h2 className="mb-6 bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-5xl font-bold text-transparent">
            Contest Guidelines
          </h2>
          <p className="text-xl text-gray-300">
            Everything you need to know before competing
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-emerald-500/20 bg-gray-900/50 p-8 backdrop-blur-sm"
        >
          <div className="space-y-4">
            {guidelines.map((guideline, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                whileHover={{ x: 10 }}
                className="flex items-start gap-4 rounded-xl p-4 transition-colors hover:bg-emerald-500/5"
              >
                <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-emerald-400" />
                <p className="text-lg text-gray-300">{guideline}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Rules Section Component
const RulesSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const rules = [
    "Zero tolerance for harassment or discrimination of any kind",
    "Respectful behavior towards all participants, organizers, and sponsors",
    "No offensive verbal comments or discriminatory behavior",
    "No unauthorized photography/recording without consent",
    "Professional conduct expected at all times",
    "Violation may result in immediate expulsion from contest",
  ];

  return (
    <section ref={ref} className="relative px-4 py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/10 to-transparent" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-12 text-center"
        >
          <h2 className="mb-6 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-5xl font-bold text-transparent">
            Code of Conduct
          </h2>
          <p className="text-xl text-gray-300">
            Creating a safe and inclusive environment for everyone
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-red-500/20 bg-gray-900/70 p-8 backdrop-blur-sm"
        >
          <div className="space-y-4">
            {rules.map((rule, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-start gap-4 rounded-xl p-4 transition-colors hover:bg-red-500/5"
              >
                <AlertCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-red-400" />
                <p className="text-lg text-gray-300">{rule}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Pricing Section Component
const PricingSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
            Registration
          </h2>
          <p className="text-xl text-gray-300">Be Alert! Stay Tuned!</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Early Bird */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05, y: -10 }}
            className="group relative"
          >
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 opacity-50 blur transition-opacity group-hover:opacity-100" />
            <div className="relative rounded-2xl border-2 border-emerald-500/50 bg-gray-900 p-8">
              <div className="absolute top-4 right-4">
                <span className="animate-pulse rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white">
                  LIMITED
                </span>
              </div>

              <Zap className="mb-4 h-12 w-12 text-emerald-400" />
              <h3 className="mb-2 text-3xl font-bold text-white">Early Bird</h3>
              <div className="mb-6">
                <span className="text-5xl font-black text-emerald-400">
                  Revealed soon
                </span>
                <span className="ml-2 text-gray-400">/ team</span>
              </div>
              <p className="mb-6 text-gray-300">First 200 participants only!</p>
              <ul className="mb-8 space-y-3">
                <li className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  Full contest access
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  Certificates
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  Swag & refreshments
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  Prize eligibility
                </li>
              </ul>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 py-4 text-lg font-bold shadow-lg shadow-emerald-500/50 transition-all hover:shadow-emerald-500/70"
                onClick={() =>
                  window.open(
                    "https://unstop.com/hackathons/acpc-2k25-abes-engineering-college-1576067",
                    "_blank",
                  )
                }
              >
                Stay Tuned
              </motion.button>
            </div>
          </motion.div>

          {/* Regular */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05, y: -10 }}
            className="group relative"
          >
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-gray-600 to-gray-500 opacity-30 blur transition-opacity group-hover:opacity-50" />
            <div className="relative rounded-2xl border-2 border-gray-500/30 bg-gray-900 p-8">
              <Users className="mb-4 h-12 w-12 text-gray-400" />
              <h3 className="mb-2 text-3xl font-bold text-white">Regular</h3>
              <div className="mb-6">
                <span className="text-5xl font-black text-gray-300">Revealed</span>
                <span className="ml-2 text-gray-400">/ team</span>
              </div>
              <p className="mb-6 text-gray-400">
                After first 200 registrations
              </p>
              <ul className="mb-8 space-y-3">
                <li className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="h-5 w-5 text-gray-400" />
                  Full contest access
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="h-5 w-5 text-gray-400" />
                  Certificates
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="h-5 w-5 text-gray-400" />
                  Swag & refreshments
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="h-5 w-5 text-gray-400" />
                  Prize eligibility
                </li>
              </ul>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-xl border-2 border-gray-500/50 py-4 text-lg font-bold transition-all hover:bg-gray-500/10"
                onClick={() =>
                  window.open(
                    "https://unstop.com/hackathons/acpc-2k25-abes-engineering-college-1576067",
                    "_blank",
                  )
                }
              >
                Stay Tuned
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// CTA Section Component
const CTASection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-32">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/20 blur-[150px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        <h2 className="mb-6 bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-500 bg-clip-text text-5xl font-black text-transparent md:text-7xl">
          Ready to Compete?
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-xl text-gray-300 md:text-2xl">
          Join hundreds of problem solvers in the ultimate test of algorithmic
          prowess. Form your team, sharpen your skills, and get ready to conquer SAH 2K26
        </p>

        <div className="flex flex-col justify-center gap-6 sm:flex-row">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 40px rgba(16, 185, 129, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            className="rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 px-12 py-5 text-xl font-bold shadow-2xl shadow-emerald-500/50 transition-all hover:shadow-emerald-500/80"
            onClick={() =>
              window.open(

              )
            }
          >
            Registeration opening soon
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-16 flex flex-wrap justify-center gap-6 text-sm text-gray-400"
        >
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-emerald-400" />
            <span>Date TBA</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-emerald-400" />
            <span>ABES Engineering College</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-emerald-400" />
            <span>Team Event</span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-12 text-sm text-gray-500"
        >
          Organized by ABES ACM Student Chapter & ABES ACM-W Chapter & sscbs ACM Student Chapter & ggsipu ACM Student Chapter
        </motion.p>
      </motion.div>
    </section>
  );
}
