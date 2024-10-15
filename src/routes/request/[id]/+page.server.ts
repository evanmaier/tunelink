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
		imageURL: instrumentDoc.get('imageURL') as string,
		price: instrumentDoc.get('price'),
		name: instrumentDoc.get('name') as string,
		dates: requestDoc.get('Dates'),
		status: requestDoc.get('status') as string,
		ownerID: requestDoc.get('ownerID') as string
	};
};
