import { adminDB } from '$lib/server/admin';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const uid = locals.userID;

	if (!uid) {
		throw redirect(301, '/login');
	}

	const ref = adminDB.collection('instruments');
	const q = await ref.where('owner', '==', uid).get();

	const instruments = q.docs.map((doc) => {
		return {
			name: doc.get('name'),
			imageURL: doc.get('imageURL'),
			id: doc.ref.id
		};
	});

	return { instruments };
}) satisfies PageServerLoad;
