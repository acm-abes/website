"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnimatedText from "@/components/AnimatedText";

export default function CallToAction() {
  return (
    <section className="from-primary/10 to-secondary/10 rounded-2xl bg-gradient-to-br py-16 md:py-20 px-6 md:px-8 text-center shadow-lg shadow-primary/10">
      <motion.h2 
        className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <AnimatedText text="Join Our Community" wordDelay={0.05} className="inline-block" />
      </motion.h2>
      <motion.p 
        className="text-gray-300 mx-auto mb-6 md:mb-8 max-w-2xl text-sm md:text-base lg:text-lg leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Interested in becoming a part of our vibrant tech community? We welcome all students passionate about computing.
      </motion.p>
      <motion.div 
        className="flex flex-col justify-center gap-4 md:gap-6 sm:flex-row"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Button asChild size="lg">
          <Link href="/contact" className="inline-flex items-center justify-center">
            Get Involved
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/events" className="inline-flex items-center justify-center">
            View Our Events
          </Link>
        </Button>
      </motion.div>
    </section>
  );
}
