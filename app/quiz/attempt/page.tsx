"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Question, Quiz } from "@/types";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDifference } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export const dynamic = "force-dynamic";

interface QuizQuestion extends Question {
  selected: string;
}

const QuizAttempt = () => {
  if (typeof window === "undefined") {
    return;
  }

  const router = useRouter();

  const [selected, _setSelected] = useState<string>();
  const [questionNumber, setQuestionNumber] = useState(1);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [remainingTime, setRemainingTime] = useState("");

  const {
    data: quiz,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["quiz"],
    queryFn: async () => {
      const data = (await (await fetch("/api/quiz/")).json()).quiz as Quiz;
      setQuestions(data.questions.map((item) => ({ selected: "", ...item })));
      return data;
    },
  });

  useEffect(() => {
    setRemainingTime(formatDifference(Date.now(), quiz?.end!));
  }, [quiz, questionNumber]);

  const nextQuestion = () => {
    setQuestionNumber(Math.min(questionNumber + 1, quiz?.questions.length!));
  };

  const prevQuestion = () => {
    setQuestionNumber(questionNumber - 1 || 1);
  };

  if (!localStorage.getItem("end")) {
    router.push("/");
  }

  if (isLoading) {
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
          disabled={questionNumber >= questions.length}
          variant={"outline"}
          onClick={nextQuestion}
        >
          <ArrowRightCircle />
        </Button>
      </div>
      <div className={"flex flex-col space-y-2.5"}>
        <span className={"text-xl font-semibold"}>
          {questions[questionNumber - 1].title}
        </span>
        <ul className={"flex flex-col space-y-2"}>
          {questions[questionNumber - 1].options.map((option, i) => (
            <li>
              <Button
                onClick={() => {
                  questions[questionNumber - 1].selected = option.id;
                }}
                variant={selected === option.id ? "outline" : "ghost"}
                className={`w-full flex justify-start items-center ${questions[questionNumber - 1].selected === option.id && "bg-blue-800 hover:bg-blue-600/70"}`}
              >
                <span>{`${i + 1}. ${option.value}`}</span>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default QuizAttempt;
