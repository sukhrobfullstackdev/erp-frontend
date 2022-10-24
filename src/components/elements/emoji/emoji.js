import React, { useState } from "react";
import InputEmoji from "react-input-emoji";
import styled, { css } from "styled-components";
import { isEmpty } from "lodash";

const StyledEmoji = styled.div`
  /* margin: 20px; */
  position: relative;
  .react-emoji {
    border: 1px solid #e6e8ec !important;
    border-radius: 6px !important;
    .react-input-emoji {
      &--button {
        display: flex;
        align-items: center;

        &--icon {
        }
        &__show {
          svg {
            fill: #777e91 !important;
          }
        }
      }
      &--container {
        border: none !important;
        border-radius: 6px !important;
        margin: 0;
      }
      &--input {
        padding: 5px;
        height: 34px;
        display: flex;
        align-items: center;
        img {
          width: 24px !important;
          height: 24px !important;
        }
      }
    }
  }

  .react-emoji-picker--container {
    top: 50px;
    z-index: 99;
    right: 0px;
    height: 221px;
    width: fit-content;
    .react-emoji-picker--wrapper {
      height: 221px;
      width: 300px;
      .react-emoji-picker {
        height: 221px;
        width: 300px;
        .emoji-mart,
        .emoji-mart-light {
          height: 221px !important;
          width: 300px !important;
          box-shadow: 0px 40px 32px -24px rgba(15, 15, 15, 0.12);
          border-radius: 8px;
          .emoji-mart-search {
            display: none;
          }
          .emoji-mart-scroll {
            padding: 0 0 14px 10px;
            height: 219px !important;
            &::-webkit-scrollbar {
              width: 10px;
              height: 10px;
            }
            /* Track */
            &::-webkit-scrollbar-track {
              display: none;
            }
            /* Handle */
            &::-webkit-scrollbar-thumb {
              display: none;
            }
            .emoji-mart-category-label {
              span {
                font-weight: 500;
                font-size: 14px;
                line-height: 12px;
                color: #777e91;
                padding: 15px 0;
              }
            }
            .emoji-mart-category-list {
              li {
                button {
                  padding: 5px 8px;
                  :hover {
                    ::before {
                      background-color: #fff;
                    }
                  }
                  span {
                    cursor: pointer;
                    width: 30px !important;
                    height: 30px !important;
                  }
                }
              }
            }
          }
        }
      }
    }
    .emoji-mart-bar {
      background: #f4f5f6;
      &:first-child {
        border-top-left-radius: 7px;
        border-top-right-radius: 7px;
      }
      .emoji-mart-anchors {
        .emoji-mart-anchor {
          padding: 12px 12px 12px 6px !important;
          width: 35px !important;
          .emoji-mart-anchor-icon {
            width: 25px;
            svg {
              height: 18px;
              width: 18px;
            }
          }
        }
      }
    }
  }

  ${({ emoji }) =>
    emoji &&
    css`
      .react-emoji {
        &:after {
          content: "${emoji}️";
          font-size: 24px;
          position: absolute;
          top: 0;
          left: 6px;
          z-index: 2;
        }
      }
    `}

  ${({ hideEmojiButton }) =>
    hideEmojiButton &&
    css`
      .react-emoji {
        .react-input-emoji {
          &--button {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 2;
            &--icon {
              opacity: 0;
            }
          }
          &--input {
            opacity: 0;
          }
        }
      }
    `}
`;

const Emoji = ({ maxLength = 1000, theme = "light", onChange = () => "", hideEmojiButton = false }) => {
  const [state, setState] = useState({
    value: "⭐",
    code: "2b50",
    inputValue: "⭐",
  });

  function handleOnEnter(text) {
    console.log(text);
  }

  const handleOnChange = (val) => {
    let code = "2b50";
    let value = "⭐";
    if (!isEmpty(val)) {
      let arr = [...val];
      code = arr[arr.length - 1].codePointAt(0).toString(16);
      value = arr[arr.length - 1];
    } else val = "⭐";
    setState((s) => ({ inputValue: val, code, value }));
    onChange(code, value);
  };

  return (
    <StyledEmoji emoji={state.value} hideEmojiButton={hideEmojiButton}>
      <InputEmoji
        value={state.inputValue}
        onChange={handleOnChange}
        onEnter={handleOnEnter}
        placeholder=""
        fontFamily="Poppins"
        fontSize="22px"
        maxLength={maxLength}
        theme={theme}
        // cleanOnEnter
        // onResize={(e) => console.log(e)}
        onClick={(e) => console.log(e)}
        onFocus={(e) => console.log(e)}
      />
    </StyledEmoji>
  );
};

export default Emoji;
