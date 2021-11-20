import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ModalContainer = styled.div`
  //!Modal 구현 css
  background-color: #f4eae0;
  border-radius: 5%;
  width: 32rem;
  min-width: 25rem;
  max-width: 37.5rem;
  height: 38rem;
  position: fixed;
  left: 50%;
  top: 50%;
  padding: 0.31rem;
  transform: translate(-50%, -50%);
  z-index: 1011;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  @media only screen and (max-width: 600px) {
    background-color: #f4eae0;
    border-radius: 5%;
    width: 19rem;
    min-width: 10rem;
    max-width: 37.5rem;
    height: 28rem;
    position: fixed;
    left: 50%;
    top: 50%;
    padding: 0.31rem;
    transform: translate(-50%, -50%);
    z-index: 1011;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;

const ModalBackdrop = styled.div`
  //! Modal backdrop css
  width: 100%;
  height: 100%;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1010;
  background-color: rgba(0, 0, 0, 0.65);
`;

const LoginHeader = styled.h1`
  font-size: 3rem;
  margin-top: 1.5em;
  @media only screen and (max-width: 600px) {
    font-size: 2rem;
    margin-top: 1em;
  }
`;
const Welcome = styled.div`
  font-size: 1.4rem;
  @media only screen and (max-width: 600px) {
    font-size: 1rem;
    margin-top: 0.3em;
  }
`;
const Element = styled.div`
  min-width: 10rem;
  max-width: 12.5rem;
  font-size: 1.15rem;
  padding-top: 0.6rem;
  margin-top: 0.6rem;
  margin-bottom: 0.2rem;
  @media only screen and (max-width: 600px) {
    font-size: 0.9rem;
    padding-top: 0.3rem;
    margin-top: 0.4rem;
  }
`;
const Inputbox = styled.input`
  width: 18.75rem;
  height: 2.5rem;
  margin-top: 0.2rem;
  border-radius: 0.4rem;
  border: none;
  background-color: white;
  font-size: 1.2rem;
  ::-webkit-input-placeholder {
    text-align: center;
  }
  &.PasswordMessage {
  }
  @media only screen and (max-width: 600px) {
    width: 14rem;
    height: 2rem;
    margin-top: 0.1rem;
    border-radius: 0.4rem;
    border: none;
    background-color: white;
    font-size: 0.9rem;
  }
`;

const Elementmessage = styled.div`
  color: red;
  font-size: 0.7rem;
  margin-top: 0.4rem;
  @media only screen and (max-width: 600px) {
    font-size: 0.4rem;
    margin-top: 0.2rem;
  }
  &.PasswordBox {
    margin-bottom: 2rem;
  }
`;
const Button2 = styled.a`
  -webkit-transition: all 200ms cubic-bezier(0.39, 0.5, 0.15, 1.36);
  -moz-transition: all 200ms cubic-bezier(0.39, 0.5, 0.15, 1.36);
  -ms-transition: all 200ms cubic-bezier(0.39, 0.5, 0.15, 1.36);
  -o-transition: all 200ms cubic-bezier(0.39, 0.5, 0.15, 1.36);
  transition: all 200ms cubic-bezier(0.39, 0.5, 0.15, 1.36);
  display: block;
  margin-top: 0.624rem;
  width: 5rem;
  text-decoration: none;
  border-radius: 0.25rem;
  padding: 0.8rem 1.2rem;
  color: rgba(30, 22, 54, 0.6);
  box-shadow: rgba(30, 22, 54, 0.4) 0 0rem 0rem 0.125rem inset;
  text-align: center;
  :hover {
    color: rgba(255, 255, 255, 0.85);
    box-shadow: rgba(30, 22, 54, 0.7) 0 5rem 0rem 2rem inset;
  }
  @media only screen and (max-width: 600px) {
    -webkit-transition: all 200ms cubic-bezier(0.39, 0.5, 0.15, 1.36);
    -moz-transition: all 200ms cubic-bezier(0.39, 0.5, 0.15, 1.36);
    -ms-transition: all 200ms cubic-bezier(0.39, 0.5, 0.15, 1.36);
    -o-transition: all 200ms cubic-bezier(0.39, 0.5, 0.15, 1.36);
    width: 4rem;
    height: 0.8rem;
    font-size: 0.7rem;
  }
`;
const EmptySpace = styled.div`
  height: 1rem;
