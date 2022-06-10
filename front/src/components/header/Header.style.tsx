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
      z-index: 999;
    `;
  }};
`;

export const TitleContainer = styled.div`
  margin: 0 2rem 0 2rem;
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

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  padding: 1rem;
  /* margin-right: 1rem; */
  ${({ theme }) => {
    return css`
      font-size: ${theme.navbar.link.fontSize};
      font-weight: ${theme.navbar.link.fontWeight};
    `;
  }}
`;
