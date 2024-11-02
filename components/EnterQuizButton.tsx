"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/auth";

interface Props {
  id: string;
  end: string;
}

const EnterQuizButton = ({ id, end }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

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

    const res = await fetch(`/api/quiz/enter?id=${id}&user_id=${user?.email}`);

    const body = await res.json();

    if (res.status === 403) {
      toast({
        title: body.error,
        description: body.message,
        variant: "default",
      });
    }

    if (res.status === 302) {
      localStorage.setItem("end", end);
      router.push("/quiz/attempt");
    }
  };

  return (
    <Button disabled={loading} onClick={() => enterQuiz(id)}>
      Enter Quiz
    </Button>
  );
};

export default EnterQuizButton;
