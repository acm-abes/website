import React from "react";
import { notFound } from "next/navigation";
import { format, formatDistance, roundToNearestMinutes } from "date-fns";
import EnterQuizButton from "@/components/EnterQuizButton";
import { Quiz } from "@/database/models";

interface Props {
  params: { id: string };
}

const QuizPage = async ({ params: { id } }: Props) => {
  const quiz = await Quiz.findOne({ uid: id });

  if (!quiz) {
    return notFound();
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
          <EnterQuizButton id={quiz.id} end={quiz.end} />
        </div>
      </section>
    </main>
  );
};

export default QuizPage;
