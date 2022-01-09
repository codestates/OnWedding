import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const CommentsBody = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top: 1px solid lightgray;
  /* padding: 1.5rem 4.1rem; */
  background-color: white;
`;

const CommentImage = styled.div`
  img {
    width: 7rem;
    height: 7rem;
    border-radius: 50%;
    padding-left: 3.9rem;
    margin: 2rem 0;
  }
`;

const StyledEdit = styled.span`
  resize: none;
  font-size: 1.5rem;
  padding-left: 1rem;
  width: 60%;
  textarea {
    width: 90%;
    height: 5.5rem;
    resize: none;
    margin-left: 1rem;
    font-size: 1.5rem;
  }
`;

const CommentMiddle = styled.div`
  button {
    margin: 0.5rem;
    padding: 0.5rem;
  }
  > div {
    margin: 0.5rem;
  }
`;

const Comments = ({ comment, clickDelete, userInfo }) => {
  const [edit, setEdit] = useState(false);
  const [comments, setComments] = useState(comment.message);

  const editText = (e) => {
    setComments(e.target.value);
  };

  const editComment = (e) => {
    setEdit(!edit);
    if (e.target.textContent === "확인") {
      axios.patch(
        `/${comment.id}`,
        {
          message: comments,
        },
        { withCredentials: true }
      );
    }
  };

  const deleteComment = () => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      axios.delete(`/${comment.id}`, {
        withCredentials: true,
      });
      clickDelete(comment);
    }
  };
  return (
    <CommentsBody>
      <CommentImage>
        {comment.image ? (
          <img src={comment.image} alt="사진" />
        ) : (
          <img
            src={
              "https://onwedding-img.s3.ap-northeast-2.amazonaws.com/default.jpeg"
            }
            alt="사진"
          />
        )}
      </CommentImage>
      <StyledEdit>
        {edit ? (
          <textarea onChange={editText}>{comments}</textarea>
        ) : (
          <span>{comments}</span>
        )}
      </StyledEdit>

      <CommentMiddle>
        <div>{(comment.createdAt || "").slice(0, 10)}</div>
        {userInfo.id === comment.user_id ? (
          <div>
            <button onClick={editComment}>{edit ? "확인" : "수정"}</button>
            <button onClick={deleteComment}>삭제</button>
          </div>
        ) : (
          <br></br>
        )}
      </CommentMiddle>
    </CommentsBody>
  );
};

export default Comments;
