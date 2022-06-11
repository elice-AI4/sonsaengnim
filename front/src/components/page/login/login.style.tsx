import styled, { css } from "styled-components";
import LoginImg from "./login.jpg";

export const LoginPage = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginBackground = styled.div<{ loginImg: string }>`
  background-image: ${(props) => `url(${props.loginImg})`};
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1000;
  width: 1000px;
  height: 780px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginForm = styled.form`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  width: 500px;
  height: 250px;
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LoginInput = styled.input`
  width: 200px;
  height: 40px;
  font-size: 15px;
  margin-bottom: 15px;
`;

export const InputBox = styled.div`
  width: 300px;
  height: 50px;
  display: flex;
  justify-content: space-between;
`;

export const LoginButton = styled.button`
  margin-top: 10px;
  width: 120px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid #1e90ff;
  background-color: #1e90ff;
  cursor: pointer;
  font-weight: bold;
`;

export const ValidWord = styled.p`
  color: red;
  font-weight: bold;
`;
