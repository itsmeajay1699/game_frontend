// features/auth/schema.ts
import { z } from "zod";

export const registerSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export type RegisterForm = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
    username: z.string().min(3, "Username is required"),
    password: z.string().min(1, "Password is required"),
});

export type LoginForm = z.infer<typeof loginSchema>;
