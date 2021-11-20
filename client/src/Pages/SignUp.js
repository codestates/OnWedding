import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

axios.default.withCredentials = true;

const SignUpContainer = styled.div`
  background-color: #f4eae0;
  padding: 2rem;
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
  &.CompleteSignUp {
    width: 100vw;
    height: 72vh;
  }
`;

const WelcomeHeader = styled.div`
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
  &.DeleteComplete {
    font-size: 2.7rem;
    margin: auto;
  }
`;
const WelcomeMessage = styled.div`
  font-size: 1.1rem;
  margin-bottom: 1.2rem;
  @media only screen and (max-width: 534px) {
    font-size: 0.9rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: center;
  }
`;

const Line = styled.div`
  width: 33rem;
  height: 1px;
  padding: 0;
  margin-bottom: 0.5rem;
  align-items: center;
  background: #cecece;
  @media only screen and (max-width: 534px) {
    width: 22rem;
    height: 1px;
    padding: 0;
    margin-bottom: 0.5rem;
    align-items: center;
    background: #cecece;
  }
`;

const ElemetContainer = styled.div`
  background-color: #f4eae0;
  padding: 0.5rem;
  /* z-index: 1011; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ElementBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media only screen and (max-width: 534px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* border: 1px solid black; */
  }
`;

const Element = styled.div`
  font-size: 1rem;
  padding-top: 0.6rem;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;

  /* font-family: "MaplestoryOTFLight"; */
  /* font-family: "NanumGimYuICe"; */
  @media only screen and (max-width: 534px) {
    width: 20rem;
    margin: auto;
    font-size: 0.9rem;
    padding-top: 0.3rem;
    margin-top: 0.4rem;
    /* border: 1px solid black; */
  }
`;

const InputBox = styled.input`
  width: 24rem;
  height: 2.5rem;
  margin-top: 0.2rem;
  border-radius: 0.4rem;
  border: none;
  background-color: white;
  font-size: 1rem;
  text-align: center;
  ::-webkit-input-placeholder {
    text-align: center;
  }
  &.Email {
    width: 17rem;
    border-radius: 0.4rem;
    @media only screen and (max-width: 534px) {
      width: 14rem;
      height: 2rem;
      margin-top: 0.1rem;
      border-radius: 0.4rem;
      border: none;
      background-color: white;
      font-size: 0.9rem;
    }
  }
  &.Nickname {
    width: 17rem;
    border-radius: 0.4rem;
    @media only screen and (max-width: 534px) {
      width: 14rem;
      height: 2rem;
      margin-top: 0.1rem;
      border-radius: 0.4rem;
      border: none;
      background-color: white;
      font-size: 0.9rem;
    }
  }
  /* font-family: "NanumGimYuICe"; */
  @media only screen and (max-width: 534px) {
    width: 20rem;
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
  width: 7rem;
  height: 2.62rem;
  border: none;
  border-radius: 0.4rem;
  margin-left: 0.2rem;
  background-color: #817c8d;
  font-family: "paybooc-Medium";
  font-size: 0.7rem;
  color: #ffffff;
  :hover {
    color: rgba(255, 255, 255, 0.85);
    box-shadow: rgba(30, 22, 54, 0.7) 0 5rem 0rem 2rem inset;
  }

  &.signup {
    @media only screen and (max-width: 534px) {
      width: 6rem;
      height: 3rem;
      margin-top: 2rem;
      font-size: 0.9rem;
      display: block;
      position: relative;
      margin: auto;
    }
    width: 10rem;
    height: 4rem;
    margin-top: 2rem;
    font-size: 1.1rem;
    display: block;
    position: relative;
    margin: auto;
  }

  &.Emailbtn {
    top: -0.1rem;
    @media only screen and (max-width: 534px) {
      top: -0.15rem;
      position: relative;
      width: 5.5rem;
      height: 2.1rem;
      border: none;
      border-radius: 0.4rem;
      margin-left: 0.2rem;
      background-color: #817c8d;
      font-family: "paybooc-Medium";
      font-size: 0.6rem;
      color: #ffffff;
    }
  }
  &.NicknameBtn {
    top: -0.1rem;
    @media only screen and (max-width: 534px) {
      top: -0.15rem;
      position: relative;
      width: 5.5rem;
      height: 2.1rem;
      border: none;
      border-radius: 0.4rem;
      margin-left: 0.2rem;
      background-color: #817c8d;
      font-family: "paybooc-Medium";
      font-size: 0.6rem;
      color: #ffffff;
    }
  }
`;

