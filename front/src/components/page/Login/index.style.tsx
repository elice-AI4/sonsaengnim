import styled from "styled-components";

export const ModalInner = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex;
  justify-content: space-around;
  align-items: center;

  position: relative;
`;

export const ModalComment = styled.div`
  font-size: 2.5rem;
  background-color: white;
  border-radius: 1rem;

  width: 40rem;
  height: 30rem;

  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const P = styled.p`
  margin: 0 0 2rem 0;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const ModalButton = styled.button`
  position: absolute;
  bottom: 1rem;
  color: black;
  font-size: 2.8rem;
  font-weight: bold;
`;

export const PointWord = styled.b`
  color: orange;
`;

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
  background-position: center;
  width: 1000px;
  height: 780px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginForm = styled.form`
  background-color: rgba(255, 255, 255, 0.9);
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

export const LoginButton = styled.input`
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
