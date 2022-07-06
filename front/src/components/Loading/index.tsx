import React from "react";
import { Img, StyledLoading } from "./index.style";
import Limg from "../../src_assets/alphabet/L.png";
import Oimg from "../../src_assets/alphabet/O.png";
import Aimg from "../../src_assets/alphabet/A.png";
import Dimg from "../../src_assets/alphabet/D.png";
import Iimg from "../../src_assets/alphabet/I.png";
import Nimg from "../../src_assets/alphabet/N.png";
import Gimg from "../../src_assets/alphabet/G.png";
const Loading = () => {
  return (
    <StyledLoading>
      <div>
        <Img src={Limg} />
        <Img src={Oimg} />
        <Img src={Aimg} />
        <Img src={Dimg} />
        <Img src={Iimg} />
        <Img src={Nimg} />
        <Img src={Gimg} />
      </div>
      <h1>카메라가 준비 중이에요.</h1>
    </StyledLoading>
  );
};

export default Loading;
