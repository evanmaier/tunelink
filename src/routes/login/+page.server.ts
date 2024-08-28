import type { Actions } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import { auth } from "$lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export const actions: Actions = {
	signIn: async ({request}) => {
	    const formData = await request.formData();
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredential);
        } catch (error) {
            console.error(error);
        }
        throw redirect(303, '/dashboard');
	},

    signUp: async ({request}) => {
        const formData = await request.formData();
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log(userCredential);
        } catch (error) {
            console.error(error);
        }
        throw redirect(303, '/dashboard');
    }
};
