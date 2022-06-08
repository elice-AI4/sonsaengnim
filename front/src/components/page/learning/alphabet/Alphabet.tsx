import React from "react";
import {
  AlphabetCardContainer,
  AlphabetContainer,
  DescriptionContainer,
} from "./Alphabet.style";
import AlphabetCard from "./AlphabetCard";
import { ReactComponent as Underline } from "../../../../src_assets/Underline.svg";

const imgs = [
  {
    src: process.env.PUBLIC_URL + "/alphabet/alpha_1.png",
    alt: "A",
  },
  {
    src: process.env.PUBLIC_URL + "/alphabet/alpha_2.png",
    alt: "B",
  },
  {
    src: process.env.PUBLIC_URL + "/alphabet/alpha_3.png",
    alt: "C",
  },
  {
    src: process.env.PUBLIC_URL + "/alphabet/alpha_3.png",
    alt: "C",
  },
  {
    src: process.env.PUBLIC_URL + "/alphabet/alpha_3.png",
    alt: "C",
  },
  {
    src: process.env.PUBLIC_URL + "/alphabet/alpha_3.png",
    alt: "C",
  },
  {
    src: process.env.PUBLIC_URL + "/alphabet/alpha_3.png",
    alt: "C",
  },
];

const Alphabet = () => {
  return (
    <AlphabetContainer>
      <DescriptionContainer>
        <h1>A B C D부터 차근차근 알아가 볼까요?</h1>
        <Underline />
      </DescriptionContainer>
      <AlphabetCardContainer>
        {imgs.map((img, index) => {
          return (
            <AlphabetCard src={img.src} alt={img.alt} key={`img ${index}`} />
          );
        })}
      </AlphabetCardContainer>
    </AlphabetContainer>
  );
};

export default Alphabet;
