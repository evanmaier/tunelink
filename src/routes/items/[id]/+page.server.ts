import { adminDB } from '$lib/server/admin.js';

export async function load({ params }) {
    try {
        const docRef = adminDB.collection('instruments').doc(params.id);
        const doc = await docRef.get();

        if (doc.exists) {
            return doc.data()        
        } else {
            console.log('No such document!');
            return null;
        }
    } catch (error) {
        console.error('Error fetching document:', error);
        return null;
    }
}