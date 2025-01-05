"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { GameRoomDocument } from "@/schemas/mongoose/game-room";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

// TODO - Make sure to add correct properties to the context
interface GameContextData {
  question: string;
  hint: string;
  isPlaying: boolean;
  useHint: () => void;
  submitAnswer: (answer: string) => void;
  endTime: string;
  isGameOver: boolean;
  startGame: () => void;
  loading: boolean;
}

interface ProviderParams {
  children: ReactNode;
}

export const GameContext = createContext<GameContextData | null>(null);

export const GameProvider = ({ children }: ProviderParams) => {
  const [question, setQuestion] = useState<GameContextData["question"]>("");
  const [hint, setHint] = useState("");
  const [currentRoom, setCurrentRoom] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const useHint = async () => {
    const { hint } = await (
      await fetch("/api/room/hint", {
        method: "PATCH",
        body: {
          roomId: currentRoom,
        },
      })
    ).json();

    setHint(hint);
  };

  useEffect(() => {
    setLoading(true);

    fetch("/api/room/playing").then(async (res) => {
      const response = await res.json();
      // console.log(response);
      setCurrentRoom(response.currentRoom);
      setIsPlaying(response.isPlaying);

      const room = await fetch("/api/room", {
        method: "POST",
        body: JSON.stringify({
          currentRoom: response.currentRoom,
        }),
      });

      const data = await room.json();

      setQuestion(data.room.question);
    });

    setLoading(false);
  }, []);

  // useEffect(() => {
  //   setLoading(true);
  //   (async () => {
  //     const room = await fetch("/api/room");
  //
  //     if (room.status === 401) return;
  //     if (room.status === 404) return;
  //
  //     const data = (await room.json()) as GameRoomDocument;
  //
  //     setQuestion({ id: data.question.id, text: data.question.text });
  //   })();
  //   setLoading(false);
  // }, [currentRoom]);

  const submitAnswer = (answer: string) => {};

  const startGame = () => {
    fetch("/api/room/start", {
      method: "POST",
      body: JSON.stringify({ gameId: "dawn" }),
    })
      .then((res) => {
        if (res.status === 201) {
          setIsPlaying(true);
        }
        router.push("/room/play");
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.message,
        });
      });
  };

  return (
    <GameContext.Provider
      value={{
        isPlaying,
        loading,
        endTime,
        question,
        hint,
        useHint,
        submitAnswer,
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
