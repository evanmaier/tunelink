import type { PageServerLoad } from './$types';
import { adminDB } from '$lib/server/admin';

export const load: PageServerLoad = async ({ params }) => {
	const ref = adminDB.collection('instruments').doc(params.id);
	const doc = await ref.get();
	return {
		instrument: doc.data()
	};
};
