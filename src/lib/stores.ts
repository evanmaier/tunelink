import { onAuthStateChanged, type Auth } from "firebase/auth";
import { writable } from "svelte/store";

export function userStore(auth: Auth) {
    
    let unsubscribe: () => void;
    
    const { subscribe } = writable(auth.currentUser, (set) => {
        unsubscribe = onAuthStateChanged(auth, (user) => {
            set(user);
        });
        return () => unsubscribe();
    });

    return { subscribe };

}