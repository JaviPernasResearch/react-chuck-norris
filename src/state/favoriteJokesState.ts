import {atomWithStorage} from "jotai/utils";
import {FavoriteJoke} from "@/models/joke";

//atomWithStorage already handles localStorage interactions internally
export const favoriteJokesState = atomWithStorage<FavoriteJoke[]>(
    'chuckNorrisFavorites', 
    []);



// With Jotai, you don't need a FavoritesContext anymore. Here's why:
// Jotai vs Context

// Jotai already provides global state management
// It's more lightweight than Context
// It handles updates and subscriptions efficiently
// It includes built-in persistence with atomWithStorage
// Current Structure Your current approach using Jotai's atomWithStorage is already providing:

// Global state management
// localStorage persistence
// Type safety
// Efficient updates
