import React from "react";
import QuizForm from "@/components/QuizForm";

const QuizPage = () => {
  return (
    <div className={"w-full h-full flex flex-col space-y-2"}>
      <h1 className={"text-4xl"}>Take a Quiz</h1>
      <div className={"flex w-full justify-center py-40"}>
        <QuizForm />
      </div>
    </div>
  );
};

export default QuizPage;
