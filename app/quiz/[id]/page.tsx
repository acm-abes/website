"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {
  params: { id: string };
}

const QuizPage = ({ params: { id } }: Props) => {
  const router = useRouter();

  const quiz = {
    name: `Quiz ${id}`,
    start: Date.now(),
    end: Date.now() + 100 * 60 * 60 * 2,
    questions: 20,
  };

  const enterQuiz = async () => {
    const res = await fetch(`/api/quiz/enter?id=${id}`);

    if (res.status === 302) {
      localStorage.setItem("end", (await res.json()).end);
      router.push("/quiz/attempt");
    }
  };

  return (
    <main className={"flex flex-col space-y-10"}>
      <h1 className={"text-4xl"}>{quiz.name}</h1>
      <section className={"flex flex-col space-y-10"}>
        <div className={"flex justify-between"}>
          <div className={"flex flex-col w-1/2"}>
            <span className={"font-semibold"}>Start</span>
            <span className={"text-xl"}>
              {new Date(quiz.start).toLocaleTimeString()}
            </span>
          </div>
          <div className={"flex flex-col w-1/2"}>
            <span className={"font-semibold"}>End</span>
            <span className={"text-xl"}>
              {new Date(quiz.end).toLocaleTimeString()}
            </span>
          </div>
        </div>

        <div className={"flex justify-between"}>
          <div className={"flex flex-col w-1/2"}>
            <span className={"font-semibold"}>Question Count</span>
            <span className={"text-xl"}>{quiz.questions}</span>
          </div>
        </div>

        <div className={"flex space-x-2 items-center"}>
          <Button onClick={enterQuiz}>Enter Quiz</Button>
        </div>
      </section>
    </main>
  );
};

export default QuizPage;
