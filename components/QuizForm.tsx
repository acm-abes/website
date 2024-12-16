"use client";

import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const QuizForm = () => {
  const quizFormSchema = z.object({
    quizCode: z.string(),
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof quizFormSchema>>();

  const onSubmit = async (data: z.infer<typeof quizFormSchema>) => {
    setLoading(true);
    const res = await fetch(`/api/quiz/find?code=${data.quizCode}`);
    setLoading(false);

    if (res.ok) {
      router.push(`/quiz/${data.quizCode}`);
      return;
    }
    toast({
      title: "Quiz not found",
      description: "Please enter a valid quiz code",
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full sm:w-2/3 md:w-1/2"
      >
        <FormField
          control={form.control}
          name="quizCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quiz Code</FormLabel>
              <FormControl>
                <Input placeholder="Enter a quiz code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default QuizForm;
