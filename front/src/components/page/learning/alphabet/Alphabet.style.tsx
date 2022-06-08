import styled from "styled-components";

export const AlphabetContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  max-width: 1200px;
  height: 100vh;
  max-height: 700px;
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
