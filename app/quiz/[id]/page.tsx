"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Quiz } from "@/types";
import { database } from "@/mocks/database";

interface Props {
  params: { id: string };
}

const QuizPage = ({ params: { id } }: Props) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState<Quiz>();

  useEffect(() => {
    setQuiz(database.getQuiz(id));
  }, []);

  const enterQuiz = async () => {
    setLoading(false);

    const res = await fetch(`/api/quiz/enter?id=${id}`);

    if (res.status === 302) {
      localStorage.setItem("end", quiz?.end!);
      router.push("/quiz/attempt");
    }
  };

  if (!quiz) {
    return <div>Loading</div>;
  }

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
            <span className={"text-xl"}>{quiz.questions.length}</span>
          </div>
        </div>

        <div className={"flex space-x-2 items-center"}>
          <Button disabled={loading} onClick={enterQuiz}>
            Enter Quiz
          </Button>
        </div>
      </section>
    </main>
  );
};

export default QuizPage;
