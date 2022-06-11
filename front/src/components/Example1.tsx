import { motion } from "framer-motion";
import React from "react";
import { LI, UL } from "./Example1.style";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const Example1 = () => {
  return (
    <UL
      className="container"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {[0, 1, 2, 3].map((index) => (
        <LI key={index} className="item" variants={item} />
      ))}
    </UL>
  );
};

export default Example1;
