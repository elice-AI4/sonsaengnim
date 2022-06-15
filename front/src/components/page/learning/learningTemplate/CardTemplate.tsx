import React, { forwardRef, useRef } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { Card, CardImg } from "./CardTemplate.style";
import { BoundingBox, motion } from "framer-motion";

interface CardTemplateProps {
  src: string;
  alt: string;
  dragConstraints?:
    | false
    | Partial<BoundingBox>
    | React.RefObject<Element>
    | undefined;
}

const boxVariants = {
  hover: { scale: 1.3, rotateZ: "360deg" },
  tab: { borderRadius: "100px", scale: 1.2 },
  drag: { backgroundColor: "rgb(46,123,250)", transition: { duration: 2 } },
};

const CardTemplate = ({ src, alt, dragConstraints }: CardTemplateProps) => {
  console.log(dragConstraints);

  const handleClickCard = () => {
    // navigate(`${pathname}/camera`);
  };
  return (
    <Card onClick={handleClickCard} src={src}>
      <CardImg
        src={src}
        alt={alt}
        drag
        dragElastic={0.5} /* force Elastic : 마우스에 탄성 */
        /* 드래그 영역 제한 {top: 50, bottom: 50, left: 50,right: 50} or ref설정 */
        dragConstraints={dragConstraints}
        variants={boxVariants}
        whileHover="hover"
        whileDrag="drag"
        whileTap="tab"
      />
    </Card>
  );
};
export default CardTemplate;
