import React from "react";
import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Take a quiz",
};

const QuizPageLayout = ({ children }: { children: React.ReactNode }) => {
  const session = auth();

  if (!session) {
    return redirect("/api/auth/signin");
  }

  return <div className={"container-x container-y"}>{children}</div>;
};

export default QuizPageLayout;
