import { useAtom } from "jotai";
import React from "react";
import { textAtom, textLenAtom, uppercaseAtom } from "../atoms/TextLength";

const Input = () => {
  const [text, setText] = useAtom(textAtom);
  return <input value={text} onChange={(e) => setText(e.target.value)}></input>;
};

const CharCount = () => {
  const [len] = useAtom(textLenAtom);
  return <div>Length: {len}</div>;
};

const Uppercase = () => {
  const [uppercase] = useAtom(uppercaseAtom);
  return <div>Uppercase: {uppercase}</div>;
};

const TextLength = () => {
  return (
    <>
      <h1>TEXT Length Test</h1>
      <Input />
      <CharCount />
      <Uppercase />
    </>
  );
};

export default TextLength;
