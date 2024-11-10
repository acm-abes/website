"use client";
import React, { useEffect, useState } from "react";
import { Quiz } from "@/types";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDifference } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/auth";
import { Models } from "appwrite";
import { usePersistedState } from "@/hooks/use-persisted-state";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const dynamic = "force-dynamic";

const submitQuiz = async (
  user: Models.User<Models.Preferences>,
  quiz_id: string,
  router: AppRouterInstance,
) => {
  const selections = localStorage.getItem("selections");

  const body = {
    attempter_email: user.email,
    attempter_name: user.name,
    quiz_id,
    selections: JSON.parse(selections || "{}"),
  };

  console.log(body);

  const res = await fetch("/api/quiz", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (res.ok) {
    router.push("/");
  }
};

const QuizAttempt = () => {
  if (typeof window === "undefined") return;

  const [selected, setSelected] = usePersistedState<Record<number, string>>(
    "selections",
    {},
  );
  const [questionNumber, setQuestionNumber] = useState(1);
  const [remainingTime, setRemainingTime] = useState("");
  const [answeredAllQuestions, setAnsweredAllQuestions] = useState(false);

  const router = useRouter();
  const { user } = useAuth();

  const {
    data: quiz,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["quiz"],
    queryFn: async () => {
      return (await (await fetch("/api/quiz/")).json()).quiz as Quiz & {
        _id: string;
      };
    },
  });

  useEffect(() => {
    setRemainingTime(formatDifference(Date.now(), quiz?.end!));
    if (quiz)
      setAnsweredAllQuestions(
        Object.keys(selected).length === quiz.questions.length,
      );
  }, [quiz, questionNumber, selected]);

  const nextQuestion = () => {
    setQuestionNumber(Math.min(questionNumber + 1, quiz?.questions.length!));
  };

  const prevQuestion = () => {
    setQuestionNumber(questionNumber - 1 || 1);
  };

  if (isLoading || !user) {
    return <div>Loading Quiz</div>;
  }

  if (error || !quiz) {
    return <div>Unable to fetch quiz</div>;
  }

  setInterval(() => {
    setRemainingTime(formatDifference(Date.now(), quiz.end));
  }, 1000);

  return (
    <main className={"flex flex-col space-y-5"}>
      <div className="flex flex-col">
        <span>Time Remaining</span>
        <span>{remainingTime}</span>
      </div>
      <hr />
      <div className={"flex justify-between"}>
        <Button
          disabled={questionNumber <= 1}
          variant={"outline"}
          onClick={prevQuestion}
        >
          <ArrowLeftCircle />
        </Button>
        <div>Question {questionNumber}</div>

        <Button
          disabled={questionNumber >= quiz.questions.length}
          variant={"outline"}
          onClick={nextQuestion}
        >
          <ArrowRightCircle />
        </Button>
      </div>
      <div className={"flex flex-col space-y-2.5"}>
        <span className={"text-xl font-semibold"}>
          {quiz.questions[questionNumber - 1].title}
        </span>
        <ul className={"flex flex-col space-y-2"}>
          {quiz.questions[questionNumber - 1].options.map((option, i) => (
            <li>
              <Button
                onClick={() => {
                  setSelected({
                    ...selected,
                    [questionNumber]: option.id,
                  });
                }}
                variant={
                  selected[questionNumber] === option.id ? "outline" : "ghost"
                }
                className={`w-full flex justify-start items-center`}
              >
                <span>{`${i + 1}. ${option.value}`}</span>
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className={"flex w-full items-center justify-end"}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant={answeredAllQuestions ? "default" : "secondary"}
                onClick={() => submitQuiz(user, quiz._id, router)}
              >
                Submit
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {answeredAllQuestions ? (
                <p>You are ready to go!!</p>
              ) : (
                <p>Consider answering all questions first</p>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </main>
  );
};

export default QuizAttempt;