//!--------------------------------------------------------------------

const SignUp = () => {
  const [userinfo, setUserinfo] = useState({
    email: "",
    username: "",
    nickname: "",
    password: "",
    passwordCheck: "",
    birth: "",
    mobile: "",
  });

  //! 메세지 State
  const [emailMessage, setEmailMessage] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordCheckMessage, setPasswordCheckMessage] = useState("");
  const [birthMessage, setBirthMessage] = useState("");
  const [mobileMessage, setMobileMessage] = useState("");

  //! 유효성검사 및 State
  const [isEmail, setIsEmail] = useState(false);
  const [isDupEmail, setIsDupEmail] = useState(false); //! 이메일 중복을 확인하는 State
  const [isUsername, setIsUsername] = useState(false);
  const [isDupNickname, setIsDupNickname] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPwdCheck, setIsPwdCheck] = useState(false);
  const [isBirth, setIsBirth] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  //! 회원가입 상태 state
  const [isComplete, setIsComplete] = useState(false);
  const navigate = useNavigate();

  const handleComplete = () => {
    axios
      .post(
        "https://localhost:4000/auth/signup",
        {
          email: userinfo.email,
          password: userinfo.password,
          name: userinfo.username,
          nickname: userinfo.nickname,
          birth: userinfo.birth,
          mobile: userinfo.mobile,
        },
        { httpOnly: true, withCredentials: true }
      )
      .then(res => {
        console.log(res.data);
        const successMsg = res.data.message;
        if (successMsg) {
          setIsComplete(true);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      })
      .catch(err => {
        throw err;
      });

    // //! 홈으로 리다이렉트해주기 위한 함수
    // setIsComplete(true);
    // setTimeout(() => {
    //   history("/");
    // }, 2000);
  };

  const handleInputValue = key => e => {
    setUserinfo({ ...userinfo, [key]: e.target.value });
  };

  //! email 형식 유효성검사
  const validEmail = email => {
    const regEmail =
      /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (regEmail.test(email) === false) {
      setIsEmail(false);
      setEmailMessage("올바른 이메일 형식이 아닙니다.");
    } else {
      setIsEmail(true);
      setEmailMessage("올바른 이메일 형식입니다. 중복 확인 해주세요 :)");
    }
  };
  //! password 유효성검사
  const validPassword = password => {
    const regPassword = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!regPassword.test(password)) {
      setIsPassword(false);
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
    } else {
      setIsPassword(true);
      setPasswordMessage("사용하기 좋은 비밀번호입니다:)");
    }
  };
  //! password 확인 유효성검사
  const checkPassword = (password, cheeckPassword) => {
    if (password === cheeckPassword) {
      setIsPwdCheck(true);
      setPasswordCheckMessage("비밀번호가 일치합니다:)");
    } else {
      setIsPwdCheck(false);
      setPasswordCheckMessage("비밀번호가 일치하지 않습니다.");
    }
  };

  //! 생년월일 유효성검사
  const checkBirth = birth => {
    const regBirth =
      /^([0-9][0-9][0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
    const nowDate = new Date();
    const nowYear = nowDate.getFullYear();
    const birthYear = birth.toString().substring(0, 4);
    if (!regBirth.test(birth)) {
      setBirthMessage("생년월일을 다시 입력해주세요 ex) 20180917");
      setIsBirth(false);
    } else {
      if (nowYear - birthYear >= 100) {
        setBirthMessage("타임머신 타고 오신분은 가입이 안돼요ㅠㅠ");
        setIsBirth(false);
      } else if (nowYear - birthYear < 0) {
        setBirthMessage("태어나셨습니까 휴먼?");
        setIsBirth(false);
      } else {
        setBirthMessage("올바른 생년월일입니다.");
        setIsBirth(true);
      }
    }
  };

  //! mobile형식 유효성검사
  const validMobile = mobile => {
    mobile = mobile.split("-").join("");
    const regPhone = /^((01[1|6|7|8|9])[1-9]+[0-9]{6,7})|(010[1-9][0-9]{7})$/;
    if (!regPhone.test(mobile)) {
      setIsMobile(false);
      setMobileMessage("번호형식이 유효하지 않습니다.");
    } else {
      setIsMobile(true);
      setMobileMessage("올바른 번호입니다:)");
    }
  };

  //! email 중복 체크
  const dupEmail = email => {
    axios
      .post(
        "https://localhost:4000/auth/email",
        { email: userinfo.email },
        { httpOnly: true, withCredentials: true }
      )
      .then(res => {
        const resMsg = res.data.message;
        if (resMsg === "email overlap") {
          setIsDupEmail(false);
          setEmailMessage("이미 회원가입된 이메일입니다.");
        } else if (resMsg === "ok") {
          setIsDupEmail(true);
          setEmailMessage("사용가능한 이메일입니다.");
        }
      })
      .catch(err => {
        throw err;
      });
  };

  //! nickName 중복 체크
  const dupNickname = nickname => {
    axios
      .post(
        "https://localhost:4000/auth/nickname",
        { nickname: userinfo.nickname },
        { httpOnly: true, withCredentials: true }
      )
      .then(res => {
        const resMsg = res.data.message;
        if (resMsg === "nickname overlap") {
          setIsDupNickname(false);
          setNicknameMessage("이미 사용중인 닉네임입니다.");
        } else if (resMsg === "ok") {
          setIsDupNickname(true);
          setNicknameMessage("사용가능한 닉네임입니다:)");
        }
      });
  };

  //! 이름 상태변경
  const nameState = () => {
    if (userinfo.username !== "") {
      setIsUsername(true);
    } else {
      setIsUsername(false);
    }
  };

  const infoAll = () => {
    const {
      email,
      username,
      nickname,
      password,
      passwordCheck,
      birth,
      mobile,
    } = userinfo;
    const stateInfo = [
      { email, username, nickname, password, passwordCheck, birth, mobile },
      {
        isEmail,
        isDupEmail,
        isUsername,
        isDupNickname,
        isPassword,
        isPwdCheck,
        isBirth,
        isMobile,
      },
    ];
    if (
      isEmail &&
      isDupEmail &&
      isUsername &&
      isDupNickname &&
      isPassword &&
      isPwdCheck &&
      isBirth &&
      isMobile === true
    ) {
      handleComplete();
      console.log("회원가입 요청이 성공적으로 전달되었습니다.");
    } else {
      console.log("회원가입 요청이 실패하였습니다.");
    }
    console.log(stateInfo);
  };

  return isComplete ? (
    <SignUpContainer className="CompleteSignUp">
      <WelcomeHeader className="DeleteComplete">
        회원가입이 완료되었습니다.
      </WelcomeHeader>
    </SignUpContainer>
  ) : (
    <SignUpContainer>
      {/* <center> */}
      <WelcomeHeader>Welcome to OnWedding!</WelcomeHeader>
      <WelcomeMessage>
        회원가입 하시면 더 많은 서비스를 이용할 수 있습니다.
      </WelcomeMessage>
      <Line />
      <ElemetContainer>
        <form onSubmit={e => e.preventDefault()}>
          <ElementBox>
            <div>
              <Element>이메일</Element>
              <InputBox
                className="Email"
                type="email"
                placeholder="Email"
                onChange={handleInputValue("email")}
                onBlur={() => {
                  validEmail(userinfo.email);
                  // hideBtn();
                }}
              />
              <Button
                className="Emailbtn"
                type="submit"
                disabled={isEmail ? false : "disabled"}
                onClick={() => {
                  dupEmail(userinfo.email);
                }}
              >
                이메일 중복 확인
              </Button>
              {isEmail ? (
                <Elementmessage className="good">{emailMessage}</Elementmessage>
              ) : userinfo.email.length === 0 ? null : (
                <Elementmessage>{emailMessage}</Elementmessage>
              )}
            </div>
          </ElementBox>
          <ElementBox>
            <div>
              <Element>이름</Element>
              <InputBox
                type="username"
                placeholder="Name"
                onChange={handleInputValue("username")}
                onBlur={
                  () => nameState()
                  // () => hideBtn()
                }
              />
            </div>
          </ElementBox>
          <ElementBox>
            <div>
              <Element>닉네임</Element>
              <InputBox
                className="Nickname"
                type="nickname"
                placeholder="Nickname"
                onChange={handleInputValue("nickname")}
                onBlur={() => {
                  // hideBtn();
                }}
              />
              <Button
                className="NicknameBtn"
                type="submit"
                disabled={userinfo.nickname.length !== 0 ? false : "disabled"}
                onClick={() => {
                  dupNickname(userinfo.nickname);
                }}
              >
                닉네임 중복 확인
              </Button>
              {isDupNickname ? (
                <Elementmessage className="good">
                  {nicknameMessage}
                </Elementmessage>
              ) : userinfo.nickname.length === 0 ? null : (
                <Elementmessage>{nicknameMessage}</Elementmessage>
              )}
            </div>
          </ElementBox>
          {/* <button
          className="btnNicknameCheck"
          type="submit"
          disabled={userinfo.nickname.length !== 0 ? false : "disabled"}
          onClick={() => {
            dupNickname(userinfo.nickname);
          }}
        >
          닉네임 중복 확인
        </button> */}
          <div>
            <Element>비밀번호</Element>
            <InputBox
              type="password"
              placeholder="Password"
              onChange={handleInputValue("password")}
              onBlur={() => {
                validPassword(userinfo.password);
                // hideBtn();
              }}
            />
            {isPassword ? (
              <Elementmessage className="good">
                {passwordMessage}
              </Elementmessage>
            ) : userinfo.password.length === 0 ? null : (
              <Elementmessage>{passwordMessage}</Elementmessage>
            )}
          </div>
          <div>
            <Element>비밀번호 확인</Element>
            <InputBox
              type="password"
              placeholder="PasswordCheck"
              onChange={handleInputValue("passwordCheck")}
              onBlur={() => {
                checkPassword(userinfo.password, userinfo.passwordCheck);
                // hideBtn();
              }}
            />
            {isPwdCheck ? (
              userinfo.passwordCheck.length === 0 ? null : (
                <Elementmessage className="good">
                  {passwordCheckMessage}
                </Elementmessage>
              )
            ) : userinfo.passwordCheck.length === 0 ? null : (
              <Elementmessage>{passwordCheckMessage}</Elementmessage>
            )}
          </div>
          <div>
            <Element>생일</Element>
            <InputBox
              type="birth"
              placeholder="Birth ex) 19880624"
              onChange={handleInputValue("birth")}
              onBlur={
                // () => hideBtn()
                () => checkBirth(userinfo.birth)
              }
            />
            {isBirth ? (
              <Elementmessage className="good">{birthMessage}</Elementmessage>
            ) : userinfo.birth.length === 0 ? null : (
              <Elementmessage>{birthMessage}</Elementmessage>
            )}
          </div>
          <div>
            <Element>전화번호</Element>
            <InputBox
              type="mobile"
              placeholder="Mobile ex) 01012345678"
              onChange={handleInputValue("mobile")}
              onBlur={() => {
                validMobile(userinfo.mobile);
                // hideBtn();
              }}
            />
            {isMobile ? (
              <Elementmessage className="good">{mobileMessage}</Elementmessage>
            ) : userinfo.mobile.length === 0 ? null : (
              <Elementmessage>{mobileMessage}</Elementmessage>
            )}
          </div>
          <div>
            <Button
              className="signup"
              type="submit"
              // disabled={isBtn ? false : "disabled"}
              onClick={
                infoAll
                //! axios post/signup
              }
            >
              회원가입
            </Button>
          </div>
        </form>
      </ElemetContainer>
      {/* </center> */}
    </SignUpContainer>
  );
};

export default SignUp;
