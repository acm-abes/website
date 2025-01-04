import React, { ReactNode } from "react";
import { Metadata } from "next";

interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Virtual Escape Room",
  description: "Get ready for the Virtual Escape Room",
};

const RoomLayout = ({ children }: Props) => {
  // return <div className={"container-x container-y"}>{children}</div>;
  return <>{children}</>;
};

export default RoomLayout;
