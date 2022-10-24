import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import SimpleBar from "simplebar-react";
import { get, isArray, isEmpty } from "lodash";

import Title from "../../../components/elements/title";
import Dropdown from "../../../components/elements/dropDown/dropdown";
import Icon from "../../../components/elements/icon";
import Text from "../../../components/elements/text";

import AssignIcon from "../../../assets/icons/assign_me.svg";
import RefreshIcon from "../../../assets/icons/refresh.svg";
import UserIcon from "../../../assets/icons/User.svg";
import FooterForChat from "./footerForChat";
import { formatDate } from "../../../utils";
import Assign from "../../../components/assign";

const ChatComponentStyle = styled.div`
  border: 1px solid #e6e8ec;
  border-radius: 6px;
  padding: 20px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .header {
    display: flex;
    justify-content: space-between;
    padding: 14px 10px 10px;

    &_profile {
      display: flex;
      align-items: center;

      img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }

      .user_icon {
        width: 36px;
        height: 36px;
        background: #e6e8ec;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }

      h2 {
        color: #000;
        margin-left: 15px;
      }
    }

    &_main {
      display: flex;

      .assign {
        &__header {
          &__item {
            position: relative;
            width: 100px;
            height: 36px;
            &__img {
              width: 36px;
              height: 36px;
              border-radius: 50%;
              position: absolute;
              right: 25px;
            }
          }
        }
        &_icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          position: absolute;
          right: 0;
          z-index: 5;
          background: #fcfcfd;
        }
        &__body {
          top: 45px;
          &__humans {
            &__row {
              &__img {
                &.active {
                  border: 2px solid #45b26b;
                }
              }
            }
          }
        }
      }

      .dropDown {
        .assign_icon {
          width: 36px;
          height: 36px;
        }

        &_body {
          min-width: 190px;
          max-width: 240px;

          &_serach {
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

          &_title {
            font-weight: 500;
            font-size: 12px;
            line-height: 18px;
            color: #353945;
            margin: 10px 14px;
          }

          &_humans {
            padding: 10px;

            .humans {
              display: flex;
              align-items: center;
              padding: 4px;

              &_img {
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

              &_name {
                font-family: Poppins;
                font-style: normal;
                font-weight: 500;
                font-size: 12px;
                line-height: 18px;
                text-align: center;
                color: #353945;
              }
            }
          }
        }
      }

      &_reload {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f4f5f6;
        margin-left: 15px;
        cursor: pointer;
      }
    }
  }

  .body {
    width: 100%;
    max-height: 256px;
    padding: 0px 10px;

    &_day {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-bottom: 10px;

      div {
        padding: 3px 10px;
        background-color: #f4f5f6;
        border-radius: 8px;

        p {
          font-weight: 500;
          font-size: 12px;
          line-height: 18px;
          color: #777e91;
        }
      }
    }

    &_massage {
      display: flex;
      flex-direction: column;

      &_chats {
        display: flex;
        margin-bottom: 15px;

        .chat_profile-img {
          width: 40px;
          height: 40px;
          border: 1px solid #45b36b;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;

          img {
            width: 34px;
            height: 34px;
            border-radius: 50%;
          }
        }

        .chat_items {
          margin-left: 15px;

          &_message {
            padding: 16px 20px;
            background-color: #f4f5f6;
            border-radius: 16px;
            display: inline-block;

            p {
              color: #353945;
              line-height: 18px;
            }
          }

          &_profile-NameAndTime {
            margin-top: 6px;
            display: flex;
            align-items: center;

            span {
              color: #777e91;
              font-weight: 500;
              font-size: 10px;
              line-height: 15px;
              margin-left: 10px;
            }
          }
        }
      }
    }
  }

  .chat_footer {
    .writeing_chat {
      width: 100%;
      max-height: 44px;
      background-color: #f4f5f6;
      border-radius: 8px;
      display: flex;
      padding: 8px 8px 8px 16px;
      align-items: center;

      input {
        width: 100%;
        border: none;
        background: none;
        outline: none;
        font-weight: 400;
        font-size: 12px;
        color: #353945;
        line-height: 18px;
        box-shadow: 0 0 0 30px #f4f5f6 inset;
        border-radius: 0px;

        &::placeholder {
          color: #b1b5c4;
        }
      }

      button {
        padding: 5px 13px 5px 14px;
        font-weight: 600;
        font-size: 12px;
        line-height: 18px;
        border-radius: 6px;
      }

      span {
        padding: 6px 13px 4px 14px;
        font-weight: 600;
        font-size: 12px;
        line-height: 18px;
        border-radius: 6px;
        background-color: #e6e8ec;
        color: #b1b5c4;
        cursor: pointer;
      }
    }
  }
`;

