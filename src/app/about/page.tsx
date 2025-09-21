"use client";
import Navbar from '@/components/Navbar';
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { HoverEffect } from "@/components/ui/card-hover-effect";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <section className="pt-20">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-widest bg-gradient-to-r from-primary to-[#05467c] bg-clip-text text-transparent">
            ABOUT ACM
          </h1>
          <p className="mt-3 mx-auto text-2xl sm:text-20">Innovating Beyond Boundaries</p>
          <HoverEffect items={acmInfo} />

          <div className="mt-10 grid gap-7 md:grid-cols-4 justify-items-center">
            {[
              {
                title: '1947',
                text: 'Founded',
              },
              {
                title: '1966',
                text: 'Turing Award',
              },
              {
                title: '2000',
                text: 'Digital Library',
              },
              {
                title: '2024',
                text: 'Diversity Commitment',
              },
            ].map((item, idx) => (
              <div key={idx} className="max-w-sm">
                <h3 className="font-bold text-2xl font-black tracking-widest bg-gradient-to-r from-primary to-[#05467c] bg-clip-text text-transparent">
                  {item.title}
                </h3>
                <p className="mt-2">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ShootingStars />
      <StarsBackground />
    </>
  );
}

export const acmInfo = [
  {
    title: "Our Mission",
    description:
      "Promote research innovation and collaboration in computer science and engineering.",
  },
  {
    title: "Our Goals",
    description:
      "Enhance education, recognition and opportunities for individuals in computing field.",
  },
  {
    title: "Our Story",
    description:
      "Founded in 1947 ACM is the world’s largest computing society, with members in over 100 countries.",
  },
];
