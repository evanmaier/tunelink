import type { Actions } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import { auth } from "$lib/firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';

export const actions: Actions = {
	default: async (event) => {
	    const formData = await event.request.formData();
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredential);
            throw redirect(302, '/dashboard');
        } catch (error) {
            console.error(error);
        }
	}
};
