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
    <div className={`mb-28 px-28 text-center ${oldStandardTT.className}`}>
      <TextGenerateEffect words={words} className="text-4xl font-thin" />
      <TextGenerateEffect
        duration={3}
        words="~ Alan Turing"
        className="mr-5 text-right text-xl font-thin italic"
      />
    </div>
  );
}
