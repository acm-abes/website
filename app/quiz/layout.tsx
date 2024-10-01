import React from "react";

const QuizPageLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className={"main-container"}>{children}</div>;
};

export default QuizPageLayout;
