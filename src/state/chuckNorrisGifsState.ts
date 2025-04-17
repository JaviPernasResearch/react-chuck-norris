import {atom} from "jotai";
import {FavoriteChuckNorrisGif} from "@/models/chuckNorrisGif";

export const chuckNorrisGifsState = atom<FavoriteChuckNorrisGif[]>([]);
