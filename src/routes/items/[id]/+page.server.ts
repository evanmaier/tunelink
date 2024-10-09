import type { PageServerLoad } from './$types';
import { adminDB } from '$lib/server/admin';

export const load: PageServerLoad = async ({ params }) => {
	const ref = adminDB.collection('instruments').doc(params.id);
	const doc = await ref.get();
    const data = doc.data();
    
	return {
        name: data?.name,
		imageURL: data?.imageURL,
        description: data?.description
	};
};
