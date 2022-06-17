import styled, { css } from "styled-components";

export const ListWrapper = styled.div`
  /* display: flex; */
  width: 300px;
  height: 200px;
  position: fixed;
  transform: translate(0, 50%);
`;

export const Ul = styled.ul`
  padding-left: 4rem;
`;

export const List = styled.li`
  list-style: none;
  cursor: pointer;
  ${({ theme }) => {
    return css`
      &.clicked {
        font-weight: 800;
        color: orangered;
      }
      &:hover {
        text-decoration: underline;
      }
    `;
  }}

  position: relative;
  left: 10px;

  margin-bottom: 0.5rem;

  &.clicked::before {
    transform: scale(1);
  }

  ::before {
    position: absolute;
    top: 1.15rem;
    left: -1.2rem;
    transition: all 0.3s ease;
    transform: scale(0);
    width: 8px;
    height: 8px;

    border-radius: 50%;
    content: "";
    ${({ theme }) => {
      return css`
        background-color: orange;
      `;
    }}
    display:inline-block;
    text-decoration: none;
  }
`;

export const P = styled.p`
  margin-bottom: 0;
  font-size: 2.3rem;
`;
