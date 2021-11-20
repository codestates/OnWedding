import React from "react";
import styled from "styled-components";

const StyledFoot = styled.footer`
  width: 60%;
  height: 5rem;
  margin: auto;
  padding: 0rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f4eae0;
  border-top: 1px solid lightgray;
  /* border: 1px solid lightgray; */
`;

const Styledicon = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;
  /* border: 1px solid lightgray; */
  & li {
    padding: 0px 10px;
  }
`;

const Element = styled.div`
  font-size: 0.9rem;
  /* border: 1px solid lightgray; */
  @media only screen and (max-width: 600px) {
    font-size: 0.9rem;
  }
`;
const Icon = styled.a`
  color: black;
  font-size: 1.2rem;
`;

const Footer = () => {
  return (
    <StyledFoot>
      <div>
        <Element>Copyright ⓒ 2021 Onwedding, Inc</Element>
      </div>
      <div>
        <Styledicon>
          <li>
            <Icon target="_blank" href="https://github.com/skagns211">
              <i className="fa fa-github"></i>
            </Icon>
          </li>
          <li>
            <Icon target="_blank" href="https://youtube.com">
              <i className="fab fa-youtube"></i>
            </Icon>
          </li>
          <li>
            <Icon target="_blank" href="https://facebook.com">
              <i className="fab fa-facebook-square"></i>
            </Icon>
          </li>
          <li>
            <Icon target="_blank" href="https://instagram.com">
              <i className="fab fa-instagram"></i>
            </Icon>
          </li>
        </Styledicon>
      </div>
    </StyledFoot>
  );
};

export default Footer;
