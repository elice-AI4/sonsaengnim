import React from "react";
import { List, ListWrapper, P, Ul } from "./ScrollList.style";

interface ScrollListProps {
  handleOnClick: (num: number) => void;
  scrollNames: string[];
  curIndex: number;
}
const ScrollList = ({
  handleOnClick,
  scrollNames,
  curIndex,
}: ScrollListProps) => {
  const handleClickList = (num: number) => {
    return () => {
      handleOnClick(num);
    };
  };
  return (
    <ListWrapper>
      <Ul>
        {scrollNames.map((n: string, index: number) => {
          return (
            <List
              key={"scroll" + index}
              onClick={handleClickList(index)}
              className={curIndex === index ? "clicked" : ""}
            >
              <P>{n}</P>
            </List>
          );
        })}
      </Ul>
    </ListWrapper>
  );
};

export default ScrollList;
