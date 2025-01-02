import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { GameRoomDocument } from "@/schemas/mongoose/game-room";
import { PlayerDocument } from "@/schemas/mongoose/player";

// TODO - Make sure to add correct properties to the context

interface GameContextData {
  question: {
    id: string;
    text: string;
  };
  hint: string;
  // isPlaying: boolean;
  useHint: () => void;
  submitAnswer: (answer: string) => void;
  score: number;
  time: string;
  endTime: string;
  isGameOver: boolean;
  startGame: () => void;
}

// interface HookParams {
//   name: string;
// }

interface ProviderParams {
  children: ReactNode;
}

export const GameContext = createContext<GameContextData | null>(null);

export const GameProvider = ({ children }: ProviderParams) => {
  const [question, setQuestion] = useState<GameContextData["question"]>({
    id: "",
    text: "",
  });
  const [hint, setHint] = useState("");
  const [hintsCount, setHintsCount] = useState(0);
  const [currentRoom, setCurrentRoom] = useState(0);
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

  useEffect(() => {
    (async () => {
      const progress = await fetch("/api/progress");

      if (progress.status === 401) return;
      if (progress.status === 404) return;
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const room = await fetch("/api/room");

      if (room.status === 401) return;
      if (room.status === 404) return;

      const data = (await room.json()) as GameRoomDocument;

      setQuestion({ id: data.question.id, text: data.question.text });
    })();
  }, [currentRoom]);

  const submitAnswer = (answer: string) => {};

  const startGame = () => {
    console.log("Game started");
  };

  return (
    <GameContext.Provider
      value={{
        endTime,
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

export const useGame = (name: string) => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }

  return context;
};
