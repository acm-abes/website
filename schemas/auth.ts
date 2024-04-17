import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email().min(3, {
    message: "Email is required",
  }),
  password: z.string(),
});

export const RegisterSchema = LoginSchema.extend({
  name: z.string().min(3, {
    message: "Name is required",
  }),
});
