import React, { useState } from "react";
import { Img } from "./ImageTooltip.style";

interface ImageTooltipProps {
  imgSrc: string;
}

const ImageTooltip = ({ imgSrc }: ImageTooltipProps) => {
  const [show, setShow] = useState(false);
  const onHover = () => {
    setShow(true);
  };
  const onLeave = () => {
    setShow(false);
  };

  return (
    <div onMouseEnter={onHover} onMouseLeave={onLeave}>
      <span>이미지 보기!</span>
      {show && <Img src={imgSrc} alt="temp" />}
    </div>
  );
};

export default ImageTooltip;
