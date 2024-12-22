import React from "react";
import { notFound } from "next/navigation";
import { format, formatDistance, roundToNearestMinutes } from "date-fns";
import EnterQuizButton from "@/components/EnterQuizButton";
import { Quiz } from "@/database/models";
import { HydratedDocument } from "mongoose";
import { QuizDocument } from "@/schemas/mongoose";
import style from "./page.module.css";
import clsx from "clsx";

interface Props {
  params: { id: string };
}

const QuizPage = async ({ params: { id } }: Props) => {
  const quiz = (await Quiz.findOne({
    uid: id,
  })) as HydratedDocument<QuizDocument>;

  if (!quiz) {
    return notFound();
  }

  return (
    <main className={"flex flex-col space-y-10"}>
      <h1 className={"text-3xl md:text-4xl font-bold"}>{quiz.name}</h1>
      <section className={"flex flex-col space-y-10"}>
        <div className={"flex justify-between"}>
          <div className={"flex flex-col w-1/2"}>
            <span className={clsx(style.quiz_sub_heading)}>Start</span>
            <span className={clsx(style.quiz_sub_text, "md:hidden")}>
              {format(quiz.start, "dd MMM yyy")}
            </span>
            <span className={clsx(style.quiz_sub_text, "md:hidden")}>
              {format(quiz.start, "hh:mm aaa")}
            </span>
            <span className={clsx(style.quiz_sub_text, "hidden md:block")}>
              {format(quiz.start, "dd MMM yyyy, hh:mm aaa")}
            </span>
            {/* <span className={clsx(style.quiz_sub_text)}>
              {format(quiz.start, "dd MMM hh:mm aaa")}
            </span> */}
          </div>
          <div className={"flex flex-col w-1/2"}>
            <span className={clsx(style.quiz_sub_heading)}>End</span>
            <span className={clsx(style.quiz_sub_text, "md:hidden")}>
              {format(quiz.end, "dd MMM yyy")}
            </span>
            <span className={clsx(style.quiz_sub_text, "md:hidden")}>
              {format(quiz.end, "hh:mm aaa")}
            </span>
            <span className={clsx(style.quiz_sub_text, "hidden md:block")}>
              {format(quiz.end, "dd MMM yyyy, hh:mm aaa")}
            </span>
            {/* <span className={clsx(style.quiz_sub_text)}>
              {format(quiz.end, "dd MMM hh:mm aaa")}
            </span> */}
          </div>
        </div>

        <div className={"flex justify-between"}>
          <div className={"flex flex-col w-1/2"}>
            <span className={clsx(style.quiz_sub_heading)}>Question Count</span>
            <span className={clsx(style.quiz_sub_text)}>
              {quiz.questions.length}
            </span>
          </div>
          <div className={"flex flex-col w-1/2"}>
            <span className={clsx(style.quiz_sub_heading)}>Duration</span>
            <span className={clsx(style.quiz_sub_text)}>
              {formatDistance(
                roundToNearestMinutes(quiz.end),
                roundToNearestMinutes(quiz.start)
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
