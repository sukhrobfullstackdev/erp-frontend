import React, { memo, useState } from "react";
import styled, { css } from "styled-components";
import { get } from "lodash";
import SimpleBar from "simplebar-react";
import classNames from "classnames";
import { useHistory, useRouteMatch } from "react-router-dom";
import Button from "../../elements/button";
import Dropdown from "../../elements/dropDown";
import Icon from "../../elements/icon";
import Field from "../../../containers/Form/field";
import FormDemo from "../../../containers/Form/form-demo";

const Styled = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 275px;
  padding: 14px;
  border-radius: 8px;
  background: #fff;
  border: 1px solid #f4f5f6;
  max-height: 275px;
  color: #353945;

  .lead-head {
    width: -webkit-fill-available;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .dropDown {
      &__body {
        .drop-down-item {
          display: block;
          padding: 10px 14px;
          font-size: 14px;
          cursor: pointer;
        }

        .drop-down-item.first {
          display: block;
          padding: 10px 14px;
          border-bottom: 1px solid #f4f5f6;
        }
      }
    }

    .icon {
      width: 14px !important;
      height: 14px !important;
    }

    .icon-more-dots {
      width: 26px !important;
    }

    .lead-name {
      display: flex;
      font-family: Poppins;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 21px;
      text-align: center;
      color: #353945;
      align-items: center;

      .ui__icon__wrapper {
        margin-left: 12px;
      }
    }
  }

  .lead-info {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .dropDown__body {
      right: 8px;
      width: 200px;
      max-height: 289px;
      overflow-y: auto;
    }

    .lead-number {
      margin: 12px 0;
      display: flex;
      font-size: 12px;
      color: #777e90;
    }

    .assign_row {
      display: flex;
      align-items: center;
      padding: 4px;
    }

    .assign__title {
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;
      margin: 10px 14px;
    }

    .assign__body {
      min-width: 190px;
      max-width: 240px;
    }

    .assign_serach {
      display: flex;
      padding: 10px;

      .ui__icon__wrapper.md {
        .icon {
          width: 14px;
          height: 14px;
        }
      }

      input {
        border: none;
        outline: none;
        width: 100%;
        margin-left: 12px;
        font-size: 14px;
      }
    }

    .assign_row__img {
      border: 1px solid #23262f;
      box-sizing: border-box;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 14px;
      position: relative;
    }

    .assign_row__name {
      font-family: Poppins;
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;
      text-align: center;
    }

    .assign_row_img_name {
      font-size: 10px;
      line-height: 15px;
      text-align: center;
      color: #ffffff;
      background: #fb09ff;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .assign_humans {
      padding: 10px;
    }

    .assign_row__online {
      position: absolute;
      background: #5cca81;
      border: 1px solid #fcfcfd;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      top: 0;
      right: 0;
    }
  }

  .footer {
    width: -webkit-fill-available;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .message-icon {
      width: 100px;

      button {
        &:hover {
          background: #fff4d9;
          border: 1px solid #ffd166;
        }
      }
    }

    .phone-icon {
      width: 100px;

      button {
        width: 100%;

        &:hover {
          background: #e2f5e9;
          border: 1px solid #45b36b;
        }
      }
    }

    .comment-icon {
      height: 26px;

      .dropDown {
        .ui__icon__wrapper.md {
          width: 20px;
          height: 20px;

          .icon {
            width: 20px;
            height: 20px;
          }
        }

        .dropDown__button {
          .dropdownButton {
            width: 26px;
            height: 26px;
            background: #f4f5f6;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: 0.1s;

            &.active,
            &:hover {
              background: #5cca81;

              .ui__icon__wrapper.md {
                .icon {
                  background-color: #fcfcfd;
                }
              }
            }
          }
        }

        .dropDown__body {
          top: 60px;
          right: -5px;
          overflow: inherit;

          .comment_body {
            width: 274px;
            //padding: 0 4px 0 0;
            &:after {
              content: "";
              height: 20px;
              width: 20px;
              border-top: 10px solid transparent;
              border-bottom: 10px solid #fff;
              border-left: 10px solid transparent;
              border-right: 10px solid transparent;
              position: absolute;
              top: -20px;
              right: 15px;
            }

            .comment_content {
              padding: 5px 5px 12px 12px;
              border-bottom: 1px solid #ccc;
              max-height: 108px;
              //overflow-y: scroll;
              ::-webkit-scrollbar {
                width: 4px;
                height: 7px;
                margin-right: 2px;
                border-radius: 12px;
                cursor: default;
              }

              /* Track */

              ::-webkit-scrollbar-track {
                background: #ffffff;
                cursor: default;
                border-radius: 0 12px 12px 0;
                margin: 5px 4px 5px 0;
              }

              /* Handle */

              ::-webkit-scrollbar-thumb {
                background: rgrgbaba(177, 181, 195, 0.8);
                border-radius: 12px;
                cursor: default;
                margin: 5px 0;
                margin-right: 2px;
              }

              /* Handle on hover */

              ::-webkit-scrollbar-thumb:hover {
                background: rgba(177, 181, 195, 1);
                border-radius: 12px;
                cursor: default;
              }

              .no-comment {
                background: #f4f5f6;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #b1b5c4;
                min-height: 88px;
                border-radius: 4px;
              }

              .comment-row {
                display: flex;
                flex-direction: column;
                padding: 6px;
                background: #f4f5f6;
                border-radius: 4px;
                margin-bottom: 5px;
                position: relative;

                .exitBtn {
                  background: #ef466f;
                  position: absolute;
                  right: -2px;
                  width: 16px;
                  top: -5px;
                  height: 16px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  border-radius: 50%;
                  animation: hideAnim 0.1s forwards;

                  .ui__icon__wrapper {
                    width: 100% !important;
                    height: 100% !important;

                    .icon {
                      width: 100% !important;
                      height: 100% !important;
                    }
                  }
                }

                &:hover {
                  .exitBtn {
                    animation: showAnim 0.1s forwards;
                  }
                }

                .comment-text {
                  font-size: 10px;
                }

                .comment-date {
                  display: block;
                  text-align: end;
                  font-size: 10px;
                  color: #777e91;
                }
              }
            }

            .comment_input {
              padding: 10px 12px;
              display: flex;
              align-items: center;

              .input-wrapper {
                display: flex;
                align-items: center;
                border: 1px solid ${({ isFocus }) => (isFocus ? "#45B26B" : "#fff")};
                border-radius: 6px;
                padding: 4px 4px 4px 10px;
                background: ${({ isFocus }) => (isFocus ? "#fff" : "#F8F9FA")};
                height: 30px;
                width: 100%;

                .comment-input-field {
                  width: 100%;
                }

                .form-input-container {
                  border: none;
                }

                .form-input {
                  height: 28px;
                  font-size: 10px;
                  background: ${({ isFocus }) => (isFocus ? "#fff" : "#F8F9FA")};
                  padding-left: 0;
                }
              }

              .ui__icon__wrapper.md {
                width: 26px;
                height: 22px;
                background: ${({ isFocus }) => (isFocus ? "#45B26B" : "#E6E8EC")};
                border-radius: 3px;
              }
            }

            .simplebar-content {
              padding: 12px !important;
            }
          }
        }
      }

      button {
        width: 26px;
        background: #45b36b;
        padding: 0;

        &:hover {
          background: #45b36b;
          border: 1px solid #45b36b;
        }
      }
    }

    button {
      display: flex;
      font-size: 12px;
      padding: 0 10px;
      height: 26px;
      border: 1px solid #f4f5f6;
      border-radius: 6px;

      div {
        width: 26px;
      }

      .ui__icon__wrapper.md {
        margin-right: 15px;

        .icon {
          width: 16px;
          height: 15px;
        }
      }
    }
  }

  .simplebar-track {
    &.simplebar-vertical {
      width: 8px;
      right: -2px;
      margin-right: 4px;

      .simplebar-scrollbar {
        &:before {
          background: #e6e8ec;
          border-radius: 2px;
        }
      }
    }
  }

  ${({ theme: { mode } }) =>
    mode === "dark" &&
    css`
      background: rgba(13, 13, 13, 1);
      color: #b1b5c4;
      border: 1px solid rgba(35, 38, 47, 1);
      .lead-head {
        .lead-text: {
          color: #f4f5f6;
        }
      }
    `}
