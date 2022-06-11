import { motion } from "framer-motion";
import styled from "styled-components";

export const Card = styled(motion.div)<{ src: string }>`
  width: 125px;
  height: 100px;
  text-align: center;
  border-radius: 50px;

  margin: 1rem;

  /* transition: all 0.5s ease; */

  cursor: pointer;
  &:hover {
    /* transform: translateY(-0.7rem); */
    /* box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
      rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
      rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset; */
  }

  opacity: ${(props) => (props.src ? 1 : 0)};

  pointer-events: ${(props) => (props.src ? "auto" : "none")};
`;

export const CardImg = styled(motion.img)`
  width: 100px;
  height: 100px;
`;
