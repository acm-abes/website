import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <div
      className={
        "w-full border space-y-10 h-[calc(100dvh-5rem)] flex flex-col items-center justify-center"
      }
    >
      <h1 className={"text-4xl"}>Seems like that's not an Event yet...</h1>

      <Button>
        <Link href={"/"}>Head Back to Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
