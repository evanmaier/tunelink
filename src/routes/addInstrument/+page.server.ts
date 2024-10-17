import { FieldValue } from 'firebase-admin/firestore';
import type { Actions } from './$types';
import { adminDB } from '$lib/server/admin';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const uid = data.get('uid') as string;
		const available = data.get('available') as string;

		const instrument = {
			available: available == 'on',
			category: data.get('category') as string,
			condition: data.get('condition') as string,
			timestamp: FieldValue.serverTimestamp(),
			description: data.get('description') as string,
			_geoloc: {
				lat: Number(data.get('lat') as string),
				lng: Number(data.get('lng') as string)
			},
			name: data.get('name') as string,
			owner: uid,
			imageURL: data.get('imageURL') as string,
			price: parseInt(data.get('price') as string)
		};

		console.log(instrument);

		try {
			await adminDB.collection('instruments').add(instrument);
		} catch (error: any) {
			return fail(400, { error: error.message });
		}

		return { success: true };
	}
};
