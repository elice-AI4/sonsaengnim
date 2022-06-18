import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const Navbar = styled.nav`
  ${({ theme }) => {
    return css`
      height: ${theme.navbar.height};
      background-color: ${theme.navbar.backgroundColor};
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: fixed;
      transform: translate(0, 0);
      width: 100%;
      z-index: 2;
    `;
  }};
`;

export const TitleContainer = styled.div`
  padding: 1rem;
  cursor: pointer;
`;

export const Title = styled.p`
  margin: 0;
  ${({ theme }) => {
    return css`
      font-size: ${theme.navbar.title.fontSize};
      font-weight: ${theme.navbar.title.fontWeight};
    `;
  }}
`;

export const List = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
`;

export const DefaultLink = styled(Link)`
  text-decoration: none;
  color: black;
  padding: 1rem;
`;

export const HomeLink = styled(DefaultLink)``;

export const StyledLink = styled(DefaultLink)`
  position: relative;
  /* margin-right: 1rem; */
  ${({ theme }) => {
    return css`
      font-size: ${theme.navbar.link.fontSize};
      font-weight: ${theme.navbar.link.fontWeight};
    `;
  }}

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
  ${({ theme }) => {
    return css`
      transform: translateY(${theme.navbar.height});
    `;
  }}
`;

export const ThinLine = styled(Line)`
  height: 0.3rem;
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
