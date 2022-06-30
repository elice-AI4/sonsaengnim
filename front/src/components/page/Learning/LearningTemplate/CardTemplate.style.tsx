import { motion } from "framer-motion";
import styled from "styled-components";

interface CardProps {
  src: string;
  check: boolean;
}

export const Card = styled(motion.div)<CardProps>`
  width: ${(props) => (props.check ? "10rem" : "16rem")};
  height: ${(props) => (props.check ? "10rem" : "12rem")};
  text-align: center;
  border-radius: 5px;

  margin: 1rem;

  cursor: pointer;
  &:hover {
    /* transform: translateY(-0.7rem); */
    /* box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
      rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
      rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset; */
  }

  opacity: ${(props) => (props.src ? 1 : 0)};

  pointer-events: ${(props) => (props.src ? "auto" : "none")};

  @media (max-width: 1270px) {
    font-size: 3rem;
  }
`;
