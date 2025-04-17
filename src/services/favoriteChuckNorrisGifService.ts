import { db } from "@/firebase/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import { CreateFavoriteChuckNorrisGif, FavoriteChuckNorrisGif } from "@/models/chuckNorrisGif";

export const favoriteChuckNorrisGifService = {
    async addFavoriteChuckNorrisGifs(chuckGif: CreateFavoriteChuckNorrisGif, userId: string) {
        try {
            const chuckGifWithMeta = {
                ...chuckGif,
                userId,
                createdAt: new Date().toISOString()
            };
            const docRef = await addDoc(collection(db, "favoriteChuckNorrisGifs"), chuckGifWithMeta);
            return { ...chuckGifWithMeta, dataId: docRef.id } as FavoriteChuckNorrisGif;
        } catch (error) {
            console.error("Error adding favorite Chuck Norris Gif:", error);
            throw error;
        }
    },

    async getFavoriteChuckNorrisGifs(userId: string): Promise<FavoriteChuckNorrisGif[]> {
        try {
            const q = query(
                collection(db, "favoriteChuckNorrisGifs"), 
                where("userId", "==", userId)
            );
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({
                dataId: doc.id,
                ...doc.data()
            } as FavoriteChuckNorrisGif));
        } catch (error) {
            console.error("Error getting favorite Chuck Norris Gif:", error);
            throw error;
        }
    },

    async removeFavoriteChuckNorrisGif(dataId: string) {
        try {
            await deleteDoc(doc(db, "favoriteChuckNorrisGifs", dataId));
        } catch (error) {
            console.error("Error removing favorite Chuck Norris Gif:", error);
            throw error;
        }
    }
};