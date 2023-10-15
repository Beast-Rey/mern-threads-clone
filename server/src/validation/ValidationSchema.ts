import { z } from "zod";

export const Registerschema = z.object({
  body: z.object({
    name: z.string().min(3).max(30),
    username: z.string().min(3).max(30),
    password: z.string(),
    email: z.string().email(),
  }),
});

export const Loginschema = z.object({
  body: z.object({
    username: z.string().min(3).max(30),
    password: z.string(),
  }),
});
