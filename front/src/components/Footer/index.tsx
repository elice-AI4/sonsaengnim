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
          <>
            <FooterContent key={`${index} link`} href={link}>
              {contents[index]}
            </FooterContent>
          </>
        );
      })}
    </FooterContainer>
  );
};

export default Footer;
