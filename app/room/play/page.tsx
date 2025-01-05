"use client";

import React, { useState } from "react";
import { useGame } from "@/hooks/use-game";
import { Button } from "@/components/ui/button";

const PlayGame = () => {
  const { submitAnswer, hint, question, useHint, loading } = useGame("dawn");

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(question);

  return (
    <div>
      {question} {hint}
      <Button onClick={useHint}>use hint</Button>
    </div>
  );
};

export default PlayGame;
