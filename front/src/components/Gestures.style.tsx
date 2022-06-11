import { motion } from "framer-motion";
import styled from "styled-components";

export const ConstraintBox = styled(motion.div)`
  width: 300px;
  height: 300px;
  display: flex;
  place-content: center;
  place-items: center;
  overflow: hidden;
  background: skyblue;
  border-radius: 30px;
`;

export const Box = styled(motion.div)`
  width: 150px;
  height: 150px;
  background: white;
  border-radius: inherit;
`;
