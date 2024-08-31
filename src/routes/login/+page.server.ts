import { fail, type Actions } from "@sveltejs/kit";
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate, message } from 'sveltekit-superforms';
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

        return { form };
	}
};
