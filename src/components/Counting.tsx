import { atom, Provider, useAtom } from "jotai";
import React from "react";

const countAtom = atom<number>(0);

const Counting = () => {
  const [count, setCount] = useAtom(countAtom);
  return (
    <Provider>
      <h1>Test Counting!</h1>
      <div>
        <h3>{`show count!  ${count}`}</h3>
      </div>
      <button onClick={() => setCount((cur) => cur + 1)}>+ Click!</button>
      <button
        onClick={() =>
          setCount((cur) => {
            return cur >= 1 ? cur - 1 : cur;
          })
        }
      >
        - Click!
      </button>
    </Provider>
  );
};

export default Counting;
