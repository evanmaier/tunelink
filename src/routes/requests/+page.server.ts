import { adminDB } from '$lib/server/admin';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const requestsRef = adminDB.collection('requests');

	const sentRequests = await requestsRef.where('renterID', '==', locals.userID).get();
	const receivedRequests = await requestsRef.where('ownerID', '==', locals.userID).get();

	const allDocs = [...sentRequests.docs, ...receivedRequests.docs];

	let requestData = await Promise.all(
		allDocs.map(async (doc) => {
			const id = doc.get('instrumentID');
			const instrumentDoc = await adminDB.collection('instruments').doc(id).get();
			const lastMessageSnapshot = await requestsRef
				.doc(doc.id)
				.collection('messages')
				.orderBy('timestamp', 'desc')
				.limit(1)
				.get();

			const lastMessage = lastMessageSnapshot.docs[0];

			return {
				id: doc.id,
				status: doc.get('status') as string,
				imageURL: instrumentDoc.get('imageURL') as string,
				message: lastMessage?.get('message') || '',
				date: lastMessage?.get('timestamp').toDate()
			};
		})
	);

	requestData.sort((a, b) => b.date - a.date);

	return {
		pending: requestData.filter((data) => data.status == 'pending'),
		accepted: requestData.filter((data) => data.status == 'accepted'),
		declined: requestData.filter((data) => data.status == 'declined')
	};
};
