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
      newInfo[e.target.name as keyof UserLogin] = e.target.value; // ??????
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
          <img src={modalCharacter} alt="????????? ?????? ?????????" />
          <ModalComment>
            <P>
              <PointWord>?????????</PointWord>
            </P>
            <P>??????</P>
            <P>
              <PointWord>????????????</PointWord>
            </P>
            <P>??? ?????? ??? ?????????.</P>
          </ModalComment>
          <ModalButton>??????</ModalButton>
        </ModalInner>
      </Modal>
      ;
      <LoginPage>
        <LoginBackground loginImg={loginImg}>
          <LoginForm onSubmit={handleLogin}>
            <InputBox>
              <h2 style={{ fontWeight: "bold" }}>?????????</h2>
              <LoginInput
                type="email"
                placeholder="?????????"
                name="email"
                value={loginInfo.email}
                onChange={handleOnChange}
              />
            </InputBox>
            {!valid.idValid && (
              <ValidWord>????????? ????????? ???????????? ????????????.</ValidWord>
            )}
            <InputBox>
              <h2 style={{ fontWeight: "bold" }}>????????????</h2>
              <LoginInput
                type="password"
                placeholder="????????????"
                name="password"
                value={loginInfo.password}
                onChange={handleOnChange}
              />
            </InputBox>
            {!valid.pwValid && (
              <ValidWord>???????????? 8?????? ?????? ???????????????.</ValidWord>
            )}
            <LoginButton
              type="submit"
              value="?????????"
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
