"use client";
import React, { useEffect, useState } from "react";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDifference } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { usePersistedState } from "@/hooks/use-persisted-state";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { HydratedDocument } from "mongoose";
import { QuizDocument } from "@/schemas/mongoose";
import { toast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { User } from "next-auth";

export const dynamic = "force-dynamic";

const submitQuiz = async (
  user: User,
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

  const res = await fetch("/api/quiz", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (res.ok) {
    toast({
      title: "Quiz Submitted",
      description: "Thank you for participating. Look out for the results",
    });
    localStorage.setItem("selections", "{}");
    router.push("/");
  }
};

const QuizAttempt = () => {
  if (typeof window === "undefined") return;

  const [selected, setSelected] = usePersistedState<Record<string, string>>(
    "selections",
    {},
  );

  const [questions, setQuestions] = usePersistedState<
    QuizDocument["questions"]
  >("questions", []);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [remainingTime, setRemainingTime] = useState("");
  const [answeredAllQuestions, setAnsweredAllQuestions] = useState(false);

  const router = useRouter();
  const { data } = useSession();

  const {
    data: quiz,
    isLoading,
    error,
  } = useQuery<HydratedDocument<QuizDocument>>({
    queryKey: ["quiz"],
    staleTime: 10000,
    queryFn: async () => {
      const quiz = (await (await fetch("/api/quiz/")).json())
        .quiz as HydratedDocument<QuizDocument>;

      if (questions.length > 0) {
        quiz.questions = questions;
        return quiz;
      }

      const unShuffledQuestions = quiz.questions;
      quiz.questions = unShuffledQuestions.sort(() => Math.random() - 0.5);
      setQuestions(quiz.questions);

      // console.log(quiz);

      return quiz;
    },
  });

  useEffect(() => {
    setRemainingTime(formatDifference(Date.now(), quiz?.end!));
    if (quiz)
      setAnsweredAllQuestions(
        Object.keys(selected).length === quiz.questions.length,
      );
  }, [quiz, questionNumber, selected]);

  useEffect(() => {
    const now = Date.now();
    const end = new Date(quiz?.end!).getTime();

    if (now > end) {
      submitQuiz(data?.user!, quiz?._id.toString()!, router).then();
    }
  }, [questionNumber, selected]);

  const nextQuestion = () => {
    setQuestionNumber(Math.min(questionNumber + 1, quiz?.questions.length!));
  };

  const prevQuestion = () => {
    setQuestionNumber(questionNumber - 1 || 1);
  };

  if (isLoading || !data?.user) {
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
      <div className={"flex justify-between items-center"}>
        <div className="flex flex-col">
          <span>Time Remaining</span>
          <span suppressHydrationWarning>{remainingTime}</span>
        </div>
        <Dialog>
          <DialogTrigger>
            <Button variant={answeredAllQuestions ? "default" : "secondary"}>
              Submit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {answeredAllQuestions
                  ? "Submit your answers?"
                  : "You still have questions left."}
              </DialogTitle>
              <DialogDescription>
                {answeredAllQuestions ? (
                  <span>You have answered all questions.</span>
                ) : (
                  <span>
                    You still have some unanswered questions. Consider answering
                    all questions.
                  </span>
                )}{" "}
                Are you sure you want to submit?
              </DialogDescription>
            </DialogHeader>

            <div className={"w-full flex justify-end space-x-4"}>
              <DialogTrigger>
                <Button
                  variant={answeredAllQuestions ? "secondary" : "default"}
                >
                  Cancel
                </Button>
              </DialogTrigger>
              <Button
                onClick={() => {
                  submitQuiz(data.user!, quiz._id.toString(), router).then();
                }}
                variant={answeredAllQuestions ? "default" : "destructive"}
              >
                Submit
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <hr />

      <div className={"flex flex-col space-y-2.5"}>
        <span className={"text-xl font-semibold"}>
          {questions[questionNumber - 1].title}
        </span>
        <ul className={"flex flex-col space-y-2"}>
          {questions[questionNumber - 1].options.map((option, i) => (
            <li>
              <Button
                onClick={() => {
                  setSelected({
                    ...selected,
                    [questions[questionNumber - 1].id]: option.id,
                  });
                }}
                variant={
                  selected[questions[questionNumber - 1].id] === option.id
                    ? "outline"
                    : "ghost"
                }
                className={`w-full flex justify-start items-center`}
              >
                <span>{`${i + 1}. ${option.value}`}</span>
              </Button>
            </li>
          ))}
        </ul>
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
      {/*<div className={"flex w-full items-center justify-end"}></div>*/}
    </main>
  );
};

export default QuizAttempt;
