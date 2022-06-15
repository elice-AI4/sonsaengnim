import React, { useState, useEffect } from "react";
import {
  RegisterBackground,
  RegisterForm,
  InputBox,
  RegisterInput,
  ValidWord,
  RegisterButton,
} from "./index.style";
import { countAtom } from "../../../state";
import { useAtom } from "jotai";
interface UserRegister {
  id: string;
  password: string;
}

interface LoginValid {
  idValid: boolean;
  pwValid: boolean;
}

function Register() {
  const [count] = useAtom(countAtom);
  const reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [registerInfo, setRegisterInfo] = useState<UserRegister>({
    id: "",
    password: "",
  });
  const [valid, setValid] = useState<LoginValid>({
    idValid: false,
    pwValid: false,
  });
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterInfo((cur): UserRegister => {
      const newInfo: UserRegister = { ...cur };
      newInfo[e.target.name as keyof UserRegister] = e.target.value; // 정석
      return newInfo;
    });
  };
  useEffect((): void => {
    if (registerInfo.id !== "") {
      setValid({
        ...valid,
        idValid:
          registerInfo.id.toLowerCase().match(reg) !== null ? true : false,
      });
    } else {
      setValid({
        ...valid,
        idValid: false,
      });
    }
  }, [registerInfo.id]);

  useEffect((): void => {
    if (registerInfo.password != "") {
      setValid({
        ...valid,
        pwValid: registerInfo.password.length >= 4 ? true : false,
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
      <RegisterBackground>
        <RegisterForm>
          <InputBox>
            <h2 style={{ fontWeight: "bold" }}>아이디</h2>
            <RegisterInput
              type="email"
              placeholder="이메일"
              name="id"
              value={registerInfo.id}
              onChange={handleOnChange}
            />
          </InputBox>
          {!valid.idValid && (
            <ValidWord>이메일 형식의 아이디가 아닙니다.</ValidWord>
          )}
          <InputBox>
            <h2 style={{ fontWeight: "bold" }}>비밀번호</h2>
            <RegisterInput
              type="password"
              placeholder="비밀번호"
              name="password"
              value={registerInfo.password}
              onChange={handleOnChange}
            />
          </InputBox>
          {!valid.pwValid && (
            <ValidWord>비밀번호 4글자 이상 필요합니다.</ValidWord>
          )}
          <RegisterButton disabled={!(valid.idValid && valid.pwValid)}>
            회원가입
          </RegisterButton>
        </RegisterForm>
      </RegisterBackground>
      <h2>{count}</h2>
    </>
  );
}

export default Register;
