import { fail, redirect, type Actions } from "@sveltejs/kit";
import { auth } from "$lib/firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { z } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate } from 'sveltekit-superforms';

const loginSchema = z.object({
    email: z.string().trim().email({message: "must be valid email"}).min(1),
    password: z.string().trim().min(8, {message: "must be at least 8 characters long"})
});

const defaults = { email: 'example@mail.com', password: 'password' }

export const load = async() => {
    const form = await superValidate(zod(loginSchema, { defaults }));
    return { form };
}

export const actions: Actions = {
	default: async ({request}) => {
	    const form = await superValidate(request, zod(loginSchema, { defaults }));

        if (!form.valid) {
            return fail(400, { form });
        }

        try {
            await signInWithEmailAndPassword(auth, form.data.email, form.data.password);
        } catch (error) {
			return message(form, 'invalid credentials', { status: 400 });
        }
        console.log("success");
        redirect(303, '/');
	}
};
