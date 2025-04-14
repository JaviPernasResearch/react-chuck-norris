import { db } from "@/firebase/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import { CreateFavoriteColor, FavoriteColor } from "@/models/randomColor";


export const favoriteColorsService = {
    async addFavoriteColor(color: CreateFavoriteColor, userId: string) {
        try {
            const colorWithMeta = {
                ...color,
                userId,
                createdAt: new Date().toISOString()
            };
            const docRef = await addDoc(collection(db, "favoriteColors"), colorWithMeta);
            return { ...colorWithMeta, dataId: docRef.id } as FavoriteColor;
        } catch (error) {
            console.error("Error adding favorite color:", error);
            throw error;
        }
    },

    async getFavoriteColors(userId: string): Promise<FavoriteColor[]> {
        try {
            const q = query(
                collection(db, "favoriteColors"), 
                where("userId", "==", userId)
            );
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({
                dataId: doc.id,
                ...doc.data()
            } as FavoriteColor));
        } catch (error) {
            console.error("Error getting favorite colors:", error);
            throw error;
        }
    },

    async removeFavoriteColor(dataId: string) {
        try {
            await deleteDoc(doc(db, "favoriteColors", dataId));
        } catch (error) {
            console.error("Error removing favorite color:", error);
            throw error;
        }
    }
};