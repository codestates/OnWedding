import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";

import Article from "./Pages/Article";
import ChangePassword from "./Pages/ChangePassword";
import Delete from "./Pages/Delete";
import Main from "./Pages/Main";
import MyPage from "./Pages/MyPage";
import SignUp from "./Pages/SignUp";
import Write from "./Pages/Write";
import Update from "./Pages/Update";

import Nav from "./Components/Nav";
import Footer from "./Components/Footer";

const GlobalStyle = createGlobalStyle`
  body {
  font-family: "paybooc-Medium";
  margin: 0;
  padding: 0;
  background-color: #f4eae0;
  box-sizing: border-box;
  }
`;

function App() {
  const [edit, setEdit] = useState("");
  const [articleId, setArticleId] = useState(false);
  const [img, setImg] = useState(null);

  useEffect(() => {
    setEdit("");
  }, [edit]);

  const [userInfo, setUserInfo] = useState(
    () =>
      JSON.parse(window.localStorage.getItem("userInfo")) || {
        id: "",
        email: "",
        name: "",
        nickname: "",
        mobile: "",
        image: "",
      }
  );

  useEffect(() => {
    window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [userInfo]);

  const [isLogin, setIsLogin] = useState(
    () => JSON.parse(window.localStorage.getItem("isLogin")) || false
  );

  useEffect(() => {
    window.localStorage.setItem("isLogin", JSON.stringify(isLogin));
  }, [isLogin]);

  const [tagArticles, setTagArticles] = useState(
    () => JSON.parse(window.localStorage.getItem("tagArticles")) || ""
  );

  useEffect(() => {
    window.localStorage.setItem("tagArticles", JSON.stringify(tagArticles));
  }, [tagArticles]);

  //! 유저인포 변경 핸들러 함수
  const userInfoHandler = (userData) => {
    setUserInfo(userData);
  };

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Nav
        isLogin={isLogin}
        userInfoHandler={userInfoHandler}
        setIsLogin={setIsLogin}
        setTagArticles={setTagArticles}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Main
              setTagArticles={setTagArticles}
              tagArticles={tagArticles}
              isLogin={isLogin}
            />
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/write" element={<Write userInfo={userInfo} />} />
        <Route
          path="/update"
          element={
            <Update articleId={articleId} userInfo={userInfo} edit={edit} />
          }
        />
        <Route
          path="/article/:id"
          element={
            <Article
              userInfo={userInfo}
              isLogin={isLogin}
              setEdit={setEdit}
              setArticleId={setArticleId}
              setTagArticles={setTagArticles}
            />
          }
        />
        <Route path="change" element={<ChangePassword />} />
        <Route
          path="/mypage"
          element={
            <MyPage
              img={img}
              setImg={setImg}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            />
          }
        />
        <Route
          path="/delete"
          element={
            <Delete userInfoHandler={userInfoHandler} setIsLogin={setIsLogin} />
          }

        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
