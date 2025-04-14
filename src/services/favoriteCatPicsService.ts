import { db } from "@/firebase/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import { CreateFavoriteCatPic, FavoriteCatPic } from "@/models/catPic";

export const favoriteCatsService = {
    async addFavoriteCat(catPic: CreateFavoriteCatPic, userId: string) {
        try {
            const catWithMeta = {
                ...catPic,
                userId,
                createdAt: new Date().toISOString()
            };
            const docRef = await addDoc(collection(db, "favoriteCatPics"), catWithMeta);
            return { ...catWithMeta, dataId: docRef.id } as FavoriteCatPic;
        } catch (error) {
            console.error("Error adding favorite cat:", error);
            throw error;
        }
    },

    async getFavoriteCats(userId: string): Promise<FavoriteCatPic[]> {
        try {
            const q = query(
                collection(db, "favoriteCatPics"), 
                where("userId", "==", userId)
            );
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({
                dataId: doc.id,
                ...doc.data()
            } as FavoriteCatPic));
        } catch (error) {
            console.error("Error getting favorite cats:", error);
            throw error;
        }
    },

    async removeFavoriteCat(dataId: string) {
        try {
            await deleteDoc(doc(db, "favoriteCatPics", dataId));
        } catch (error) {
            console.error("Error removing favorite cat:", error);
            throw error;
        }
    }
};