import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Article = styled.li`
  list-style: none;
  width: 25%;
  transition: 0.4s;
  display: flex;
  justify-content: center;
  :hover {
    background-color: white;
    border-radius: 5px;
  }
  > a {
    text-decoration: none;
    color: black;
  }
`;

const ArticleImage = styled.img`
  border-radius: 5%;
  width: 15rem;
  height: 15rem;
`;

const ArticleTitle = styled.div`
  font-size: 1.5rem;
`;

const ArticleIcon = styled.i`
  font-size: 1.2rem;
`;

const ArticleList = ({ article }) => {
  return (
    <Article>
      <Link to={`/article/${article.id}`}>
        {article.image ? (
          <ArticleImage src={article.image} />
        ) : (
          <ArticleImage
            src={
              "https://onwedding-img.s3.ap-northeast-2.amazonaws.com/default-placeholder-1024x1024.png"
            }
          />
        )}
        <ArticleTitle>{article.title}</ArticleTitle>
        <ArticleIcon className="far fa-comment"></ArticleIcon>
        {article.total_comment}
      </Link>
    </Article>
  );
};

export default ArticleList;
