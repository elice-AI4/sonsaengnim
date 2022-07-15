import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const Navbar = styled.nav`
  ${({ theme }) => {
    return css`
      background-color: ${theme.navbar.backgroundColor};
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: fixed;
      transform: translate(0, 0);
      width: 100%;
      z-index: 10;
    `;
  }};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const TitleContainer = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    align-self: flex-start;
  }
`;

export const Hamburder = styled.img`
  position: absolute;
  z-index: 11;
  width: 40px;
  height: 40px;
  right: 2rem;
  cursor: pointer;
  visibility: hidden;
  @media (max-width: 768px) {
    top: 2.5rem;
    visibility: visible;
  }
`;

export const List = styled.div<{ fold: boolean }>`
  display: flex;
  justify-content: center;
  margin-right: 1rem;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-right: 0;
    height: ${(props) => (props.fold ? "0px" : "342px")};
    opacity: ${(props) => (props.fold ? "0" : "1")};
    pointer-events: ${(props) => (props.fold ? "none" : "auto")};
  }
`;

export const DefaultLink = styled(Link)`
  text-decoration: none;
  color: black;
  padding: 1rem;
`;

export const HomeLink = styled(DefaultLink)``;

export const StyledLink = styled(DefaultLink)`
  position: relative;
  ${({ theme }) => {
    return css`
      font-size: ${theme.navbar.link.fontSize};
      font-weight: ${theme.navbar.link.fontWeight};
      border: 5px solid transparent;
    `;
  }}
  @media (max-width: 768px) {
    width: 100vw;
    text-align: center;
    &:hover {
      background-color: #ffc774;
    }
  }

  @media (min-width: 769px) {
    &:hover {
      &::after {
        content: "";
        position: absolute;
        width: 80%;
        height: 0.5rem;
        left: 50%;
        transform: translate(-50%, 28px);
        ${({ theme }) => {
          return css`
            background-color: ${theme.navbar.link.hoverLineColor};
          `;
        }}
      }
    }
  }
`;

const Line = styled.div`
  width: 100vw;
  background-color: #ffc774;
  position: absolute;
  width: 100%;
  z-index: 2;
`;

export const ThickLine = styled(Line)`
  height: 1.3rem;
  margin-bottom: 0.3rem;
  position: fixed;
  ${({ theme }) => {
    return css`
      transform: translateY(${theme.navbar.height});
    `;
  }}
`;

export const ThinLine = styled(Line)`
  height: 0.3rem;
  position: fixed;
  ${({ theme }) => {
    return css`
      transform: translateY(calc(${theme.navbar.height} + 1.6rem));
    `;
  }}
`;

export const Offset = styled.div`
  ${({ theme }) => {
    return css`
      height: ${theme.navbar.height};
    `;
  }}
`;

export const WelcomeBox = styled.h2`
  text-align: center;
  padding-top: 25px;
`;
