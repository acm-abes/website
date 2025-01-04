"use client";

import RoomContainer from "../components/RoomContainer";
import NextButton from "../components/NextButton";
import SkipButton from "../components/SkipButton";
import QuizLayout from "../components/QuizLayout";
import HintButton from "../components/HintButton";
import AssistantImage from "../components/AssistantImage";
import HintModalBox from "../components/HintModalBox";
import Typewriter from "typewriter-effect";
import { useState } from "react";
import style from "./play.module.css";
import clsx from "clsx";
import { useGame } from "@/hooks/use-game";

const PlayGame = () => {
  const [showQuestion, setShowQuestion] = useState(false);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const [submittedOption, setSubmittedOption] = useState<string | null>(null);
  const [nextButtonText, setNextButtonText] = useState<string | null>("Start");
  const [bgUrl, setBgUrl] = useState<string | null>(
    "/assets/room/air_core_room.jpg"
  );

  // HOOKS TO BE Implemented
  // const { submitAnswer, hint, question, useHint, score } = useGame("dawn");
  // const [hintUsed, setHintUsed] = useState(false);

  const nextBtnHandleClick = () => {
    if (!showQuestion) {
      setShowQuestion(true);
      setNextButtonText("Submit");
    } else {
      // Logic to handle submitted answer and move to the next question
      if (submittedOption) {
        console.log("Submitted Option:", submittedOption);
        // 🐥🐥🐥 Call here submit hook
        // You can implement further logic here like scoring or validation
      } else {
        alert("Selected Option, before proceeding further :)");
      }

      // Move to the next question

      // 🐥🐥🐥 May be required
      // Reset selected option for next question
      // setSubmittedOption(null);
    }
  };

  const skipBtnHandleClick = () => {
    // handle login when skip button clicked
  };

  // get the selected option from QuizLayout
  const handleOptionClick = (index: number) => {
    // for changing name of btn accordingly
    setNextButtonText("Submit & Next");

    setSubmittedOption(question.options[index]); // Update selected option
    console.log("Selected Option:", question.options[index]);
  };

  // 🐥🐥🐥 DEMO Question, it will come from hooks
  // Storing the question and option in a variable
  const story = `I step into the Navigation Hub, and the alarms hit me like a wave. The radar flickers, showing a terrifyingly close asteroid heading straight for the ship.

                "Warning! Collision detected. Immediate course adjustment required!"

                Panic rises, but I force myself to focus. The radar shows our ship sitting at (0, 0). The safe zone is marked at (100, 50)—our only chance of survival. But that asteroid—it’s at (150, 100) and moving toward us at a speed of 50 units/second.

                "I need to act fast. If I don't calculate the exact angle to reach the safe zone and steer us clear, this ship is done for. Everyone onboard is counting on me."

                I grab the controls, my mind racing to figure it out. What angle do I need to set our course to avoid catastrophe?`;

  const question = {
    question: story,
    options: ["Berlin", "Madrid", "Paris", "Rome"],
  };

  return (
    <>
      {/* use setBgUrl to change URL for next question */}
      <RoomContainer bgUrl={bgUrl}>
        <h1 className=" flex justify-center items-center text-5xl font-extrabold doto-01 p-4">
          AI CORE ROOM
        </h1>
        <div className="mt-10"></div>
        {showQuestion ? (
          <>
            <div className="flex justify-between">
              <AssistantImage />
              <HintModalBox url="https://abes-acm.vercel.app/">
                <HintButton />
              </HintModalBox>
            </div>
            <div className={clsx(style.blur_bg, "text-2xl p-[15px]")}>
              <Typewriter
                options={{
                  strings: [question.question],
                  autoStart: true,
                  loop: false,
                  delay: 1,
                  deleteSpeed: 500000,
                }}
              />
            </div>
            <>
              <QuizLayout
                options={question.options}
                onOptionClick={handleOptionClick} // Pass the option click handler
              />
            </>
          </>
        ) : null}

        <div className="flex justify-center items-center gap-32">
          <SkipButton
            btnText={"Skip Question"}
            BtnBgColor="#ff5722"
            onSmashBtn={() => skipBtnHandleClick()}
          />
          <NextButton
            btnText={nextButtonText}
            BtnBgColor=""
            onSmashBtn={() => nextBtnHandleClick()}
          />
        </div>
      </RoomContainer>
    </>
  );
};

export default PlayGame;
