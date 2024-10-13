import { adminDB } from '$lib/server/admin';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const requestRef = adminDB.collection('requests').doc(params.id);

	const requestDoc = await requestRef.get();

	const instrumentDoc = await adminDB
		.collection('instruments')
		.doc(requestDoc.get('instrumentID'))
		.get();

	return {
		imageURL: instrumentDoc.get('imageURL'),
		price: instrumentDoc.get('price'),
		name: instrumentDoc.get('name'),
		description: instrumentDoc.get('description'),
		dates: requestDoc.get('Dates'),
	};
};