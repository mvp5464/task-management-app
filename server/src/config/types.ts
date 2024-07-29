import { z } from "zod";

export const signUpZod = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export const signInZod = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const TaskZod = z.object({
  title: z.string(),
  description: z.string().optional(),
  status: z.string(),
  priority: z.enum(["Low", "Medium", "Urgent", "null"]).optional(),
  deadline: z.date().nullable().optional(),
});

export type SignUpType = z.infer<typeof signUpZod>;
export type SignInType = z.infer<typeof signInZod>;
export type TaskType = z.infer<typeof TaskZod>;
