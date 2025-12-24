"use client";
import dynamic from "next/dynamic";
import { Old_Standard_TT } from "next/font/google";

const oldStandardTT = Old_Standard_TT({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const TextGenerateEffect = dynamic(
  () => import("./ui/text-generate-effect").then((m) => m.TextGenerateEffect),
  {
    ssr: false,
  },
);

const words = `Those who can imagine anything, can create the impossible.`;

export function QuoteSection() {
  return (
    <div
      className={`mb-16 px-8 text-center md:mb-28 md:px-16 lg:px-32 ${oldStandardTT.className}`}
    >
      <TextGenerateEffect
        words={words}
        className="text-2xl font-thin md:text-4xl"
      />
      <TextGenerateEffect
        duration={3}
        words="~ Alan Turing"
        className="mr-5 text-right text-xl font-thin italic"
      />
    </div>
  );
}
