import { adminDB } from '$lib/server/admin';
import { FieldValue } from 'firebase-admin/firestore';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const ref = adminDB.collection('requests');
	const sent = await ref.where('renterID', '==', locals.userID).get();
	if (sent.empty) {
		return { existingRequest: false };
	} else {
		return { existingRequest: true };
	}
};

export const actions = {
	default: async ({ request, params }) => {
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
				renterID: uid,
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
