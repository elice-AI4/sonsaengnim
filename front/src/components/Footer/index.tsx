import React from "react";
import { FooterContent, FooterContainer } from "./index.style";

interface FooterProps {
  aLinks: string[];
  contents: string[];
}

const Footer = ({ aLinks, contents }: FooterProps) => {
  return (
    <FooterContainer>
      <h2>@copyright</h2>

      {aLinks?.map((link, index) => {
        return (
          <div key={`${index} link`}>
            <FooterContent href={link}>{contents[index]}</FooterContent>
          </div>
        );
      })}
    </FooterContainer>
  );
};

export default Footer;
