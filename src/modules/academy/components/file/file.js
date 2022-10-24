import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../../../components/elements/button";
import Icon from "../../../../components/elements/icon";

const StyledFileStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 0 12px;
  .file {
    background: #f2fcf6;
    border-radius: 6px;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 162px;
    height: 40px;
    margin: 5px 7.5px;
  }
  .text {
    font-size: 14px;
    color: #353945;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 80px;
  }
  .ui__icon__wrapper {
    width: 20px !important;
    height: 20px !important;
    .icon-download {
      width: 20px !important;
      height: 20px !important;
      margin-right: 8px;
    }
    .icon-exit {
      width: 18px !important;
      height: 18px !important;
    }
  }
  .exit__btn {
    min-width: 32px;
    display: flex;
    align-items: center;
    justify-content: end;
    border-left: 1px solid #e2f5e9;
    height: 24px;
    button {
      background-color: #777e91;
      border-radius: 50%;
      padding: 0;
      .ui__icon__wrapper {
        width: 18px !important;
        height: 18px !important;
      }
    }
  }
`;

const File = ({ initialState, onDelete, type, fileIds, download }) => {
  return (
    <StyledFileStyled className={"fileWrapper"}>
      {initialState.map((val, ind) => (
        <div className="file" key={val.size + ind * 11}>
          <a href={val.url}>
            <Icon icon="icon-download" color="#45B26B" />{" "}
          </a>
          <div className="text">{val.orginalName}</div>
          <Button className="exit__btn" onCLick={() => onDelete(val, ind, type)}>
            <Icon icon="icon-exit" color="#FFFFFF" />
          </Button>
        </div>
      ))}
    </StyledFileStyled>
  );
};

export default File;
