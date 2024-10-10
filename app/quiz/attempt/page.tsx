"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Question, Quiz } from "@/types";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

type QuizQuestion = Question & {
  selected: string;
};

const QuizAttempt = () => {
  const router = useRouter();

  const [selected, setSelected] = useState<string>();
  const [questionNumber, setQuestionNumber] = useState(1);
  const [quiz, setQuiz] = useState<Quiz>();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [remainingTime, setRemainingTime] = useState<number>();

  if (typeof window === "undefined") {
    return;
  }

  useEffect(() => {
    const res = fetch(`/api/quiz/`);

    res.then(async (val) => {
      if (val.ok) {
        const json = ((await val.json()) as { quiz: Quiz }).quiz;

        setQuiz(json);
        setQuestions(json.questions as QuizQuestion[]);
      }
    });
  }, []);

  useEffect(() => {
    setRemainingTime(new Date(quiz?.end!).getTime() - Date.now());
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

  if (!quiz) {
    return <div>Loading Quiz</div>;
  }

  setInterval(() => {
    setRemainingTime(new Date(quiz.end).getTime() - Date.now());
  }, 1000);

  return (
    <main className={"flex flex-col space-y-5"}>
      <div className="flex flex-col">
        <span>Time Remaining</span>
        <span>
          {remainingTime
            ? `${new Date(remainingTime).getHours()}:${new Date(remainingTime).getMinutes()}:${new Date(remainingTime).getSeconds()}`
            : "Loading Time"}
        </span>
        {/*<span>End Time</span>*/}
        {/*<span>{new Date(quiz.end).toLocaleTimeString()}</span>*/}
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
