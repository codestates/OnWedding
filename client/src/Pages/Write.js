import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const WriteBody = styled.div`
  width: 75%;
  margin: 0 auto;
`;

const WriteImage = styled.section`
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

const WriteOut = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const WriteContents = styled.div`
  width: 70%;
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
    min-width: 5rem;
    margin-left: 92.5%;
  }
`;

const WriteTitle = styled.div`
  font-size: 2rem;
  font-weight: bolder;
  margin: 1rem 0;
`;

const InputTitle = styled.div`
  margin: 1rem 0;
  font-size: 1.5rem;
  width: 100%;
  display: flex;
  input {
    margin-left: 3.7rem;
    font-size: 20px;
    width: 80%;
  }
`;

const InputImage = styled.div`
  margin: 1rem 0;
  font-size: 1.5rem;
  display: flex;
  justify-content: space-between;
  img {
    max-width: 26.5rem;
    max-height: 26.5rem;
  }
  input {
    font-size: 1rem;
  }
`;

const InputContent = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: row;
  font-size: 1.5rem;
  > textarea {
    font-size: 1.5rem;
    margin-left: 3.7rem;
    width: 80%;
    height: 50rem;
    resize: none;
  }
`;

const InputTags = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem 0;
  font-size: 1.5rem;
  width: 100%;
`;

const TagsInput = styled.div`
  margin: 0rem 1rem;
  width: 80.2%;
  height: 2rem;
  border: 1px solid rgb(118, 118, 118);
  padding: 1.5rem 0rem;
  display: flex;

  textarea {
    font-size: 1.5rem;
    resize: none;
    border: none;
    flex: 1;
    :focus {
      outline: transparent;
    }
  }
  ul {
    padding: 0;
    margin: 0;
    li {
      display: flex;
      align-items: center;
      justify-content: center;
      list-style: none;
      padding: 8px;
      font-size: 1rem;
      border-radius: 10px;
      margin: 0 8px 8px 0;
      background: #f4eae0;
    }
  }
`;

const StyledClose = styled.span`
  margin-left: 0.5rem;
  text-align: center;
  color: black;
  border-radius: 50%;
  padding: 0.1rem;
  background: #fff;
  width: 1rem;
  height: 1rem;
  line-height: 0.7rem;
  border: 1px solid black;
  font-size: 1.5rem;
`;

const Write = ({ userInfo }) => {
  const AWS = require("aws-sdk");
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [hashtag, setHashtag] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [, setClick] = useState("");

  AWS.config.update({
    region: "ap-northeast-2",
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "ap-northeast-2:553da489-28ff-4eb6-b0ba-1187a7a08c29",
    }),
  });

  const handleImg = (event) => {
    const imgFile = event.target.files[0];
    if (!imgFile) {
      return setImage(null);
    }
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "onwedding-img",
        Key: imgFile.name,
        Body: imgFile,
      },
    });

    const promise = upload.promise();

    promise.then(
      (data) => {
        setImage(data.Location);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const removeTags = (e) => {
    setHashtag(hashtag.filter((_, index) => index !== e));
  };

  const addTags = (e) => {
    const filtered = hashtag.filter((el) => el === e.target.value);
    if (e.target.value !== "" && filtered.length === 0) {
      setHashtag([...hashtag, e.target.value]);
      e.target.value = "";
    }
  };

  const writeTitle = (e) => {
    setTitle(e.target.value);
  };

  const writeMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleClick = () => {
    axios
      .post(`/article/${userInfo.id}`, {
        title,
        message,
        image,
        hashtag,
      })
      .then((res) => {
        navigate("/");
      });
  };

  return (
    <WriteBody>
      <WriteImage />
      <MainButton />
      <WriteOut>
        <WriteContents>
          <WriteTitle>글쓰기</WriteTitle>
          <InputTitle>
            제목
            <input
              type="text"
              placeholder="제목을 입력해주세요"
              onChange={writeTitle}
            />
          </InputTitle>
          <InputImage>
            사진추가
            {image ? <img src={image} alt="사진" /> : null}
            <input type="file" onChange={handleImg} />
          </InputImage>
          <InputContent>
            내용
            <textarea
              placeholder="내용을 입력해주세요"
              onChange={writeMessage}
            />
          </InputContent>
          <InputTags>
            해시태그
            <TagsInput>
              <ul>
                {hashtag
                  ? hashtag.map((tag, index) => (
                      <li key={index}>
                        <span>#{tag}</span>
                        <StyledClose onClick={() => removeTags(index)}>
                          x
                        </StyledClose>
                      </li>
                    ))
                  : null}
              </ul>
              <textarea
                type="text"
                onKeyUp={(e) =>
                  window.event.keyCode === 13 || window.event.keyCode === 32
                    ? addTags(e)
                    : null
                }
                onChange={(e) => setClick(e.target.value)}
                placeholder="해시태그를 입력해주세요"
              />
            </TagsInput>
          </InputTags>
          <button onClick={() => handleClick()}>글올리기</button>
        </WriteContents>
      </WriteOut>
    </WriteBody>
  );
};

export default Write;
