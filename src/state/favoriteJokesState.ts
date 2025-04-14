import {atom} from "jotai";
import {FavoriteJoke} from "@/models/joke";

export const favoriteJokesState = atom<FavoriteJoke[]>([]);

