import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().trim().email({ message: 'must be valid email' }).min(1),
	password: z.string().trim().min(8, { message: 'must be at least 8 characters long' })
});

export const registerSchema = z.object({
	email: z.string().trim().email({ message: 'must be valid email' }).min(1),
	password: z.string().trim().min(8, { message: 'must be at least 8 characters long' }),
	username: z
		.string()
		.trim()
		.min(3)
		.max(16)
		.refine((value) => /^[a-zA-Z0-9]+$/.test(value), { message: 'Must be alphanumeric' })
});
