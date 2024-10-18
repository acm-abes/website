"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Quiz } from "@/types";
import { database } from "@/mocks/database";
import { useToast } from "@/hooks/use-toast";
import {
  differenceInMinutes,
  format,
  formatDistance,
  getHours,
  getMinutes,
  subHours,
} from "date-fns";

interface Props {
  params: { id: string };
}

const QuizPage = ({ params: { id } }: Props) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState<Quiz>();

  const { toast } = useToast();

  useEffect(() => {
    setQuiz(database.getQuiz(id));
  }, []);

  const enterQuiz = async () => {
    setLoading(false);

    const res = await fetch(`/api/quiz/enter?id=${id}`);

    const body = await res.json();

    if (res.status === 403) {
      toast({
        title: body.error,
        description: body.message,
        variant: "default",
      });
    }

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
              {format(quiz.start, "dd MMM hh:mm aaa")}
            </span>
          </div>
          <div className={"flex flex-col w-1/2"}>
            <span className={"font-semibold"}>End</span>
            <span className={"text-xl"}>
              {format(quiz.end, "dd MMM hh:mm aaa")}
            </span>
          </div>
        </div>

        <div className={"flex justify-between"}>
          <div className={"flex flex-col w-1/2"}>
            <span className={"font-semibold"}>Question Count</span>
            <span className={"text-xl"}>{quiz.questions.length}</span>
          </div>
          <div className={"flex flex-col w-1/2"}>
            <span className={"font-semibold"}>Duration</span>
            <span className={"text-xl"}>
              {formatDistance(quiz.end, quiz.start)}
            </span>
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
