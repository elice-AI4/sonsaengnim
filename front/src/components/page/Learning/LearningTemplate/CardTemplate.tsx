import React, { CSSProperties, useRef } from "react";
import { Card } from "./CardTemplate.style";
import { motion } from "framer-motion";
import { useLocation } from "react-router";

interface CardTemplateProps {
  src: string;
  alt: string;
  style?: CSSProperties;
}

const boxVariants = {
  hover: { scale: 1.3, rotateZ: "360deg" },
  tab: { borderRadius: "100px", scale: 1.2 },
  drag: { backgroundColor: "rgb(46,123,250)", transition: { duration: 2 } },
};

const CardTemplate = ({ src, alt, style }: CardTemplateProps) => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const checkPathname = () => {
    if (pathname.includes("alphabet")) {
      return true;
    }
    return false;
  };
  return (
    <Card
      src={src}
      ref={constraintsRef}
      check={checkPathname()}
      style={style && style}
    >
      <motion.img
        src={src}
        alt={alt}
        width={"100%"}
        drag
        variants={boxVariants}
        whileHover="hover"
        whileDrag="drag"
        whileTap="tab"
        dragElastic={0.5} /* force Elastic : 마우스에 탄성 */
        dragConstraints={constraintsRef}
        style={{
          borderRadius: "30px",
        }}
      />
    </Card>
  );
};
export default CardTemplate;
