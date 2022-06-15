import { countAtom } from "./state";
import { useAtom } from "jotai";
import React from "react";

function Test1() {
  const [, setCount] = useAtom(countAtom);
  return <button onClick={() => setCount((c: number) => c + 1)}>+</button>;
}

export default Test1;
