import React from "react";
import styled from "styled-components";
import Button from "../../../../components/elements/button";
import Icon from "../../../../components/elements/icon";
import File from "../file/file";

const StyledFileContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-bottom: 1px solid #f4f5f6;
  .title {
    font-size: 16px;
    font-weight: 500;
    color: #777e90;
    margin-bottom: 20px;
  }
  .files {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .file {
      margin-right: 15px;
      :last-child {
        margin: 0;
      }
    }
  }
  .upload__btn {
    display: flex;
    justify-content: end;
    button {
      display: flex;
      align-items: center;
      background-color: #45b26b;
      color: #fff;
      font-size: 14px;
      font-weight: 500;
      min-height: 40px;
      min-width: 110px;
      border-radius: 6px;
      .ui__icon__wrapper {
        width: 20px;
        height: 20px;
        margin-right: 14px;
        .icon-upload {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
`;

const FileContainer = () => {
  return (
    <StyledFileContainer>
      <div className="title">HOMEWORKS</div>
      <div className="files">
        <File />
        <File />
        <File />
        <File />
        <File />
        <File />
        <File />
      </div>
      <Button className="upload__btn">
        <Icon icon="icon-upload" color="#FCFCFD" />
        Upload
      </Button>
    </StyledFileContainer>
  );
};

export default FileContainer;
