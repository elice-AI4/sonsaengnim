import React, { useRef } from "react";
import { Box, ConstraintBox } from "./Gestures.style";

const boxVariants = {
  hover: { scale: 1.5, rotateZ: "90deg" },
  tab: { borderRadius: "100px", scale: 1 },
  drag: { backgroundColor: "rgb(46,123,250)", transition: { duration: 2 } },
};

const Gestures = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <ConstraintBox ref={containerRef}>
      <Box
        drag /* "x" || "y" 로 drag 축 고정 가능 */
        dragElastic={0.5} /* force Elastic : 마우스에 탄성 */
        dragSnapToOrigin /* 원래자리로 돌아가기 */
        /* 드래그 영역 제한 {top: 50, bottom: 50, left: 50,right: 50} or ref설정 */
        //   dragConstraints={biggerBoxRef}
        variants={boxVariants}
        whileHover="hover"
        whileDrag="drag"
        whileTap="tab"
      />
    </ConstraintBox>
  );
};

export default Gestures;
