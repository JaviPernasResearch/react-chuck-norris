import { db } from "@/firebase/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";

interface FavoriteJoke {
    id: string;
    value: string;
    userId: string;
    isCustom?: boolean;
}

export const favoriteJokesService = {
    async addFavoriteJoke(joke: Omit<FavoriteJoke, 'id'>) {
        try {
            const docRef = await addDoc(collection(db, "favoriteJokes"), joke);
            return { ...joke, id: docRef.id };
        } catch (error) {
            console.error("Error adding favorite joke:", error);
            throw error;
        }
    },

    async getFavoriteJokes(userId: string): Promise<FavoriteJoke[]> {
        try {
            const q = query(
                collection(db, "favoriteJokes"), 
                where("userId", "==", userId)
            );
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as FavoriteJoke));
        } catch (error) {
            console.error("Error getting favorite jokes:", error);
            throw error;
        }
    },

    async removeFavoriteJoke(jokeId: string) {
        try {
            await deleteDoc(doc(db, "favoriteJokes", jokeId));
        } catch (error) {
            console.error("Error removing favorite joke:", error);
            throw error;
        }
    }
};