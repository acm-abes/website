import { createContext, ReactNode, useContext, useState } from "react";

// TODO - Make sure to add correct properties to the context
interface GameContextData {
  question: string;
  hint: string;
  hintsCount: number;
  useHint: () => void;
  submitAnswer: (answer: string) => void;
  score: number;
  time: string;
  endTime: string;
  isGameOver: boolean;
  startGame: () => void;
}

interface HookParams {
  name: string;
}

interface ProviderParams {
  children: ReactNode;
}

export const GameContext = createContext<GameContextData | null>(null);

export const GameProvider = ({ children }: ProviderParams) => {
  const [question, setQuestion] = useState("");
  const [hint, setHint] = useState("");
  const [hintsCount, setHintsCount] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [endTime, setEndTime] = useState("");

  const useHint = () => {
    if (hintsCount > 0) {
      setHintsCount((prev) => prev - 1);
    }

    setHint("This is a hint");
  };

  const submitAnswer = (answer: string) => {};

  const startGame = () => {
    console.log("Game started");
  };

  return (
    <GameContext.Provider
      value={{
        endTime,
        hintsCount,
        question,
        hint,
        useHint,
        submitAnswer,
        score,
        time,
        isGameOver,
        startGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = ({}: HookParams) => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }

  return context;
};
