import styled from "styled-components";

export const H1 = styled.h1`
  margin-bottom: 1rem;
`;

export const TemplateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;

  max-width: 1200px;
  min-width: 860px;

  height: 100%;

  margin: auto;
`;

export const DescriptionContainer = styled.section`
  width: 80%;
  flex: 0.4;

  padding: 4rem;
`;

export const CardContainer = styled.section`
  margin: auto;
  width: 80%;

  flex: 0.6;
  display: flex;
  flex-wrap: wrap;

  padding: 4rem;
`;
