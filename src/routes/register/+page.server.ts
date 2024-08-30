import { fail, redirect, type Actions } from "@sveltejs/kit";
import { auth } from "$lib/firebase";
import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate } from 'sveltekit-superforms';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { userSchema } from "$lib/components/UserSchema";

const defaults = { email: 'example@mail.com', password: 'password' }

export const load = async() => {
    const form = await superValidate(zod(userSchema, { defaults }));
    return { form };
}

export const actions: Actions = {
	default: async ({request}) => {
	    const form = await superValidate(request, zod(userSchema, { defaults }));

        if (!form.valid) {
            return fail(400, { form });
        }

        try {
            await createUserWithEmailAndPassword(auth, form.data.email, form.data.password);
        } catch (error) {
            return message(form, 'failed to create account', { status:400 });
        }
        console.log("success");
        redirect(303, '/');
	}
};