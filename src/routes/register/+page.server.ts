import { fail, type Actions } from "@sveltejs/kit";
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms';
import { userSchema } from "$lib/components/UserSchema";

export const load = async() => {
    const form = await superValidate(zod(userSchema));
    return { form };
}

export const actions: Actions = {
	default: async ({request}) => {
	    const form = await superValidate(request, zod(userSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        return { form };

	}
};