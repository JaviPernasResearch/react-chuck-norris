import {atom} from "jotai";
import {FavoriteCatPic } from "@/models/catPic";

export const catPicsState = atom<FavoriteCatPic[]>([]);
