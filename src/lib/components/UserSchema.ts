import { z } from 'zod';

export const userSchema = z.object({
    email: z.string().trim().email({message: "must be valid email"}).min(1),
    password: z.string().trim().min(8, {message: "must be at least 8 characters long"})
});