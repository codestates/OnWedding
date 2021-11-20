import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import ArticleList from "../Components/ArticleList";
import Pagination from "../Components/Pagination";

const MainBody = styled.main`
  max-width: 75%;
  margin: 0 auto;
`;

const MainImage = styled.section`
  background-image: url("https://i.ibb.co/x5HNV5z/bride-g8bfa369fe-1920.jpg");
  background-position: 55% 30%;
  background-size: contain auto;
  background-repeat: no-repeat;
  padding: 15rem;
  opacity: 0.8;
  position: relative;
`;

const MainButton = styled.div`
  background-color: #f4eae0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  font-size: 1.5rem;
  max-width: 80rem;
`;

const SortButton = styled.ul`
  margin: 0rem;
  padding-left: 0;
  display: flex;
  border-radius: 5px;
  background-color: transparent;
  > li {
    list-style: none;
    padding: 1rem 1.5rem;
    border-radius: 5px;
  }
  > li:hover {
    background-color: #817c8d;
    cursor: pointer;
    color: white;
  }
`;

const WriteButton = styled.button`
  margin: 1rem;
  padding: 1rem 1.5rem;
  border-radius: 5px;
  font-size: 1.5rem;
  background-color: lightgray;
  border: 1px solid lightgray;
  background-color: #817c8d;
  > a {
    text-decoration: none;
    color: white;
  }
`;

const MainArticles = styled.ul`
  padding: 0;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  max-width: 80rem;
`;

const NoArticles = styled.div`
  margin: 7rem auto;
  font-size: 3rem;
`;

const Main = ({ isLogin, tagArticles, setTagArticles }) => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [post] = useState(12);

  useEffect(() => {
    axios
      .get("https://localhost:4000/article", {
        withCredentials: true,
      })
      .then(res => {
        setArticles(res.data.data.articles);
      });
  }, []);

  const lastPost = currentPage * post;
  const firstPost = lastPost - post;
  const currentPost = articles.slice(firstPost, lastPost);

  const paginate = page => {
    setCurrentPage(page);
  };

  const OrderCreated = () => {
    if (tagArticles) {
      const arrCopy = tagArticles.slice();
      const sorted = arrCopy.sort((a, b) => a.id - b.id);
      setTagArticles(sorted);
    } else if (articles) {
      const arrCopy = articles.slice();
      const sorted = arrCopy.sort((a, b) => a.id - b.id);
      setArticles(sorted);
    } else {
      return;
    }
  };

  const OrderTotalComments = () => {
    if (tagArticles) {
      const arrCopy = tagArticles.slice();
      const sorted = arrCopy.sort((a, b) => b.total_comment - a.total_comment);
      setTagArticles(sorted);
    } else if (articles) {
      const arrCopy = articles.slice();
      const sorted = arrCopy.sort((a, b) => b.total_comment - a.total_comment);
      setArticles(sorted);
    } else {
      return;
    }
  };

  return (
    <MainBody>
      <MainImage />
      <MainButton>
        <SortButton>
          <li onClick={OrderCreated}>최신순</li>
          <li onClick={OrderTotalComments}>댓글순</li>
        </SortButton>
        {isLogin ? (
          <WriteButton>
            <Link to="/write">글쓰기</Link>
          </WriteButton>
        ) : null}
      </MainButton>
      <MainArticles>
        {tagArticles.length === 0 && currentPost.length === 0 ? (
          <NoArticles>게시글이 없습니다.</NoArticles>
        ) : tagArticles ? (
          tagArticles.map(article => {
            return <ArticleList article={article} key={article.id} />;
          })
        ) : currentPost ? (
          currentPost.map(article => {
            return <ArticleList article={article} key={article.id} />;
          })
        ) : null}
      </MainArticles>
      <Pagination post={post} paginate={paginate} totalPost={articles.length} />
    </MainBody>
  );
};

export default Main;
