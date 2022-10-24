import React from "react";
import styled from "styled-components";
const Styled = styled.div`
  .group {
    padding: 10px 14px;
    background: ${({ selected }) => (selected ? "#353945" : "#F9FAFB")};
    border-radius: 4px;
    margin: 10px;
    cursor: pointer;
    &__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__name {
      font-family: Poppins;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 21px;
      display: flex;
      align-items: center;
      text-align: center;
      color: ${({ selected }) => (selected ? "#F9FAFB" : "#353945")};
      margin-bottom: 8px;
    }
    &__type {
      font-family: Poppins;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 21px;
      align-items: center;
      text-align: center;
      color: ${({ selected }) => (selected ? "#E6E8EC" : "#777E91")};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 73%;
    }
    &__status {
      font-family: Poppins;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 21px;
      display: flex;
      align-items: center;
      text-align: center;
      color: #45b36b;
    }
  }
  &.groupActive {
    .group {
      background-color: #353945;
      &__name {
        color: #fcfcfd;
      }
      &__type {
        color: #e6e8ec;
      }
      &__status {
        color: #45b36b;
      }
    }
  }
`;
const GroupRow = ({ onClick, name, type, status, ...props }) => {
  //   const onGroupClick

  return (
    <Styled {...props}>
      <div className="group" onClick={() => onClick()}>
        <span className="group__name">{name}</span>
        <div className="group__footer">
          <span className="group__type">{type}</span>
          <span className="group__status">{status}</span>
        </div>
      </div>
    </Styled>
  );
};

export default GroupRow;
