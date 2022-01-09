import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const DeleteContainer = styled.div`
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

const DeleteHeader = styled.div`
  font-size: 2.2rem;
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

// const Element = styled.div`
//   min-width: 10rem;
//   max-width: 12.5rem;
//   font-size: 1.05rem;
//   padding-top: 0.6rem;
//   margin-top: 0.6rem;
//   margin-bottom: 0.2rem;
//   /* font-family: "MaplestoryOTFLight"; */
//   /* font-family: "NanumGimYuICe"; */
//   @media only screen and (max-width: 600px) {
//     font-size: 0.9rem;
//     padding-top: 0.3rem;
//     margin-top: 0.4rem;
//   }
// `;

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

const Delete = ({ userInfoHandler, setIsLogin }) => {
  //! 회원탈퇴 상태 state
  const [isComplete, setIsComplete] = useState(false);
  const navigate = useNavigate();

  const handleComplete = () => {
    //! 홈으로 리다이렉트해주기 위한 함수
    // setIsComplete(true);

    axios
      .delete("/user", { withCredentials: true })
      .then((res) => {
        console.log(res.data.message);
        const resMsg = res.data.message;
        if (resMsg === "success delete userInfo") {
          setIsComplete(true);
          setTimeout(() => {
            setIsComplete(false);
            const userInfo = {
              email: "",
              name: "",
              nickname: "",
              mobile: "",
              image: "",
            };
            userInfoHandler(userInfo);
            setIsLogin(false);
            navigate("/");
            console.log(isComplete);
          }, 2000);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return isComplete ? (
    <DeleteContainer>
      <DeleteHeader className="DeleteComplete">
        회원탈퇴가 완료되었습니다. 그동안 이용해주셔서 감사합니다.
      </DeleteHeader>
    </DeleteContainer>
  ) : (
    <>
      <DeleteContainer>
        <DeleteHeader>회원탈퇴</DeleteHeader>
        <div>
          <Button type="submit" onClick={handleComplete}>
            Delete Account
          </Button>
        </div>
      </DeleteContainer>
    </>
  );
};
export default Delete;