`;

const LoginModal = ({ openModalHandler, userInfoHandler, setIsLogin }) => {
  const [loginUserInfo, setLoginUserInfo] = useState({
    email: "",
    password: "",
  }); //! 유저 로그인 info state

  const [isLogEmail, setIsLogEmail] = useState(false); //! 이메일 입력 state
  const [, setIsLogPassword] = useState(false); //! 패스워드 입력 state
  const [emailMessage, setEmailMessage] = useState("");
  const [invalidMessage, setInvalidMessage] = useState("");

  const handleInputValue = key => e => {
    setLoginUserInfo({ ...loginUserInfo, [key]: e.target.value });
  };

  const navigate = useNavigate();

  const validEmail = email => {
    const regEmail =
      /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (regEmail.test(email) === false) {
      setIsLogEmail(false);
      setEmailMessage("올바른 이메일 형식이 아닙니다.");
    } else {
      setIsLogEmail(true);
      setEmailMessage("");
    }
  };

  const passwordState = () => {
    if (loginUserInfo.password.length !== 0) {
      setIsLogPassword(true);
    } else {
      setIsLogPassword(false);
    }
  };

  const infoAll = () => {
    // const stateInfo = {
    //   email: [loginUserInfo.email, isLogEmail],
    //   password: [loginUserInfo.password, isLogPassword],
    // };

    if ((loginUserInfo.email === "", loginUserInfo.password === "")) {
      setInvalidMessage("아이디와 비밀번호를 정확히 입력해 주세요");
    } else {
      axios
        .post(
          "https://localhost:4000/auth/login",
          {
            email: loginUserInfo.email,
            password: loginUserInfo.password,
          },
          {
            withCredentials: true,
          }
        )
        .then(res => {
          //console.log(res);
          if (res.data.message === "invalid data") {
            //console.log("로그인 요청이 실패하였습니다.");
            setInvalidMessage("아이디와 비밀번호를 정확히 입력해 주세요");
          } else if (res.data.message === "require All info") {
            //console.log(res.data.message);
            setInvalidMessage("아이디와 비밀번호를 정확히 입력해 주세요");
          } else {
            //! isLogin 상태를 변경해줘야함
            //! axios get 요청을 보내고 받은 응답 유저인포를 전역에서 프롭스로 받아온 핸들러로 스테이트 변경

            //console.log("로그인 요청이 성공적으로 전달되었습니다.");
            // console.log(res.data.data.userInfo);

            const loginInfo = res.data.data.loginInfo;
            userInfoHandler(loginInfo);
            setIsLogin(true);
            openModalHandler();
            // console.log(userInfo);
          }
          // console.log(stateInfo);
        })
        .catch(err => {
          throw err;
        });
    }
  };

  //! 엔터키 구현
  const onCheckEnter = e => {
    if (e.key === "Enter") {
      infoAll();
    }
  };

  return (
    <>
      <ModalBackdrop
        onClick={() => {
          openModalHandler();
        }}
      ></ModalBackdrop>
      <ModalContainer welcome>
        {/* <GlobalStyleLogin /> */}
        <LoginHeader> Login </LoginHeader>
        <Welcome>OnWedding 커뮤니티에 로그인하세요!</Welcome>
        <div>
          <Element> 이메일 </Element>
          <Inputbox
            type="text"
            placeholder="Email"
            onChange={handleInputValue("email")}
            onKeyPress={onCheckEnter}
            onBlur={() => validEmail(loginUserInfo.email)}
          />
          {isLogEmail ? (
            <Elementmessage>{emailMessage}</Elementmessage>
          ) : loginUserInfo.email.length === 0 ? null : (
            <Elementmessage>{emailMessage}</Elementmessage>
          )}
        </div>
        <div>
          <Element> 비밀번호 </Element>
          <Inputbox
            className="PasswordBox"
            type="password"
            placeholder="Password"
            onChange={handleInputValue("password")}
            onKeyPress={onCheckEnter}
            onBlur={() => passwordState()}
          />
          {invalidMessage !== "" ? (
            <Elementmessage>{invalidMessage}</Elementmessage>
          ) : null}
        </div>
        <EmptySpace></EmptySpace>
        <Button2
          onClick={() => {
            infoAll();
          }}
        >
          로그인
        </Button2>
        <Button2
          onClick={() => {
            navigate("/signup");
            openModalHandler();
          }}
        >
          회원가입
        </Button2>
      </ModalContainer>
    </>
  );
};

export default LoginModal;
