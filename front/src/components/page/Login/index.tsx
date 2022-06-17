import React, { useState, useEffect } from "react";
import {
  LoginBackground,
  LoginPage,
  LoginForm,
  LoginInput,
  InputBox,
  LoginButton,
  ValidWord,
} from "./index.style";
import { useNavigate } from "react-router-dom";
import loginImg from "./login.jpg";
import { useAtom } from "jotai";
import { reg, userAtom } from "../../../state";
import * as Api from "../../../api";

interface UserLogin {
  email: string;
  password: string;
}

interface LoginValid {
  idValid: boolean;
  pwValid: boolean;
}

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);
  const [loginInfo, setLoginInfo] = useState<UserLogin>({
    email: "",
    password: "",
  });
  const [valid, setValid] = useState<LoginValid>({
    idValid: false,
    pwValid: false,
  });
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await Api.post("user", loginInfo);
    console.log(res.data);
    setUser({
      email: res.data.user.email,
      username: res.data.user.username,
      password: res.data.user.password,
      token: res.data.token,
    });
    navigate("/");
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo((cur): UserLogin => {
      const newInfo: UserLogin = { ...cur };
      newInfo[e.target.name as keyof UserLogin] = e.target.value; // 정석
      return newInfo;
    });
  };

  useEffect((): void => {
    if (loginInfo.email !== "") {
      setValid({
        ...valid,
        idValid:
          loginInfo.email.toLowerCase().match(reg) !== null ? true : false,
      });
    } else {
      setValid({
        ...valid,
        idValid: false,
      });
    }
  }, [loginInfo.email]);

  useEffect((): void => {
    if (loginInfo.password != "") {
      setValid({
        ...valid,
        pwValid: loginInfo.password.length >= 4 ? true : false,
      });
    } else {
      setValid({
        ...valid,
        pwValid: false,
      });
    }
  }, [loginInfo.password]);

  return (
    <>
      <LoginPage>
        <LoginBackground loginImg={loginImg}>
          <LoginForm onSubmit={handleLogin}>
            <InputBox>
              <h2 style={{ fontWeight: "bold" }}>아이디</h2>
              <LoginInput
                type="email"
                placeholder="이메일"
                name="email"
                value={loginInfo.email}
                onChange={handleOnChange}
              />
            </InputBox>
            {!valid.idValid && (
              <ValidWord>이메일 형식의 아이디가 아닙니다.</ValidWord>
            )}
            <InputBox>
              <h2 style={{ fontWeight: "bold" }}>비밀번호</h2>
              <LoginInput
                type="password"
                placeholder="비밀번호"
                name="password"
                value={loginInfo.password}
                onChange={handleOnChange}
              />
            </InputBox>
            {!valid.pwValid && (
              <ValidWord>비밀번호 4글자 이상 필요합니다.</ValidWord>
            )}
            <LoginButton
              type="submit"
              value="로그인"
              disabled={!(valid.idValid && valid.pwValid)}
            ></LoginButton>
          </LoginForm>
        </LoginBackground>
      </LoginPage>
    </>
  );
}

export default Login;
