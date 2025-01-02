import React, { useState } from "react";
import { useGame } from "@/hooks/use-game";

const PlayGame = () => {
  const { submitAnswer, hint, question, useHint, score } = useGame("dawn");

  const [hintUsed, setHintUsed] = useState(false);

  return <div></div>;
};

export default PlayGame;
