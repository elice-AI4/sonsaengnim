import { countAtom } from "./state";
import { useAtom } from "jotai";
import React from "react";

function Test1() {
  const [count] = useAtom(countAtom);
  return <h2>{count}</h2>;
}

export default Test1;
