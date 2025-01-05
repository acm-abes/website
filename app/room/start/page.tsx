"use client";

import React from "react";
import { useGame } from "@/hooks/use-game";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const StartGamePage = () => {
  const { loading, isPlaying, startGame } = useGame("dawn");

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isPlaying ? (
        <Link href={"/room/play"}>Continue</Link>
      ) : (
        <Button onClick={startGame}>Play</Button>
      )}
    </div>
  );
};

export default StartGamePage;
