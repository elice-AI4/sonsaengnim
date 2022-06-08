import React from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { Card, CardImg } from "./CardTemplate.style";

interface AlphabetCardProps {
  src: string;
  alt: string;
}

const AlphabetCard = ({ src, alt }: AlphabetCardProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleClickCard = () => {
    navigate(`${pathname}/camera`);
  };
  return (
    <Card onClick={handleClickCard}>
      <CardImg src={src} alt={alt} />
    </Card>
  );
};

export default AlphabetCard;
