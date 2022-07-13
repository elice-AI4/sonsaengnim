import React, { useState, useEffect } from "react";
import {
  RegisterBackground,
  RegisterForm,
  InputBox,
  RegisterInput,
  ValidWord,
  RegisterButton,
  RegisterText,
  ModalInner,
  ModalComment,
  PointWord,
  P,
  ModalButton,
} from "./index.style";
import { reg } from "../../../state";
import { useNavigate } from "react-router-dom";
import * as Api from "../../../api";

import Footer from "../../Footer";
import { registerCopyRights } from "../../copyRights/copyRights";
import Modal from "../Modal";
import modalCharacter from "../../../src_assets/main/search_sam.png";

interface UserRegister {
  email: string;
  password: string;
  username: string;
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

function Register() {
  const navigate = useNavigate();
  const [registerInfo, setRegisterInfo] = useState<UserRegister>({
    email: "",
    password: "",
    username: "",
  });
  const [valid, setValid] = useState<LoginValid>({
    idValid: false,
    pwValid: false,
  });
  const [modal, setModal] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await Api.post("register", registerInfo);
      setRegisterInfo({
        email: "",
        password: "",
        username: "",
      });
      setValid({
        idValid: false,
        pwValid: false,
      });
      alert("회원가입이 완료되었습니다.");
      navigate("/login");
    } catch (e: any) {
      setModal(true);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterInfo((cur): UserRegister => {
      const newInfo: UserRegister = { ...cur };
      newInfo[e.target.name as keyof UserRegister] = e.target.value; // 정석
      return newInfo;
    });
  };
  useEffect((): void => {
    if (registerInfo.email !== "") {
      setValid({
        ...valid,
        idValid:
          registerInfo.email.toLowerCase().match(reg) !== null ? true : false,
      });
    } else {
      setValid({
        ...valid,
        idValid: false,
      });
    }
  }, [registerInfo.email]);

  useEffect((): void => {
    if (registerInfo.password != "") {
      setValid({
        ...valid,
        pwValid: registerInfo.password.length >= 8 ? true : false,
      });
    } else {
      setValid({
        ...valid,
        pwValid: false,
      });
    }
  }, [registerInfo.password]);

  return (
    <>
      <Modal visible={modal} style={modalStyle} backGroundTransparent={true}>
        <ModalInner onClick={() => setModal(false)}>
          <img src={modalCharacter} alt="갸우뚱 하는 손생님" />
          <ModalComment>
            <P>
              <PointWord>이미 존재하는</PointWord> 이메일입니다.
            </P>
            <P>
              <PointWord>다른 이메일</PointWord>로 다시 시도해주세요.
            </P>
          </ModalComment>
          <ModalButton>확인</ModalButton>
        </ModalInner>
      </Modal>
      ;
      <RegisterBackground>
        <RegisterForm onSubmit={handleRegister}>
          <InputBox>
            <RegisterText>아이디</RegisterText>
            <RegisterInput
              type="email"
              placeholder="이메일"
              name="email"
              value={registerInfo.email}
              onChange={handleOnChange}
            />
          </InputBox>
          {!valid.idValid && (
            <ValidWord>이메일 형식의 아이디가 아닙니다.</ValidWord>
          )}
          <InputBox>
            <RegisterText>비밀번호</RegisterText>
            <RegisterInput
              type="password"
              placeholder="비밀번호"
              name="password"
              value={registerInfo.password}
              onChange={handleOnChange}
            />
          </InputBox>
          {!valid.pwValid && (
            <ValidWord>비밀번호 8글자 이상 필요합니다.</ValidWord>
          )}
          <InputBox>
            <RegisterText>이름</RegisterText>
            <RegisterInput
              type="text"
              placeholder="이름"
              name="username"
              value={registerInfo.username}
              onChange={handleOnChange}
            />
          </InputBox>
          <RegisterButton
            type="submit"
            value="회원가입"
            disabled={!(valid.idValid && valid.pwValid)}
          ></RegisterButton>
        </RegisterForm>
        <Footer
          aLinks={registerCopyRights.aLinks}
          contents={registerCopyRights.contents}
        />
      </RegisterBackground>
    </>
  );
}

export default Register;
