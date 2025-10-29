"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";

export function AuthForm() {
  return (
    <Button
      onClick={() =>
        signIn("google", {
          redirectTo: "/",
        })
      }
      variant={"outline"}
      className="h-12 w-full"
    >
      <Image src={"/google.svg"} width={24} height={24} alt="Google logo" />
      Sign In with Google
    </Button>
  );
}
