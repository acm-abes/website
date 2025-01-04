"use client";
import React, { useState } from "react";
import { formatDifference } from "@/lib/utils";

interface Props {
  end: string | Date | number;
}

const Timer = ({ end }: Props) => {
  if (typeof window === "undefined") return null;

  const [remainingTime, setRemainingTime] = useState("");
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (!end) {
    throw new Error("Timer component requires an end prop");
  }

  if (typeof end === "string") {
    end = new Date(end);
  }

  setInterval(() => {
    setRemainingTime(formatDifference(Date.now(), end));
  }, 1000);

  return (
    <div className={"p-2 bg-secondary w-fit px-4 rounded"}>{remainingTime}</div>
  );
};

export default Timer;
