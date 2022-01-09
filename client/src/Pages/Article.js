import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router";

import Comments from "../Components/Comments";
import axios from "axios";

const ArticleBody = styled.div`
  width: 75%;
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
  max-width: 80rem;
  height: 95.234px;
`;

const ArticleMiddle = styled.div`
  width: 75%;
  margin: 0 auto;
`;

const ArticleContents = styled.div`
  border-radius: 5px;
  background-color: white;
  padding: 2rem 5rem;
  display: flex;
  flex-direction: column;
  & button {
    border: 0px;
    padding: 10px;
    border-radius: 5px;
    font-size: 1rem;
  }
`;

const ArticleTitle = styled.div`
  font-size: 2rem;
  font-weight: bolder;
  margin: 1rem 0;
`;

const ArticleUser = styled.div`
  margin: 1rem 0;
  font-size: 1.5rem;
  span {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  img {
    margin-right: 0.5rem;
    width: 3rem;
    height: 3rem;
    border-radius: 70%;
  }
`;

const ArticleText = styled.div`
  margin: 1rem 0;
  font-size: 1.5rem;
`;

const EditButton = styled.div`
  margin-top: 1rem;
  button {
    margin-right: 1rem;
    font-size: 1rem;
  }
`;

const HashTags = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  padding: 0;
  li {
    padding: 0.5rem 0.1rem;
  }
  li:hover {
    background-color: #f4ece0;
    border-radius: 5px;
  }
`;

const WriteComments = styled.div`
  display: flex;
  border-top: 1px solid lightgray;
  padding: 1.5rem;
  background-color: white;
  justify-content: flex-start;
  align-items: center;
  img {
    margin-left: 2.3rem;
    width: 8rem;
    height: 8rem;
  }
  textarea {
    width: 80%;
    height: 8rem;
    resize: none;
    margin-left: 1rem;
    font-size: 1.5rem;
  }
`;

const CommentsButton = styled.div`
  display: flex;
  justify-content: flex-end;
  background-color: white;
  > button {
    margin: 0 1.5rem 1.5rem 1rem;
    padding: 1.5rem;
    font-size: 1rem;
  }
`;

const ArticleComments = styled.div``;

const Article = ({
  setEdit,
  isLogin,
  userInfo,
  setArticleId,
  setTagArticles,
}) => {
  const articleId = useParams();
  const navigate = useNavigate();

  const [articleComments, setArticleComments] = useState([]);
  const [article, setArticle] = useState("");
  const [text, setText] = useState("");
  const [username, setUsername] = useState("");
  const [hashtags, setHashtags] = useState("");

  useEffect(() => {
    axios
      .get(`/article/${Number(articleId.id)}`, {
        withCredentials: true,
      })
      .then((res) => {
        setArticleComments(res.data.data.comments);
        setArticle(res.data.data.article);
        setUsername(res.data.data.username);
        setHashtags(res.data.data.hashtag);
      });
  }, [articleId]);

  const writeClick = (e) => {
    if (text.length > 0) {
      axios
        .post(
          `/comment/${userInfo.id}/${article.id}`,
          {
            message: text,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          const arr = articleComments.slice();
          setArticleComments([...arr, res.data.data.comment]);
        });
      setText("");
    } else {
      return;
    }
  };

  const writeText = (e) => {
    setText(e.target.value);
  };

  const editArticle = () => {
    setEdit({ article, hashtags });
    setArticleId(Number(articleId.id));
    navigate("/update");
  };

  const deleteArticle = () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      axios
        .delete(`/article/${Number(articleId.id)}`, {
          withCredentials: true,
        })
        .then(() => {
          navigate("/");
        });
    } else {
      return;
    }
  };

  const clickDelete = (e) => {
    const del = articleComments.filter((comment) => comment.id !== e.id);
    setArticleComments(del);
  };

  const ClickHash = (e) => {
    const tagId = hashtags.filter(
      (hashtag) => hashtag.name === e.target.textContent.slice(1)
    );

    axios
      .get(`/article/tag/${tagId[0].id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setTagArticles(res.data.data.articles);
      })
      .then(() => navigate("/"));
  };

  return (
    <ArticleBody>
      <MainImage />
      <ArticleMiddle>
        <MainButton></MainButton>
        <ArticleContents>
          <ArticleTitle>{article.title}</ArticleTitle>
          <ArticleUser>
            {article.image ? (
              <span>
                <span>
                  <img src={article.image} alt="사진" /> {username.name}
                </span>
                <span>{(article.createdAt || "").slice(0, 10)}</span>
              </span>
            ) : (
              <span>
                <span>
                  <img
                    src={"https://onweddingimg.s3.amazonaws.com/default.png"}
                    alt="사진"
                  />
                  {username.name}
                </span>
                <span>{(article.createdAt || "").slice(0, 10)}</span>
              </span>
            )}
          </ArticleUser>
          <ArticleText>{article.message}</ArticleText>
          <HashTags>
            {hashtags
              ? hashtags.map((hashtag) => {
                  return (
                    <li key={hashtag.id} onClick={ClickHash}>
                      #{hashtag.name}
                    </li>
                  );
                })
              : null}
          </HashTags>
          {userInfo.id === article.user_id ? (
            <EditButton>
              <button onClick={editArticle}>수정</button>
              <button onClick={deleteArticle}>삭제</button>
            </EditButton>
          ) : null}
        </ArticleContents>
        <ArticleComments>
          {articleComments &&
            articleComments.map((comment) => {
              return (
                <Comments
                  clickDelete={() => clickDelete(comment)}
                  comment={comment}
                  key={comment.id}
                  userInfo={userInfo}
                />
              );
            })}
        </ArticleComments>
        <WriteComments>
          {article.image ? (
            <img src={article.image} alt="사진" />
          ) : (
            <img
              src={
                "https://onwedding-img.s3.ap-northeast-2.amazonaws.com/default.jpeg"
              }
              alt="사진"
            />
          )}
          <textarea value={text} onChange={writeText} />
        </WriteComments>
        <CommentsButton>
          {isLogin ? <button onClick={writeClick}>댓글쓰기</button> : null}
        </CommentsButton>
      </ArticleMiddle>
    </ArticleBody>
  );
};

export default Article;
