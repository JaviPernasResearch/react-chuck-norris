import { db } from "@/firebase/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import { CreateFavoriteJoke, FavoriteJoke } from "@/models/joke";

export const favoriteJokesService = {
    async addFavoriteJoke(joke: CreateFavoriteJoke, userId: string) {
        try {
            const jokeWithMeta = {
                ...joke,
                userId,
                createdAt: new Date().toISOString()
            };
            const docRef = await addDoc(collection(db, "favoriteJokes"), jokeWithMeta);
            return { ...jokeWithMeta, dataId: docRef.id } as FavoriteJoke;
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
                dataId: doc.id,
                ...doc.data()
            } as FavoriteJoke));
        } catch (error) {
            console.error("Error getting favorite jokes:", error);
            throw error;
        }
    },

    async removeFavoriteJoke(dataId: string) {
        try {
            await deleteDoc(doc(db, "favoriteJokes", dataId));
        } catch (error) {
            console.error("Error removing favorite joke:", error);
            throw error;
        }
    }
};