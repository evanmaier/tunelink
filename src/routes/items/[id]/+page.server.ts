import type { PageServerLoad } from './$types';
import { adminDB } from '$lib/server/admin';
import { FieldValue, type DocumentData } from 'firebase-admin/firestore';
import { fail } from '@sveltejs/kit';

let instrumentData: DocumentData | undefined;

export const load: PageServerLoad = async ({ params }) => {
	const ref = adminDB.collection('instruments').doc(params.id);
	const doc = await ref.get();
	instrumentData = doc.data();

	return {
		name: instrumentData?.name,
		imageURL: instrumentData?.imageURL,
		description: instrumentData?.description
	};
};

export const actions = {
	default: async ({ request, params }) => {
		const data = await request.formData();
		const uid = data.get('uid') as string;
		const startDate = data.get('startDate') as string;
		const endDate = data.get('endDate') as string;
		const message = data.get('message') as string;

		try {
			const requestRef = await adminDB.collection('requests').add({
				instrumentID: params.id,
				ownerID: instrumentData?.owner,
				renterID: uid,
				timestamp: FieldValue.serverTimestamp(),
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
