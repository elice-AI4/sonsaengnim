import styled from "styled-components";

export const AlphabetContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;

  max-width: 1200px;
  height: 100%;
  /* max-height: 1200px; */
  border: 1px solid black;

  margin: auto;
`;

export const DescriptionContainer = styled.section`
  width: 80%;
  flex: 0.4;

  padding: 4rem;
`;

export const AlphabetCardContainer = styled.section`
  margin: auto;
  width: 80%;

  flex: 0.6;
  display: flex;
  flex-wrap: wrap;

  padding: 4rem;

  border: 1px solid black;
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 2rem 0 auto;
`;

export const Input = styled.input`
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid black;

  text-align: center;
  display: inline-block;
  font-size: 3rem;
  &:focus {
    outline: none;
  }
`;
