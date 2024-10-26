import { adminAuth, adminDB } from '$lib/server/admin';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const sent = await adminDB.collection('requests').where('renterID', '==', locals.userID).get();

	const docSnap = await adminDB.collection('instruments').doc(params.id).get();
	const docData = docSnap.data();

	const owner = await adminAuth.getUser(docData?.owner);

	return {
		instrument: docData,
		existingRequest: !sent.empty,
		ownerName: owner.displayName
	};
};

