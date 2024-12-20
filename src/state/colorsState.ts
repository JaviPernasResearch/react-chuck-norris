import {RandomColor} from "@/models/randomColor";
import {atom} from "recoil";

export const colorsState = atom<RandomColor[]>({
    key: "colorsState",
    default: [],
});
