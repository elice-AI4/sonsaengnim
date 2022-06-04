import React from "react";
import { FC } from "react";

type GreetingProps = {
  name: string;
};

// error!
// const Greeting: FC<GreetingProps> = ({ name }) => {
//   return <h1>hello {name}</h1>;
// };

const Greeting = ({ name }: GreetingProps) => {
  return <h1>hello {name}</h1>;
};

Greeting.defaultProps = {
  name: "World",
};

const FCTest = () => {
  return (
    <>
      <Greeting />
    </>
  );
};

export default FCTest;
