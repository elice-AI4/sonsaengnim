import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

export interface User {
  email: string;
  username: string;
  password: string;
  token: string;
  point: number;
  myDonation: number;
}

export const reg =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const userAtom = atomWithStorage<User>("user", {
  email: "",
  username: "",
  password: "",
  token: "",
  point: 0,
  myDonation: 0,
});

export const loginAtom = atomWithStorage<boolean>("login", false);
export const saveTimeAtom = atom(600);
export const webcamExistAtom = atom(false);
