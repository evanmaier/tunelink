import { adminDB, adminAuth } from '$lib/server/admin';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const requestRef = adminDB.collection('requests').doc(params.id);

	const requestDoc = await requestRef.get();

	const instrumentDoc = await adminDB
		.collection('instruments')
		.doc(requestDoc.get('instrumentID'))
		.get();

	const renter = await adminAuth.getUser(requestDoc.get('renterID'));
	const owner = await adminAuth.getUser(requestDoc.get('ownerID'));

	return {
		imageURL: instrumentDoc.get('imageURL'),
		dates: requestDoc.get('Dates'),
		status: requestDoc.get('status'),
		ownerID: requestDoc.get('ownerID'),
		instrumentID: requestDoc.get('instrumentID'),
		ownerName: owner.displayName,
		renterName: renter.displayName
	};
};
