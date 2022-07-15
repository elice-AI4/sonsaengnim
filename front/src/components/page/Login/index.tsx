import React, { useState, useEffect } from "react";
import {
  LoginBackground,
  LoginPage,
  LoginForm,
  LoginInput,
  InputBox,
  LoginButton,
  ValidWord,
  ModalInner,
  ModalComment,
  PointWord,
  P,
  ModalButton,
} from "./index.style";
import { useNavigate } from "react-router-dom";
import loginImg from "./login.jpg";
import { useAtom } from "jotai";
import { reg, userAtom, loginAtom } from "../../../state";
import modalCharacter from "../../../src_assets/main/search_sam.png";
import * as Api from "../../../api";

import Footer from "../../Footer";
import { loginCopyRights } from "../../copyRights/copyRights";
import Modal from "../Modal";

interface UserLogin {
  email: string;
  password: string;
}

interface LoginValid {
  idValid: boolean;
  pwValid: boolean;
}

const modalStyle = {
  fontSize: "2rem",
  width: "80rem",
  height: "45rem",
  padding: "0",
};

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);
  const [, setLogin] = useAtom(loginAtom);
  const [modal, setModal] = useState(false);

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
    try {
      const res = await Api.post("user", loginInfo);
      setUser({
        email: res.data.user.email,
        username: res.data.user.username,
        password: res.data.user.password,
        token: res.data.token,
        point: res.data.user.point,
        myDonation: res.data.user.myDonation,
      });
      setLogin(true);
      sessionStorage.setItem("userToken", res.data.token);
      navigate("/");
    } catch (e: any) {
      setModal(true);
    }
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
        pwValid: loginInfo.password.length >= 8 ? true : false,
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
      <Modal visible={modal} style={modalStyle} backGroundTransparent={true}>
        <ModalInner onClick={() => setModal(false)}>
          <img src={modalCharacter} alt="갸우뚱 하는 손생님" />
          <ModalComment>
            <P>
              <PointWord>아이디</PointWord>
            </P>
            <P>혹은</P>
            <P>
              <PointWord>비밀번호</PointWord>
            </P>
            <P>를 확인 해 주세요.</P>
          </ModalComment>
          <ModalButton>확인</ModalButton>
        </ModalInner>
      </Modal>
      ;
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
              <ValidWord>비밀번호 8글자 이상 필요합니다.</ValidWord>
            )}
            <LoginButton
              type="submit"
              value="로그인"
              disabled={!(valid.idValid && valid.pwValid)}
            ></LoginButton>
          </LoginForm>
        </LoginBackground>
        <Footer
          aLinks={loginCopyRights.aLinks}
          contents={loginCopyRights.contents}
        />
      </LoginPage>
    </>
  );
}

export default Login;
