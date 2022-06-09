import React from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { Card, CardImg } from "./CardTemplate.style";
import image from "../../../../src_assets/alphabet/alpha_1.png";
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
    <Card onClick={handleClickCard}>
      <CardImg src={require(`../../../../${src}`)} alt={alt} />
    </Card>
  );
};

export default CardTemplate;
