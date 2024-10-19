"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { database } from "@/mocks/database";
import { useToast } from "@/hooks/use-toast";
import { format, formatDistance, roundToNearestMinutes } from "date-fns";
import { useQuery } from "@tanstack/react-query";

interface Props {
  params: { id: string };
}

const QuizPage = ({ params: { id } }: Props) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [alreadyEntered, setAlreadyEntered] = useState(false);

  const { toast } = useToast();

  const {
    data: quiz,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["quiz-meta"],
    queryFn: () => database.getQuiz(id),
  });

  useEffect(() => {
    fetch("/api/quiz/attempt").then(async (res) => {
      const body = await res.json();

      console.log(body);

      if (body.status) {
        toast({
          title: "You are already attempting",
          description: "You can still enter before time runs out",
        });
      }
    });
  }, [quiz]);

  const enterQuiz = async () => {
    setLoading(true);

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

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!quiz || error) {
    throw Error("Unable to fetch quiz");
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
              {formatDistance(
                roundToNearestMinutes(quiz.end),
                roundToNearestMinutes(quiz.start),
              )}
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
