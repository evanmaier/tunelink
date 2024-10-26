import { adminDB } from '$lib/server/admin';
import { FieldValue } from 'firebase-admin/firestore';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, params, locals }) => {
		const data = await request.formData();
		const startDate = data.get('startDate') as string;
		const endDate = data.get('endDate') as string;
		const message = data.get('message') as string;

		const docSnap = await adminDB.collection('instruments').doc(params.id).get();

		try {
			const requestRef = await adminDB.collection('requests').add({
				status: 'pending',
				instrumentID: params.id,
				ownerID: docSnap.get('owner'),
				renterID: locals.userID,
				Dates: {
					start: startDate,
					end: endDate
				}
			});
			await adminDB.collection('requests').doc(requestRef.id).collection('messages').add({
				message: message,
				senderID: locals.userID,
				timestamp: FieldValue.serverTimestamp()
			});
			return { success: true };
		} catch (error: any) {
			return fail(400, { error: error.message });
		}
	}
};
