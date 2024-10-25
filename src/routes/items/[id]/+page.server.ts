import { adminAuth, adminDB } from '$lib/server/admin';
import { FieldValue } from 'firebase-admin/firestore';
import { fail } from '@sveltejs/kit';
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

export const actions = {
	default: async ({ request, params, locals }) => {
		const data = await request.formData();
		const uid = data.get('uid') as string;
		const ownerID = data.get('ownerID') as string;
		const startDate = data.get('startDate') as string;
		const endDate = data.get('endDate') as string;
		const message = data.get('message') as string;

		try {
			const requestRef = await adminDB.collection('requests').add({
				status: 'pending',
				instrumentID: params.id,
				ownerID: ownerID,
				renterID: locals.userID,
				Dates: {
					start: startDate,
					end: endDate
				}
			});
			await adminDB.collection('requests').doc(requestRef.id).collection('messages').add({
				message: message,
				senderID: uid,
				timestamp: FieldValue.serverTimestamp()
			});
			return { success: true };
		} catch (error: any) {
			return fail(400, { error: error.message });
		}
	}
};
