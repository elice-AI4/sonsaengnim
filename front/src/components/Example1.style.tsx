import { motion } from "framer-motion";
import styled from "styled-components";

export const UL = styled(motion.ul)`
  width: 150px;
  height: 150px;
  display: grid;
  overflow: hidden;
  margin: 0;
  list-style: none;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 15px;
  padding: 15px;
  background-color: red;
  border-radius: 50px;
`;

export const LI = styled(motion.li)`
  background: white;
  border-radius: 100%;
`;
