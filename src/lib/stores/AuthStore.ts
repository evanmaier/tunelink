import { onAuthStateChanged, type Auth } from "firebase/auth";
import { writable } from "svelte/store";
import { auth } from "$lib/firebase";

export function authStore(auth: Auth) {
    
    let unsubscribe: () => void;
    
    const { subscribe } = writable(auth.currentUser, (set) => {
        unsubscribe = onAuthStateChanged(auth, (user) => {
            set(user);
        });
        return () => unsubscribe();
    });

    return { subscribe };

}

export const user = authStore(auth);