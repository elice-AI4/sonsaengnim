import { atom } from "jotai";

export const textAtom = atom<string>("hello, jotai!");
export const textLenAtom = atom((get) => get(textAtom).length);
export const uppercaseAtom = atom((get) => get(textAtom).toUpperCase());
