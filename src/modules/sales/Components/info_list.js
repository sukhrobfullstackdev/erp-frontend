import React from "react";
import styled from "styled-components";
const Style = styled.div`
  .info_list {
    padding: 0;
    align-items: center;
    hr {
      margin: 15px 0;
    }
    &-item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 30px;
      &:first-child {
        padding-top: 30px;
      }
      &:last-child {
        padding-bottom: 30px;
      }
      form {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    .key {
      color: #777e91;
    }
  }
`;
const InfoList = ({ children }) => {
  return (
    <Style>
      <div className="info_list info-card">{children}</div>
    </Style>
  );
};

export default InfoList;
