import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Take a quiz",
};

const QuizPageLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className={"container-x container-y"}>{children}</div>;
};

export default QuizPageLayout;
