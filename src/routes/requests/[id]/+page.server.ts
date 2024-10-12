import { adminDB } from '$lib/server/admin';
import { Filter, type QueryDocumentSnapshot } from 'firebase-admin/firestore';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const requestsRef = adminDB.collection('requests');

	const sentRequests = await requestsRef.where('renterID', '==', params.id).get();
	const receivedRequests = await requestsRef.where('ownerID', '==', params.id).get();

	const allDocs = [...sentRequests.docs, ...receivedRequests.docs];

	let requestData = await Promise.all(
		allDocs.map(async (doc: QueryDocumentSnapshot) => {
			const id = doc.get('instrumentID');
			const instrumentDoc = await adminDB.collection('instruments').doc(id).get();
			const lastMessageSnapshot = await requestsRef
				.doc(doc.id)
				.collection('messages')
				.orderBy('timestamp')
				.limit(1)
				.get();

			const lastMessage = lastMessageSnapshot.docs[0];

			return {
				imageURL: instrumentDoc.get('imageURL') as string,
				message: lastMessage?.get('message') || '',
				date: lastMessage?.get('timestamp').toDate()
			};
		})
	);

	requestData.sort((a, b) => b.date - a.date);

	return {
		requests: requestData
	};
};
