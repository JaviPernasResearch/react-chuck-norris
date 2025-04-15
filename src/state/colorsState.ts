import {atom} from "jotai";
import {FavoriteColor} from "@/models/randomColor";

export const colorsState = atom<FavoriteColor[]>([]);
