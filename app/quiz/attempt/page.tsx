"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const QuizAttempt = () => {
  const router = useRouter();

  if (!localStorage.getItem("end")) {
    router.push("/");
  }

  const [remainingTime, setRemainingTime] = useState(
    parseInt(localStorage.getItem("end")!) - Date.now(),
  );

  setInterval(() => {
    setRemainingTime(parseInt(localStorage.getItem("end")!) - Date.now());
  }, 1000);

  return (
    <main>
      <div className="flex flex-col">
        <span>Time Remaining</span>
        {`${new Date(remainingTime).getHours()}:${new Date(remainingTime).getMinutes()}:${new Date(remainingTime).getSeconds()}`}
      </div>
    </main>
  );
};

export default QuizAttempt;
