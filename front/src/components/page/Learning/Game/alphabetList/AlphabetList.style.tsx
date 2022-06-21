import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  margin: auto;
`;
export const AlphabetButton = styled.div`
  width: 7rem;
  height: 5rem;

  margin: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 2rem;
  cursor: pointer;

  transition: all 0.2s ease-in;

  ${({ theme }) => {
    return css`
      &:hover {
        background-color: ${theme.learning.play.cyan};
      }
      border-radius: 20px;
      border: 2px solid ${theme.learning.play.darkBlue};
    `;
  }}
  &.target {
    background-color: ${(props) => props.theme.learning.play.cyan};
  }
  &.non-target {
    background-color: white;
  }
`;
