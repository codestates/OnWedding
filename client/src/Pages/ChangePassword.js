import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const ChangeContainer = styled.div`
  width: 100vw;
  height: 72vh;
  background-color: #f4eae0;
  padding: 0rem;
  /* z-index: 1011; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media only screen and (max-width: 534px) {
    background-color: #f4eae0;
    padding: 0.5rem;
    /* z-index: 1011; */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;
const ChangeHeader = styled.div`
  font-size: 2.7rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  @media only screen and (max-width: 540px) {
    font-size: 2.2rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: center;
  }
  &.Complete {
    font-size: 2.7rem;
    margin: auto;
  }
`;
const Element = styled.div`
  min-width: 10rem;
  max-width: 12.5rem;
  font-size: 1.05rem;
  padding-top: 0.6rem;
  margin-top: 0.6rem;
  margin-bottom: 0.2rem;
  /* font-family: "MaplestoryOTFLight"; */
  /* font-family: "NanumGimYuICe"; */
  @media only screen and (max-width: 600px) {
    font-size: 0.9rem;
    padding-top: 0.3rem;
    margin-top: 0.4rem;
  }
`;
const Inputbox = styled.input`
  width: 22rem;
  height: 2.5rem;
  margin-top: 0.2rem;
  border-radius: 0.4rem;
  border: none;
  background-color: white;
  font-size: 1.2rem;
  ::-webkit-input-placeholder {
    text-align: center;
  }
  /* font-family: "NanumGimYuICe"; */
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
  @media only screen and (max-width: 534px) {
    font-size: 0.4rem;
    margin-top: 0.2rem;
  }
  &.good {
    color: #3d76e9;
  }
`;
const Button = styled.button`
  top: 1rem;
  position: relative;
  width: 8rem;
  height: 3.2rem;
  border: none;
  border-radius: 0.4rem;
  margin-left: 0.2rem;
  background-color: #817c8d;
  font-family: "paybooc-Medium";
  font-size: 0.8rem;
  color: #ffffff;
  :hover {
    color: rgba(255, 255, 255, 0.85);
    box-shadow: rgba(30, 22, 54, 0.7) 0 5rem 0rem 2rem inset;
  }
`;

// const CompleteContainer = styled.div`
//   width: 100vw;
//   height: 20vh;
// `;

const ChangePassword = () => {
  const [passwordInfo, setPasswordInfo] = useState({
    // currentPassword: "",
    newPassword: "",
    checkNewPassword: "",
  });
  //! 비밀번호 변경 상태 state
  const [isComplete, setIsComplete] = useState(false);
  const history = useNavigate();

  const handleComplete = () => {
    //! 홈으로 리다이렉트해주기 위한 함수
    setIsComplete(true);
    setTimeout(() => {
      history("/");
    }, 2000);
  };

  //! 입력상태 state
  // const [isPassword, setIsPassword] = useState(false);
  const [isNewPassword, setIsNewPassword] = useState(false);
  const [isCheckNewpassword, setIsCheckNewPassword] = useState(false);

  // const [curPasswordMsg, setCurPasswordMsg] = useState(""); //! 현재 패스워드가 안맞을경우 메세지를 위한 state
  const [passwordMessage, setPasswordMessage] = useState(""); //! 새로운 패스워드 유효성검사 메세지 state
  const [passwordCheckMessage, setPasswordCheckMessage] = useState(""); //! 새로운 패스워드 확인 메세지 state

  const handleInputValue = key => e => {
    setPasswordInfo({ ...passwordInfo, [key]: e.target.value });
  };

  // //! 현재 비밀번호 상태 변경
  // const curPasswordState = () => {
  //   if (passwordInfo.currentPassword.length !== 0) {
  //     setIsPassword(true);
  //     setCurPasswordMsg("");
  //   } else {
  //     setIsPassword(false);
  //     setCurPasswordMsg("현재 비밀번호를 입력해주세요.");
  //   }
  // };

  //! newPassword 유효성검사
  const validPassword = newPassword => {
    const regPassword = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!regPassword.test(newPassword)) {
      setIsNewPassword(false);
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
    } else {
      setIsNewPassword(true);
      setPasswordMessage("");
    }
  };

  //! newPassword 확인 유효성검사
  const checkPassword = (password, checkPassword) => {
    if (password === checkPassword) {
      setIsCheckNewPassword(true);
      setPasswordCheckMessage("");
    } else {
      setIsCheckNewPassword(false);
      setPasswordCheckMessage("비밀번호가 일치하지 않습니다.");
    }
  };

  const infoAll = () => {
    // const stateInfo = {
    //   // password: [passwordInfo.currentPassword, isPassword],
    //   newPassword: [passwordInfo.newPassword, isNewPassword],
    //   checkState: isCheckNewpassword,
    // };

    axios
      .patch(
        "/user/pwd",
        {
          password: passwordInfo.newPassword,
        },
        { withCredentials: true }
      )
      .then(res => {
        console.log(res.data.message);
        const resMsg = res.data.message;
        if (resMsg === "success change password") {
          handleComplete();
          console.log("비밀번호가 성공적으로 변경되었습니다.");
        } else {
          console.log("비밀번호 변경이 실패하였습니다.");
        }
      })
      .catch(err => {
        throw err;
      });
    // console.log(stateInfo);
  };

  const onCheckEnter = e => {
    if (e.key === "Enter") {
      infoAll();
    }
  };

  return isComplete ? (
    <ChangeContainer>
      <ChangeHeader className="Complete">
        비밀번호가 성공적으로 변경되었습니다.
      </ChangeHeader>
    </ChangeContainer>
  ) : (
    <ChangeContainer>
      <ChangeHeader>비밀번호 변경</ChangeHeader>
      <div>
        <Element>새로운 비밀번호</Element>
        <Inputbox
          type="password"
          placeholder="새로운 비밀번호"
          onChange={handleInputValue("newPassword")}
          onBlur={() => {
            validPassword(passwordInfo.newPassword);
          }}
        />
        {isNewPassword ? (
          passwordInfo.newPassword.length === 0 ? null : (
            <Elementmessage>{passwordMessage}</Elementmessage>
          )
        ) : passwordInfo.newPassword.length === 0 ? null : (
          <Elementmessage>{passwordMessage}</Elementmessage>
        )}
      </div>
      <div>
        <Element>새로운 비밀번호 확인</Element>
        <Inputbox
          type="password"
          placeholder="새로운 비밀번호 확인"
          onChange={handleInputValue("checkNewPassword")}
          onKeyPress={onCheckEnter}
          onBlur={() => {
            checkPassword(
              passwordInfo.newPassword,
              passwordInfo.checkNewPassword
            );
          }}
        />
        {isCheckNewpassword ? (
          passwordInfo.checkNewPassword.length === 0 ? null : (
            <Elementmessage>{passwordCheckMessage}</Elementmessage>
          )
        ) : (
          <Elementmessage>{passwordCheckMessage}</Elementmessage>
        )}
      </div>
      <Button type="submit" className="postChangePassword" onClick={infoAll}>
        비밀번호 변경
      </Button>
    </ChangeContainer>
  );
};

export default ChangePassword;
