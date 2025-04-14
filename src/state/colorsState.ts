import {atom} from "jotai";
import {CreateFavoriteColor, FavoriteColor} from "@/models/randomColor";

export const colorsState = atom<FavoriteColor[]>([]);
