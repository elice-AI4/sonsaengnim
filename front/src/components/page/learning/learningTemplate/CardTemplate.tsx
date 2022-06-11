import React, { useRef } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { Card, CardImg } from "./CardTemplate.style";
interface CardTemplateProps {
  src: string;
  alt: string;
}

const boxVariants = {
  hover: { scale: 1.2, rotateZ: "360deg" },
  tab: { borderRadius: "100px", scale: 1 },
  drag: { backgroundColor: "rgb(46,123,250)", transition: { duration: 2 } },
};

const CardTemplate = ({ src, alt }: CardTemplateProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickCard = () => {
    // navigate(`${pathname}/camera`);
  };
  return (
    <Card onClick={handleClickCard} src={src} ref={containerRef}>
      <CardImg
        src={src}
        alt={alt}
        drag
        dragElastic={0.5} /* force Elastic : 마우스에 탄성 */
        dragSnapToOrigin /* 원래자리로 돌아가기 */
        /* 드래그 영역 제한 {top: 50, bottom: 50, left: 50,right: 50} or ref설정 */
        //   dragConstraints={biggerBoxRef}
        variants={boxVariants}
        whileHover="hover"
        whileDrag="drag"
        whileTap="tab"
      />
    </Card>
  );
};

export default CardTemplate;
