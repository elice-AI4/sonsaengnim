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

  background-color: white;
  margin: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 2rem;
  cursor: pointer;

  transition: all 0.2s ease-in;
  &:hover {
    background-color: #9adcdd;
  }
  ${({ theme }) => {
    return css`
      border-radius: 20px;
      border: 2px solid ${theme.learning.play.darkBlue};
    `;
  }}
`;
