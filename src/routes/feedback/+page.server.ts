import { adminDB } from '$lib/server/admin';
import { FieldValue } from 'firebase-admin/firestore';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		try {
			const res = await adminDB.collection('feedback').add({
				content: data.get('content') as string,
				timestamp: FieldValue.serverTimestamp()
			});
		} catch (error: any) {
			return fail(400, { error: error.message });
		}
		return { success: true };
	}
};
