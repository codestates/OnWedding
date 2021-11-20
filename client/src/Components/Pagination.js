import React from "react";
import styled from "styled-components";

const PaginationBody = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 1rem;
`;

const PageList = styled.li`
  border-radius: 5px;
  border: 1px solid black;
  margin: 0.5rem;
  background-color: lightgray;
  padding: 0.5rem;
  :hover {
    background-color: #f4ece0;
  }
`;

const Pagination = ({ post, totalPost, paginate }) => {
  const pageNum = [];

  for (let i = 1; i <= Math.ceil(totalPost / post); i++) {
    pageNum.push(i);
  }

  return (
    <PaginationBody>
      {pageNum.map(page => {
        return (
          <PageList key={page.id} onClick={() => paginate(page)}>
            {page}
          </PageList>
        );
      })}
    </PaginationBody>
  );
};

export default Pagination;
