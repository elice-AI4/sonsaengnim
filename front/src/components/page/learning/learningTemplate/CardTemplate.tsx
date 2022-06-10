import React from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { Card, CardImg } from "./CardTemplate.style";
interface CardTemplateProps {
  src: string;
  alt: string;
}

const CardTemplate = ({ src, alt }: CardTemplateProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleClickCard = () => {
    navigate(`${pathname}/camera`);
  };
  return (
    <Card
      onClick={handleClickCard}
      style={{ opacity: src ? 1 : 0, pointerEvents: src ? "inherit" : "none" }}
    >
      <CardImg src={src} alt={alt} />
    </Card>
  );
};

export default CardTemplate;
