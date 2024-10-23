import { fail, type Actions } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms';
import { loginSchema, registerSchema } from '$lib/components/Schemas';

export const load = async () => {
	const loginForm = await superValidate(zod(loginSchema));
	const registerForm = await superValidate(zod(registerSchema));

	return { loginForm, registerForm };
};

export const actions: Actions = {
	login: async ({ request }) => {
		const loginForm = await superValidate(request, zod(loginSchema));

		if (!loginForm.valid) {
			return fail(400, { loginForm });
		}

		return { loginForm };
	},
	register: async ({ request }) => {
		const registerForm = await superValidate(request, zod(registerSchema));

		if (!registerForm.valid) {
			return fail(400, { registerForm });
		}

		return { registerForm };
	}
};
