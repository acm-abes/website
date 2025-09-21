/** @format */
"use client";

import React from "react";
import { Old_Standard_TT } from "next/font/google";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";

const oldStandardTT = Old_Standard_TT({
  subsets: ["latin"],
  weight: "400",
});

const AuthPage = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <section className="flex h-full w-1/2 flex-col items-center justify-center">
        <div className="flex w-full max-w-xl flex-col gap-3">
          <h3 className={"text-4xl " + oldStandardTT.className}>Login with</h3>
          <Button
            onClick={() =>
              signIn("google", {
                redirectTo: "/",
              })
            }
            variant={"outline"}
            className="h-12 w-full"
          >
            <Image
              src={"/google.svg"}
              width={24}
              height={24}
              alt="Google logo"
            />
            Sign In with Google
          </Button>
        </div>
      </section>
      <section className="relative flex h-full w-1/2 flex-col items-center justify-center px-20">
        <h2 className={`${oldStandardTT.className} text-4xl`}>
          Turn your Ideas into
        </h2>
        <h1 className={`${oldStandardTT.className} text-8xl`}>REALITY</h1>
        <div className="bg-orb absolute -top-10 -left-10 h-60 w-60 rounded-full blur-3xl"></div>
        <div className="bg-orb absolute -right-10 -bottom-10 h-60 w-60 rounded-full blur-3xl"></div>
        <div className="absolute right-35 bottom-0 h-60 w-60 rounded-full bg-emerald-500/70 blur-3xl"></div>
        <div className="absolute bottom-[60%] left-20 h-60 w-60 rounded-full bg-rose-500/40 blur-3xl"></div>
      </section>
    </div>
  );
};

export default AuthPage;
