import {atom} from "jotai";
import { CatPic } from "@/models/catPic";

export const catPicsState = atom<CatPic[]>([]);
