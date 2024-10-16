import { adminDB, adminAuth } from '$lib/server/admin';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
	username: async ({ request }) => {
		const data = await request.formData();
		const uid = data.get('uid') as string;
		const username = data.get('username') as string;
		const userRef = adminDB.collection('users').doc(uid);
		try {
			await userRef.update({ username });
		} catch (error: any) {
			return fail(400, { error: error.message });
		}
		return { success: true };
	},

	password: async ({ request }) => {
		const data = await request.formData();
		const uid = data.get('uid') as string;
		const password = data.get('password') as string;
		try {
			await adminAuth.updateUser(uid, { password });
		} catch (error: any) {
			return fail(400, { error: error.message });
		}
		return { success: true };
	},

	delete: async ({ request }) => {
		const data = await request.formData();
		const uid = data.get('uid') as string;
		try {
			await adminAuth.deleteUser(uid);
		} catch (error: any) {
			return fail(400, { error: error.message });
		}
		return { success: true };
	}
}
