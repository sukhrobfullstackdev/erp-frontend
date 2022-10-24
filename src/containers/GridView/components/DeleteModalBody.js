import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import { isEqual } from "lodash";
import Label from "../../../components/elements/label";
import Input from "../../../components/elements/input";
import Button from "../../../components/elements/button";
import Icon from "../../../components/elements/icon";

const DeleteModuleStyled = styled.div`
  //padding: 20px;
  //background: #FFFFFF;
  //border: 1px solid #E6E8EC;
  //box-sizing: border-box;
  //box-shadow: 0px 40px 32px -24px rgba(15, 15, 15, 0.12);
  //border-radius: 12px;
  //width: 620px;

  .body {
    background: #fcfcfd;
    box-sizing: border-box;
    margin-bottom: 20px;
    padding: 18px;
    border: 0.5px solid #f4f5f6;
    border-radius: 6px;
    width: 580px;
    margin-top: 20px;

    .title {
      display: flex;
      align-items: center;
      background: rgba(239, 70, 111, 0.1);
      border-radius: 6px;
      padding: 8.5px 10.5px;
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;
      color: #353945;
      height: 34px;
      width: 544px;

      .strongInfo {
        margin-right: 12px;

        .ui__icon__wrapper {
          width: 18.5px;
          height: 21px;

          .icon {
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    .des {
      font-weight: normal;
      font-size: 13px;
      line-height: 20px;
      color: #353945;
      margin-top: 18px;
    }
  }

  .del-label {
    width: 580px;
    padding: 1px 0 0;
    text-transform: none !important;
    .moduleName {
      padding-left: 6px;
      font-weight: 600;
      font-size: 10px;
      line-height: 12px;
      color: #a7adbf;
      user-select: none;
      span {
        text-transform: uppercase;
      }
    }

    .input {
      margin-top: 5px;
      width: 100%;

      .inputContainer {
        width: 100%;
        height: 38px;
        border-radius: 6px;
        padding: 2px 10px;
        background: #fafafb;
        border: 0.5px solid #e6e8ec;

        input {
          font-weight: 500;
          font-size: 12px;
          line-height: 18px;
          color: #353945;
        }
      }
    }
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 15px;
    margin-right: -3px;

    button {
      font-weight: 500;
      font-size: 10px;
      line-height: 15px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      height: 34px;
      /* padding: 9px 17px 10px 17px; */
      justify-content: center;
    }

    &__cancel {
      margin-right: 10px;

      button {
        width: 70px;
        background: rgba(239, 70, 111, 0.05);

        &:hover {
          background: rgba(239, 70, 111, 0.1);
        }
      }
    }

    &__yes {
      button {
        width: 89px;
      }
    }
  }
`;

const DeleteModalBody = ({
  title = "You are about to permanently delete this project",
  des = `I have a unity package with my folder structure pre-setup, but meant to be empty, in order to export the folders I put a file "Delete This File.txt" into every bottom folder in the structure to allow unity to export the folders, but I want to write a script that runs on startup which deletes these files, but i can't seem to get the script to find all the files throughout the various folders. How do i do this?`,
  confirmText = "Flutter Development",
  id = null,
  remove = () => {},
  cancel = () => {},
}) => {
  const [value, setValue] = useState("");
  if (confirmText === "-") confirmText = "Yes, Delete";
  useEffect(() => {
    setValue("");
  }, [confirmText]);

  return (
    <DeleteModuleStyled>
      <div className="body">
        <div className="title">
          <Icon icon="icon-strong-info" color="#EF466F" mainClassName="strongInfo" />
          {title}
        </div>
        <p className="des"> {des} </p>
      </div>
      <Label className="del-label" isUpperCase={false}>
        <div className="moduleName">
          <span>TYPE:</span> {confirmText}
        </div>
        <Input className={"input"} value={value} onChange={(e) => setValue(e.target.value)} />
      </Label>
      <div className="buttons">
        <Button className="buttons__cancel" outlineDanger onCLick={cancel}>
          Cancel
        </Button>
        <Button
          className="buttons__yes"
          danger={isEqual(value, confirmText)}
          disabled={!isEqual(value, confirmText)}
          onCLick={() => {
            remove(id);
            setValue("");
          }}
        >
          Yes, delete
        </Button>
      </div>
    </DeleteModuleStyled>
  );
};

export default memo(DeleteModalBody);
