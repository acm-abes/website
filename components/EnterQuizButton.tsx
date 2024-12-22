"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { LoadingButton } from "@/components/LoadingButton";

interface Props {
  id: string;
  end: string;
}

const EnterQuizButton = ({ id, end }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const { toast } = useToast();
  const { data } = useSession();

  useEffect(() => {
    fetch("/api/quiz/attempt").then(async (res) => {
      const body = await res.json();

      if (body.status) {
        toast({
          title: "You are already attempting",
          description: "You can still enter before time runs out",
        });
      }
    });
  }, [end]);

  const enterQuiz = async (id: string) => {
    setLoading(true);
    setLoadingText("Entering quiz...");
    let res;
    let body;
    try {
      res = await fetch(`/api/quiz/enter?id=${id}&user_id=${data?.user?.id}`);
      body = await res.json();
    } catch (e) {
      toast({
        title: "An error occurred",
        description: "Please contact support",
      });

      return;
    }

    if (res.status === 403) {
      toast({
        title: body.error,
        description: body.message,
        variant: "default",
      });
      setLoading(false);
    }

    if (res.status === 302) {
      setLoadingText("Redirecting...");
      localStorage.setItem("end", end);
      router.push("/quiz/attempt");
    }
  };

  return (
    <LoadingButton
      className={"w-full sm:max-w-[200px]"}
      loading={loading}
      loadingText={loadingText}
      onClick={() => enterQuiz(id)}
    >
      Enter Quiz
    </LoadingButton>
  );
};

export default EnterQuizButton;
