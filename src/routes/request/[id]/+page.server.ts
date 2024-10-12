import { adminDB } from '$lib/server/admin';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const requestRef = adminDB.collection('requests').doc(params.id);
    const requestDoc = await requestRef.get();
    const messages = await requestRef.collection('messages').orderBy('timestamp').get();
    
    const instrumentDoc = await adminDB
		.collection('instruments')
		.doc(requestDoc.get('instrumentID'))
		.get();

    let instrumentData = instrumentDoc.data();
    delete instrumentData?.timestamp;

	return {
        instrument: instrumentData,
        messages: messages.docs,

    };
};
