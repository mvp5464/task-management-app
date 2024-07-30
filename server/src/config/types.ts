import { z } from "zod";

export const signUpZod = z.object({
  _id: z.string().optional(),
  fullName: z.string().min(1, "The name field is required."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
});

export const signInZod = z.object({
  _id: z.string().optional(),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
});

export const TaskZod = z.object({
  _id: z.string(),
  userId: z.string().optional(),
  title: z.string().min(1, "The title field is required."),
  description: z.string().optional(),
  status: z.string().min(1, "The status field is required"),
  priority: z.enum(["Low", "Medium", "Urgent", ""]).optional(),
  deadline: z.string().optional(),
});

export const TaskDeleteZod = z.object({
  _id: z.string().min(1),
});

export type SignUpType = z.infer<typeof signUpZod>;
export type SignInType = z.infer<typeof signInZod>;
export type TaskType = z.infer<typeof TaskZod>;
export type TaskDeleteType = z.infer<typeof TaskDeleteZod>;
