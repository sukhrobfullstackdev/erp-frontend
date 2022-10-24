import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Col, Row } from "react-grid-system";
import { connect } from "react-redux";
import { get, isEmpty } from "lodash";
import Button from "../../../components/elements/button";
import FormDemo from "../../Form/form-demo";
import Field from "../../Form/field";
import Actions from "../../../modules/settings/actions";
import { toast } from "react-toastify";
import ListBox from "./ListBox";
import Icon from "../../../components/elements/icon";
import { withTranslation } from "react-i18next";
import { Draggable } from "react-beautiful-dnd";

const variables = {
  dragingIconShow: "21px",
};

const StyledListItem = styled.div`
  background: ${({ active }) => (active ? "#45B36B" : "#f1f2f4")};
  border-radius: 10px;
  /* padding: 10px; */
  cursor: default !important;
  margin-bottom: 10px;
  position: relative;
  overflow: hidden;
  height: 60px;
  padding: 0 21px;
  padding-left: 29px;
  form {
    position: relative;
    display: inline-block;
  }
  .draggingIconContainer {
    position: absolute;
    top: 0px;
    left: ${({ active }) => (active ? "0" : "-150px")};
    height: 100%;
    display: flex;
    align-items: center;
    transition: 0.3s;
    z-index: 2;
    .IconDots {
      .ui__icon__wrapper {
        width: 23px;
        height: 38px;
        cursor: grab;
        .icon {
          width: 23px;
          height: 38px;
          -webkit-mask-size: 70%;
          mask-size: 70%;
          background: ${({ active }) => (active ? "white" : "#777e91")};
        }
      }
    }
  }
  .form {
    height: 100%;
    display: flex;
    align-items: center;
    .form-input-container {
      padding: 0;
      background: unset;
      border: none;
      height: 40px;
      max-width: 250px;
      padding: 5px 14px;
      padding-right: 40px;
      background-color: ${({ disabled }) => (disabled ? "transparent" : "#FCFCFD")};
      border-radius: 6px;
    }

    .form-input {
      color: ${({ active }) => (active ? "#fff" : "#353945")};
      font-size: 20px;
      font-weight: 400;
      line-height: 30px;
      border: none;
      outline: none;
      text-transform: uppercase;
      cursor: pointer;
      padding: 0;
    }

    &__btn {
      /* display: ${({ disabled }) => (disabled ? "none" : "block")}; */
      animation: ${({ disabled }) => (disabled ? "hideAnim 0.2s forwards" : "showAnim 0.2s forwards")};
      position: absolute;
      top: 16px;
      right: 18px;
      z-index: 9;
      a,
      button {
        width: 28px;
        height: 28px;
        border-radius: 5px;
        min-width: auto;
        background: #e6e8ec;
        .ui__icon__wrapper {
          width: 20px !important;
          height: 20px !important;
          .icon {
            width: 100% !important;
            height: 100% !important;
            -webkit-mask-size: auto;
            mask-size: auto;
          }
        }
      }
    }
  }
  .iconContainer {
    position: absolute;
    top: 0px;
    right: 20px;
    height: 100%;
    display: flex;
    align-items: center;
    .bottomArrow {
      .ui__icon__wrapper {
        transition: none;
        width: 34px !important;
        height: 34px !important;
        .icon {
          width: 100% !important;
          height: 100% !important;
          transition: none !important;
        }
      }
    }
  }

  ${({ active }) =>
    active &&
    css`
      .iconContainer {
        .bottomArrow {
          transform: rotate(180deg);
          .ui__icon__wrapper {
            .icon {
              background-color: #fcfcfd;
            }
          }
        }
      }
      &.md,
      &.sm {
        .iconContainer {
          .bottomArrow {
            .ui__icon__wrapper {
              .icon {
                background-color: ${({ active }) => (active ? "white" : "#323232")};
              }
            }
          }
        }
      }
      .draggingIconContainer {
        left: ${({ active }) => (active ? "21px" : "-150px")};
      }
    `}
  ${({ active }) =>
    !active &&
    css`
      &:hover {
        background: #e6e8ec;
        color: #353945;
        .draggingIconContainer {
          left: ${get(variables, "dragingIconShow", "-150px")};
        }
        .form {
          .form-input {
            color: #353945;
            &:hover {
              color: ${({ active }) => (active ? "white" : "#353945")};
            }
          }
        }
      }
    `}
  &.md {
    height: 60px;
    &:hover {
      background: ${({ active }) => (active ? "#45B36B" : "#FCFCFD")};
      .form {
        .form-input {
          color: ${({ active }) => (active ? "white" : "#353945")};
        }
      }
      .draggingIconContainer {
        left: ${get(variables, "dragingIconShow", "-150px")};
      }
    }
    background: ${({ active }) => (active ? "#45B36B" : "#F4F5F6")};

    .form {
      .form-input {
        color: ${({ active }) => (active ? "white" : "#353945")};
        font-size: 18px;
        line-height: 27px;
      }
    }
    div.form {
      padding: 8px;
    }
    .iconContainer {
      .bottomArrow {
        transform: translateX(0px);
      }
    }
    ${({ active }) =>
      active &&
      css`
        .iconContainer {
          .bottomArrow {
            transform: rotate(180deg);
          }
        }
      `}
  }
  &.sm {
    height: 60px;
    margin: 0 -20px 10px;
    background: ${({ active }) => (active ? "#45B36B" : "#F4F5F6")};
    &:hover {
      background: ${({ active }) => (active ? "#45B36B" : "#fcfcfd")};
      .form {
        .form-input {
          color: ${({ active }) => (active ? "white" : "#353945")};
        }
      }
      .draggingIconContainer {
        left: ${get(variables, "dragingIconShow", "-150px")};
      }
    }
    .form {
      .form-input {
        color: ${({ active }) => (active ? "white" : "#353945")};
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
      }
      &__btn {
        a,
        button {
          /* width: 30px;
          height: 30px;
          top: 15px; */
        }
      }
    }
  }

  &.dragging {
    background-color: #45b36b;
    .form-input {
      color: #fff;
    }
    .draggingIconContainer {
      left: ${get(variables, "dragingIconShow", "-150px")};
      .IconDots {
        .ui__icon__wrapper {
          .icon {
            background: #fcfcfd;
          }
        }
      }
    }
    .iconContainer {
      right: 20px;
    }
    .iconContainer {
      .bottomArrow {
        .ui__icon__wrapper {
          .icon {
            background-color: #fcfcfd;
          }
        }
      }
    }
    &.md {
      .IconDots {
        padding-right: 16px;
      }
      .form-input {
        color: ${({ active }) => (active ? "red" : "#fff")};
      }
    }

    &.sm {
      .form-input {
        color: ${({ active }) => (active ? "red" : "#fff")};
      }
    }
    ${({ disabled, active }) =>
      active &&
      !disabled &&
      css`
        &.sm,
        &.md {
          .form-input {
            color: red !important;
          }
        }
      `}
  }

  ${({ disabled, className }) =>
    !disabled &&
    className === "md" &&
    css`
      .from {
        &__btn {
          width: auto;
          height: auto;
        }
      }
    `}
  ${({ disabled, active }) =>
    active &&
    !disabled &&
    css`
    .form {
      &-input {
        color: #353945 !important;
      }import Icon from './../../../components/elements/icon/index';

    }
  `}

  ${({ disabled }) =>
    !disabled &&
    css`
      &.md {
        &:hover {
          .draggingIconContainer {
            left: -150px;
          }
        }
      }
      &:hover {
        .draggingIconContainer {
          left: -150px;
        }
      }
    `}
  div.form {
    padding: 10px;
  }
  label {
    display: none;
  }
  .h-100per {
    height: 100%;
  }
  @keyframes hideAnim {
    0% {
      opacity: 0.8;
      transform: scale(0.8);
    }
    50% {
      opacity: 0.4;
      transform: scale(0.5);
    }
    100% {
      opacity: 0;
      transform: scale(0);
      display: none;
    }
  }
  @keyframes showAnim {
    0% {
      opacity: 0.4;
      display: block;
      transform: scale(0.4);
    }
    50% {
      opacity: 0.8;
      transform: scale(0.8);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const ListItem = ({
  item,
  updateModuleRequest,
  link = "edit-module",
  changeOrder = () => {},
  isDraggingOver = false,
  ...rest
}) => {
  const [disabled, setDisabled] = useState(true);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (disabled) {
      setActive(false);
    }
  }, [disabled]);

  const update = ({ data, setError }) => {
    setLoading(true);
    updateModuleRequest({
      attributes: { ...data, id: get(item, "id", null), link },
      formMethods: { setLoading, setError },
      cb: {
        success: ({ message = "c" }) => {
          setDisabled(true);
          toast.success(message);
        },
      },
    });
  };
  const toggleDisabled = () => {
    setDisabled((disabled) => !disabled);
    setActive(false);
  };
  const makeDisabled = () => setDisabled(true);

  return (
    <>
      <StyledListItem disabled={disabled} active={active} {...rest}>
        <div className="draggingIconContainer">
          <Draggable draggableId={item.id}>
            {(provided, snapshot) => (
              <Icon
                icon="icon-dots"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                mainClassName="IconDots"
              />
            )}
          </Draggable>
        </div>
        <Row className="h-100per">
          <Col xs={12}>
            <div className="h-100per">
              <FormDemo
                mainClassName="h-100per"
                formRequest={update}
                className={"form"}
                footer={
                  <Button type={"button"} className={"form__btn"} center="1" checkDisable="1">
                    <Icon icon="icon-check2" color="#B1B5C4" />
                  </Button>
                }
              >
                <Field
                  hideLabel={"ture"}
                  type="input"
                  name={"titleUz"}
                  defaultValue={get(item, "title")}
                  property={{
                    disabled: true,
                    onDoubleClick: toggleDisabled,
                    onBlur: makeDisabled,
                  }}
                />
              </FormDemo>
            </div>
          </Col>
        </Row>
        <div className="iconContainer">
          <Icon icon="icon-bottom-arrow" mainClassName="bottomArrow" onClick={() => setActive((active) => !active)} />
        </div>
      </StyledListItem>

      {active && !isEmpty(get(item, "departments", [])) && (
        <ListBox
          active
          link={"edit-department"}
          isDraggingOver={isDraggingOver}
          changeOrder={changeOrder}
          itemSize={"md"}
          data={get(item, "departments", [])}
        />
      )}
      {active && !isEmpty(get(item, "pages", [])) && (
        <ListBox
          style={{ marginTop: 0, padding: "0 20px" }}
          link={"edit-page"}
          data={get(item, "pages", [])}
          itemSize={"sm"}
          changeOrder={changeOrder}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateModuleRequest: ({ attributes, formMethods, cb }) =>
      dispatch({
        type: Actions.UPDATE_MODULE_OR_DEPARTMENT_OR_PAGE_TITLE.REQUEST,
        payload: { attributes, formMethods, cb },
      }),
  };
};
export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(ListItem));
