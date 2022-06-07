import React from "react";
import { HelloLocal, HelloWorld, LocalStyled } from "./Hello.style";

interface TestProps {
  test: string;
}

const Hello = ({ test }: TestProps) => {
  return (
    <>
      <HelloWorld>{test}</HelloWorld>
      <h1>안녕!</h1>
      <HelloLocal>지역</HelloLocal>
      <LocalStyled>ddddd</LocalStyled>
    </>
  );
};

export default Hello;
