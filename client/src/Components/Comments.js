import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const CommentsBody = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top: 1px solid lightgray;
  padding: 1.5rem 4.1rem;
  background-color: white;
  justify-content: space-between;
`;

const CommentImage = styled.div`
  img {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
  }
`;

const StyledEdit = styled.span`
  resize: none;
  font-size: 1.5rem;
`;

const CommentMiddle = styled.div``;

const Comments = ({ comment, clickDelete, userInfo }) => {
  const [edit, setEdit] = useState(false);
  const [comments, setComments] = useState(comment.message);

  const editText = e => {
    setComments(e.target.value);
  };

  const editComment = e => {
    setEdit(!edit);
    if (e.target.textContent === "확인") {
      axios.patch(
        `https://localhost:4000/comment/${comment.id}`,
        {
          message: comments,
        },
        { withCredentials: true }
      );
    }
  };

  const deleteComment = () => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      axios.delete(`https://localhost:4000/comment/${comment.id}`, {
        withCredentials: true,
      });
      clickDelete(comment);
    }
  };
  return (
    <CommentsBody>
      {comment.image ? (
        <CommentImage>
          <img src={comment.image} alt="사진" />
        </CommentImage>
      ) : (
        <CommentImage>
          <img
            src={
              "https://onwedding-img.s3.ap-northeast-2.amazonaws.com/default.jpeg"
            }
            alt="사진"
          />
          <StyledEdit>
            {edit ? (
              <textarea onChange={editText}>{comments}</textarea>
            ) : (
              comments
            )}
          </StyledEdit>
        </CommentImage>
      )}

      <CommentMiddle>
        <div>{(comment.createdAt || "").slice(0, 10)}</div>
        {userInfo.id === comment.user_id ? (
          <div>
            <button onClick={editComment}>{edit ? "확인" : "수정"}</button>
            <button onClick={deleteComment}>삭제</button>
          </div>
        ) : null}
      </CommentMiddle>
    </CommentsBody>
  );
};

export default Comments;
