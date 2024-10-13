import { adminDB } from '$lib/server/admin';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const requestRef = adminDB.collection('requests').doc(params.id);

	const requestDoc = await requestRef.get();

	const messages = await requestRef.collection('messages').orderBy('timestamp').get();

	let messageData = messages.docs.map((doc) => {
		return {
			message: doc.get('message'),
			senderID: doc.get('senderID'),
			timestamp: doc.get('timestamp').toDate()
		};
	});

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
		requestID: requestRef.id,
		messages: messageData
	};
};
