"use client";
import dynamic from "next/dynamic";

const TextGenerateEffect = dynamic(
  () => import("./ui/text-generate-effect").then((m) => m.TextGenerateEffect),
  {
    ssr: false,
  },
);

const words = `Those who can imageine anything, can create the impossible.`;

export function QuoteSection() {
  return (
    <div className="mb-28 px-28 text-center">
      <TextGenerateEffect words={words} className="text-4xl font-thin" />
    </div>
  );
}
