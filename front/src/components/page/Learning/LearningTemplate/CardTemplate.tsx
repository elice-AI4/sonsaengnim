import React, { useRef } from "react";
import { Card } from "./CardTemplate.style";
import { motion } from "framer-motion";

interface CardTemplateProps {
  src: string;
  alt: string;
}

const boxVariants = {
  hover: { scale: 1.3, rotateZ: "360deg" },
  tab: { borderRadius: "100px", scale: 1.2 },
  drag: { backgroundColor: "rgb(46,123,250)", transition: { duration: 2 } },
};

const CardTemplate = ({ src, alt }: CardTemplateProps) => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  return (
    <Card src={src} ref={constraintsRef}>
      <motion.img
        src={src}
        alt={alt}
        width="100px"
        height="100px"
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
