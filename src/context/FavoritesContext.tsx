'use client'

import { createContext, useContext, useState, useEffect } from 'react';
import { FavoriteJoke } from '@/models/FavoriteJoke';


interface FavoritesContextType {
    favorites: FavoriteJoke[];
    addFavorite: (FavoriteJoke: FavoriteJoke) => void;
    removeFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean;
}

// Creates the context with a default value of undefined. This lets us later check if it's used properly.
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
    const [favorites, setFavorites] = useState<FavoriteJoke[]>([]);

    // Effects hooks let a component connect to and synchronize with external systems
    // https://react.dev/reference/react/hooks
    // This runs once when the component loads. It tries to load saved favorites from localStorage.
    useEffect(() => {
        const savedFavorites = localStorage.getItem('chuckNorrisFavorites');
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    // This runs whenever the favorites change. It saves the current favorites to localStorage.
    useEffect(() => {
        localStorage.setItem('chuckNorrisFavorites', JSON.stringify(favorites));
    }, [favorites]);

    // The some() method checks if any array elements pass a test (provided as a callback function).
    // '===' => Strickt equality check: value and type must be the same.
    const addFavorite = (FavoriteJoke: FavoriteJoke) => {
        setFavorites(prev => {
            if (!prev.some(f => f.id === FavoriteJoke.id)) {
                // If the FavoriteJoke is not already in favorites, add it to the list.
                return [...prev, FavoriteJoke];
            }
            return prev;
        });
    };

    const removeFavorite = (id: string) => {
        // The filter() method creates a new array filled with elements that pass a test provided by a function.
        setFavorites(prev => prev.filter(FavoriteJoke => FavoriteJoke.id !== id));
    };

    const isFavorite = (id: string) => {
        return favorites.some(FavoriteJoke => FavoriteJoke.id === id);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}


//useFavorites() is essentially a wrapper around useContext(FavoritesContext), but it adds an extra safety check and improves code clarity.
export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
}