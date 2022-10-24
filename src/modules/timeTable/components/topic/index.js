import React from "react";
import styled from "styled-components";

const StyledTopic = styled.div`
  background-color: #fff;
  padding: 20px;
  border-bottom: 1px solid #f4f5f6;
  .title {
    font-size: 16px;
    font-weight: 500;
    color: #777e90;
    margin-bottom: 20px;
  }
  .topic {
    width: 100%;
    background-color: #fcfcfd;
    border-radius: 6px;
    padding: 10px;
    font-size: 14px;
    color: #353945;
  }
`;

const Topic = () => {
  return (
    <StyledTopic>
      <div className="title">TOPICS</div>
      <div className="topic"> 1 . Oracle also sponsors a variety of third party Java technology conferences and events.</div>
    </StyledTopic>
  );
};

export default Topic;
