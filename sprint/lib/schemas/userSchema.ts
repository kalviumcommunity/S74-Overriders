import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long"),

  email: z
    .string()
    .email("Invalid email format"),

  age: z
    .number()
    .int("Age must be an integer")
    .min(18, "Age must be at least 18")
});
