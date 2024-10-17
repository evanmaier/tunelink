import { fail, redirect, type Actions } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms';
import { registerSchema } from '$lib/components/Schemas';
import { adminAuth } from '$lib/server/admin';

export const load = async () => {
	const form = await superValidate(zod(registerSchema));
	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(registerSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		return { form };
	}
};
