import type { Actions } from './$types';
import { adminDB } from '$lib/server/admin';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		const available = data.get('available') as string;
		const name = data.get('name') as string;
		const price = data.get('price') as string;
		const condition = data.get('condition');
		const description = data.get('description') as string;

		try {
			const ref = adminDB.collection('instruments').doc(id);
			await ref.update({
				available: available == 'on',
				name,
				price: parseInt(price),
				condition,
				description
			});
		} catch (error: any) {
			return fail(400, { error: error.message });
		}
		redirect(302, '/yourInstruments');
	}
} satisfies Actions;
