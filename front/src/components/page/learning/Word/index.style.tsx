import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem auto auto;
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
