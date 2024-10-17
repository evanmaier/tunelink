import { adminAuth } from '$lib/server/admin';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
	username: async ({ request, locals }) => {
		if (locals.userID) {
			const data = await request.formData();
			const username = data.get('username') as string;
			try {
				await adminAuth.updateUser(locals.userID, { displayName: username });
			} catch (error: any) {
				return fail(400, { error: error.message });
			}
			return { success: true };
		}
		return fail(400, { error: 'missing userID' });
	},

	password: async ({ request, locals }) => {
		if (locals.userID) {
			const data = await request.formData();
			const password = data.get('password') as string;
			try {
				await adminAuth.updateUser(locals.userID, { password });
			} catch (error: any) {
				return fail(400, { error: error.message });
			}
			return { success: true };
		}
		return fail(400, { error: 'missing userID' });
	},

	delete: async ({ locals }) => {
		if (locals.userID) {
			try {
				await adminAuth.deleteUser(locals.userID);
			} catch (error: any) {
				return fail(400, { error: error.message });
			}
			return { success: true };
		}
		return fail(400, { error: 'missing userID' });
	}
};
