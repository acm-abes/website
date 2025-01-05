import React, { ReactNode } from "react";
import { Metadata } from "next";
import { GameProvider } from "@/hooks/use-game";

interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Virtual Escape Room",
  description: "Get ready for the Virtual Escape Room",
};

const RoomLayout = ({ children }: Props) => {
  return (
    <GameProvider>
      <div className={"container-x container-y"}>{children}</div>
    </GameProvider>
  );
};

export default RoomLayout;
