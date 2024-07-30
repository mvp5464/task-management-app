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
  _id: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  status: z.string(),
  priority: z.enum(["Low", "Medium", "Urgent", ""]).optional(),
  deadline: z.string().optional(),
});

export const TaskDeleteZod = z.object({
  _id: z.string(),
});

export type SignUpType = z.infer<typeof signUpZod>;
export type SignInType = z.infer<typeof signInZod>;
export type TaskType = z.infer<typeof TaskZod>;
export type TaskDeleteType = z.infer<typeof TaskDeleteZod>;
