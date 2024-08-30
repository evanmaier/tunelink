import { fail, type Actions } from "@sveltejs/kit";
import { auth } from "$lib/firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const actions: Actions = {
    default: async ({request}) => {
        const formData = await request.formData();
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            return fail(400, {error: true, message: "failed to sign up"});
        }
        console.log('success');
        return { success: true };
    }
};