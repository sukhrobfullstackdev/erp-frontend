import React from "react";
import styled from "styled-components";
import Button from "../../../components/elements/button";
import Icon from "../../../components/elements/icon";

const Styled = styled.div`
  .AddButton {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      position: absolute;
      bottom: -70px;
      background-color: #45b26b;
      border-radius: 50%;
      height: 60px;
      width: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      &:after {
        border-radius: 50%;
      }
      .ui__icon__wrapper {
        width: 36px;
        height: 36px;
        .icon {
          width: 36px;
          height: 36px;
        }
      }
    }
  }
`;

export default function AddButton({ className = "", ...props }) {
  return (
    <Styled className={className} {...props}>
      <Button className="AddButton">
        <Icon icon="icon-task-list" color="#FCFCFD" />
      </Button>
    </Styled>
  );
}