const ChatComponent = ({ chatData, isCreatePage, isEditPage, getMessageList, request }) => {
  const [messages, setMessages] = useState([]);
  let isCreateOrEdit = isCreatePage || isEditPage;
  useEffect(() => {
    setMessages(get(chatData, "messages", []));
  }, [chatData]);

  const clickRefresh = () => {
    !isCreateOrEdit &&
      getMessageList({
        id: get(chatData, "id", ""),
        cb: {
          success: (res) => setMessages(get(res, "data.messages", [])),
        },
      });
  };

  const assignHandling = (value) => {
    console.log(value);
    request({
      url: `/finance/v1/expense-proposition/chat/add-user`,
      attributes: {
        usersId: value,
        chatId: get(chatData, "id", ""),
      },
      cb: {
        success: (res) => {
          console.log(res);
        },
      },
    });
  };

  const customHeader = (selected = []) => (
    <>
      {isArray(selected) &&
        selected.map(
          (item, index) =>
            index < 2 && (
              <img
                src={get(item, "avatarUrl", "")}
                style={{
                  right: `${(index + 1) * 25}px`,
                  zIndex: 5 - (index + 1),
                }}
                className={"assign_icon assign__header__item__img"}
                alt="icon"
              />
            )
        )}
      {<img src={AssignIcon} className={"assign_icon"} alt="icon" />}
    </>
  );

  return (
    <ChatComponentStyle>
      <div className={"header"}>
        <div className={"header_profile"}>
          {get(chatData, "owner.avatarUrl", "") ? (
            <img src={get(chatData, "owner.avatarUrl", "")} alt="img" />
          ) : (
            <div className={"user_icon"}>
              <Icon icon={"icon-userImg"} />
            </div>
          )}
          <Title medium xs lHeight={18}>
            {get(chatData, "owner.fullName", "")}
          </Title>
        </div>
        {!isCreatePage && (
          <div className={"header_main"}>
            <Assign
              {...{
                options: get(chatData, "member.options", {}),
                // editable: !isCreatePage,
                defaultValue: get(chatData, "member.values", {}),
                onChange: assignHandling,
                customHeader,
                isDoubleClick: false,
                photoKey: "avatarUrl",
                idKey: "userId",
                nameKey: "fullName",
              }}
            />
            <div className="header_main_reload">
              <img src={RefreshIcon} alt="icon" onClick={clickRefresh} />
            </div>
          </div>
        )}
      </div>
      {!isCreateOrEdit && (
        <SimpleBar className="body">
          {isArray(messages) &&
            messages.map((item, index) => (
              <div key={index + "date"}>
                {index === 0 && (
                  <div className={"body_day"}>
                    <Text>{get(item, "date", "")}</Text>
                  </div>
                )}

                <div className={"body_massage"}>
                  {get(item, "messageItems", []).map((i, ind) => (
                    <div className={"body_massage_chats"} key={get(i, "fullName", "") + ind + Math.floor(Math.random() * 99999)}>
                      <div className="chat_profile-img">
                        <img src={get(i, "avatarUrl", "") ? get(i, "avatarUrl", "") : UserIcon} alt="img" />
                      </div>
                      <div className="chat_items">
                        <div className="chat_items_message">
                          <Text xs>{get(i, "message", "")}</Text>
                        </div>
                        <div className="chat_items_profile-NameAndTime">
                          <Title medium xs lHeight={18}>
                            {get(i, "fullName", "")}
                          </Title>
                          <span>{formatDate(new Date(get(i, "time", "")), "HH : MM")}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </SimpleBar>
      )}
      <div className="chat_footer">
        <FooterForChat
          {...{
            active: get(chatData, "active", false),
            disabled: isCreateOrEdit,
            chatId: get(chatData, "id", ""),
            setMessages: (arr) => setMessages(arr),
          }}
        />
      </div>
    </ChatComponentStyle>
  );
};

export default memo(ChatComponent);