`;
const LeadCard = ({ item, fillColor = "#3772FF", className = "", redirectUrl = {} }) => {
  const [isFocus, setIsFocus] = useState(false);
  // const [client, setClient] = useState({x: 0, y: 0});
  const history = useHistory();
  const match = useRouteMatch();

  return (
    <Styled isFocus={isFocus} className={className} {...{ client: "" }}>
      <FormDemo>
        <div className="lead-head">
          <span className="lead-name">
            {get(item, "first_name", "")}
            <Icon icon="icon-filled" color={fillColor} />
          </span>
          <Dropdown button={<Icon icon="icon-more-dots" color="dark" />}>
            <div>
              <span
                className="drop-down-item .first"
                onClick={() => history.push(get(redirectUrl, "itemOpen", "#") + get(item, "id"))}
              >
                Summary
              </span>
              <span className="drop-down-item" onClick={() => history.push(get(redirectUrl, "itemEdit", "#") + get(item, "id"))}>
                Edit
              </span>
            </div>
          </Dropdown>
        </div>
        <div className="lead-info">
          <span className="lead-number">{get(item, "phone_number", "")}</span>
          <Dropdown
            button={
              <Icon
                icon="icon-assign"
                onClick={(e) => {
                  // setClient({ x: (e.clientX - 25), y: (e.clientY + 20) });
                  // setClient({ x: (e.clientX - 230), y: (e.clientY + 18) });
                }}
              />
            }
          >
            <div className="assign__body">
              <div className="assign_serach">
                <Icon icon="icon-search" />
                <input placeholder="search..." />
              </div>
              <span className="assign__title">People</span>
              <div className="assign_humans">
                <div className="assign_row">
                  <div className="assign_row__img">
                    <img />
                    <span className="assign_row_img_name">RR</span>
                    <span className="assign_row__online"></span>
                  </div>
                  <span className="assign_row__name">Ronald Richards</span>
                </div>
                <div className="assign_row">
                  <div className="assign_row__img">
                    <img />
                    <span className="assign_row_img_name">RR</span>
                    <span className="assign_row__online"></span>
                  </div>
                  <span className="assign_row__name">Ronald Richards</span>
                </div>
              </div>
            </div>
          </Dropdown>
        </div>
        <div className="footer">
          <Button className="phone-icon">
            <Icon icon="icon-phone" color="#45B36B" />
            Call
          </Button>
          <Button className="message-icon">
            <Icon icon="icon-message" color="#FFD166" />
            Message
          </Button>
          <div className="comment-icon">
            <Dropdown
              button={
                <div
                  className={classNames("dropdownButton", {
                    active: true,
                  })}
                >
                  <Icon icon="icon-comment" color="#B1B5C4" />
                </div>
              }
            >
              <div className="comment_body">
                <SimpleBar className="comment_content">
                  {false ? (
                    <div className="no-comment">No comment</div>
                  ) : (
                    <>
                      <div className="comment-row">
                        <span className="comment-text">
                          Yeah, maybe I should do three different sized speech bubbles. Also the number of comments could be a bit
                          bigger and needs to be moved some .xx em’s up.
                        </span>
                        <span className="comment-date">12 / 02 / 2021</span>
                        <Icon icon={"icon-exit"} mainClassName={"exitBtn"} color={"#FCFCFD"} />
                      </div>
                      <div className="comment-row">
                        <span className="comment-text">
                          Yeah, maybe I should do three different sized speech bubbles. Also the number of comments could be a bit
                          bigger and needs to be moved some .xx em’s up.
                        </span>
                        <span className="comment-date">12 / 02 / 2021</span>
                      </div>
                    </>
                  )}
                </SimpleBar>
                {/*<div className='comment_content'>*/}
                {/*    {false ? <div className='no-comment'>*/}
                {/*        No comment*/}
                {/*    </div> : <>*/}
                {/*        <div className='comment-row'>*/}
                {/*            <span className='comment-text'>*/}
                {/*                Yeah, maybe I should do three different sized speech bubbles. Also the number of comments could be a bit bigger and needs to be moved some .xx em’s up.*/}
                {/*            </span>*/}
                {/*            <span className='comment-date'>12 / 02 / 2021</span>*/}
                {/*        </div>*/}
                {/*        <div className='comment-row'>*/}
                {/*            <span className='comment-text'>*/}
                {/*                Yeah, maybe I should do three different sized speech bubbles. Also the number of comments could be a bit bigger and needs to be moved some .xx em’s up.*/}
                {/*            </span>*/}
                {/*            <span className='comment-date'>12 / 02 / 2021</span>*/}
                {/*        </div>*/}
                {/*    </>*/}
                {/*    }*/}
                {/*</div>*/}
                <div className="comment_input">
                  <div className="input-wrapper">
                    <Field
                      type={"input"}
                      hideLabel
                      property={{
                        onFocus: () => setIsFocus(true),
                        onBlur: () => setIsFocus(false),
                        placeholder: "Enter text...",
                      }}
                      name={"comment-input"}
                      className={"comment-input-field"}
                    />
                    <Icon icon="icon-send" color="#FCFCFD" />
                  </div>
                </div>
              </div>
            </Dropdown>
          </div>
        </div>
      </FormDemo>
    </Styled>
  );
};

export default memo(LeadCard);
