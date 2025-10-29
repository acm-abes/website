/** @format */

import React from "react";
import { Old_Standard_TT } from "next/font/google";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/AuthForm";

const oldStandardTT = Old_Standard_TT({
  subsets: ["latin"],
  weight: "400",
});

const AuthPage = async () => {
  const session = await auth();

  // Redirect if already logged in
  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <section className="flex h-full w-full flex-col items-center justify-center md:w-1/2">
        <div className="flex w-full max-w-xl flex-col gap-3 px-8">
          <h3 className={"text-4xl " + oldStandardTT.className}>Login with</h3>
          <AuthForm />
        </div>
      </section>
      <section className="relative hidden h-full w-1/2 flex-col items-center justify-center px-20 md:flex">
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
