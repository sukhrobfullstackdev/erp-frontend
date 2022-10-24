import React from "react";
import styled from "styled-components";
import Input from "../elements/input";
import Label from "../elements/label";
import Title from "../elements/title";
import Button from "./../elements/button";

const SavePrivetViewStyle = styled.div`
  width: 460px;
  height: 188px;
  background: #ffffff;
  border: 1px solid #e6e8ec;
  box-sizing: border-box;
  box-shadow: 0px 40px 32px -24px rgba(15, 15, 15, 0.12);
  border-radius: 12px;
  padding: 20px;
  .title {
    text-transform: capitalize;
    color: #23262f;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    color: #777e91;
  }
  .label {
    width: 100%;
    font-weight: 600;
    font-size: 10px;
    line-height: 12px;
    color: #a7adbf;
    margin-top: 30px;
    margin-bottom: 15px;
  }
  .inputContainer {
    width: 100%;
    background: #fafafb;
    border: 0.5px solid #e6e8ec;
    box-sizing: border-box;
    border-radius: 6px;
    margin-top: 6px;
  }
  .bottoms {
    display: flex;
    justify-content: flex-end;
    .cancel,
    .save {
      button {
        font-weight: 500;
        font-size: 10px;
        line-height: 15px;
        text-align: center;
        text-transform: capitalize;
        padding: 8px 14px 7px 14px;
        border-radius: 8px;
      }
    }
    .cancel {
      button {
        background: rgba(239, 70, 111, 0.05);
        &:hover {
          background: rgba(239, 70, 111, 0.1);
        }
      }
    }
    .save {
      margin-left: 6px;
    }
  }
  ${({ theme }) =>
    theme.mode === "dark" &&
    `
        background: #0D0D0D;
        color: #FFFFFF;
    `}
`;

export default function SavePrivetView({ value = "", onchange = () => {}, cancel = () => {}, save = () => {} }) {
  return (
    <SavePrivetViewStyle>
      <Title sm medium className="title">
        Save private view
      </Title>
      <Label className="label">
        NAME YOUR VIEW
        <Input value={value} onChange={onchange} />
      </Label>
      <div className="bottoms">
        <Button outlineDanger className="cancel" onCLick={cancel}>
          Cancel
        </Button>
        <Button success className="save" onCLick={save}>
          Save View
        </Button>
      </div>
    </SavePrivetViewStyle>
  );
}
