import { atomWithStorage } from "jotai/utils";

interface User {
  email: string;
  username: string;
  password: string;
  token: string;
}

export const reg =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const userAtom = atomWithStorage<User>("user", {
  email: "",
  username: "",
  password: "",
  token: "",
});

export const loginAtom = atomWithStorage<boolean>("login", false);
