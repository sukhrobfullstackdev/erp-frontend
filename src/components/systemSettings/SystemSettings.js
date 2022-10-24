import { get, isArray, isEqual } from "lodash";
import React, { memo, useState } from "react";
import styled, { css } from "styled-components";
import { withRouter } from "react-router-dom";
import Button from "../elements/button";
import Dropdown from "../elements/dropDown";
import Icon from "../elements/icon";

const Styles = styled.div`
  &.system-setting {
    position: absolute;
    left: 98px;
    bottom: 210px;
    bottom: ${({ landrop }) => (landrop ? "245px" : "175px")};
    transition: 0.5s ease;
    z-index: 100;
  }
  .drop_btn {
    button {
      width: 149px;
      height: 40px;
      display: flex;
      align-items: center;
      background-color: #fff;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      line-height: 21px;
      padding: 10px;
      :hover {
        background-color: #f4f5f6;
        color: #353945;
        .icon {
          background-color: #353945;
        }
      }
      .ui__icon__wrapper {
        margin-right: 12px;
        .icon {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
  .lan {
    button {
      position: relative;
      background-color: ${({ landrop }) => (landrop ? "rgba(69, 179, 107, 0.1)" : "#FFF")};
      .icon {
        background-color: ${({ landrop }) => (landrop ? "#353945" : "")};
      }
      .check {
        transform: rotate(${({ landrop }) => (landrop ? "180deg" : "0")});
        margin: 0;
        position: absolute;
        right: 7px;
        bottom: 11px;
        top: 9px;
      }

      :hover {
        background-color: ${({ landrop }) => (landrop ? "rgba(69, 179, 107, 0.1)" : "#FFF")};
      }
    }
  }
  .lan_body {
    overflow: hidden;
    height: ${({ landrop }) => (landrop ? "143px" : "0px")};
    transition: 0.5s ease;
    .lan_btn {
      button {
        display: flex;
        align-items: center;
        width: 149px;
        height: 41px;
        margin: 5px 0;
        font-size: 14px;
        font-weight: 400;
        background-color: #fcfcfd;
        border: 1px solid #f4f5f6;
        :hover {
          background: #f4f5f6;
          color: #353945;
        }
      }
      .ui__icon__wrapper {
        margin-right: 24px;
        .icon {
          background-color: #e6e8ec;
          width: 16px;
          height: 12px;
        }
      }
    }
    .active {
      button {
        display: flex;
        align-items: center;
        width: 149px;
        height: 41px;
        margin: 5px 0;
        font-size: 14px;
        font-weight: 500;
        background-color: #f4f5f6;
        .ui__icon__wrapper {
          .icon {
            background-color: #45b26b;
          }
        }
      }
    }
  }
  ${({ theme: { mode } }) =>
    mode === "dark" &&
    css`
      .drop_btn {
        button {
          background: #141416;
          color: #e6e8ec;
        }
        &:hover {
          button {
            background: #23262f;
            color: #fcfcfd;
          }
          .ui__icon__wrapper {
            .icon {
              background-color: #fcfcfd;
            }
          }
        }
      }
      .dropDown__body {
        background: #141416;
        border: 1px solid #23262f;
        box-sizing: border-box;
        box-shadow: 0px 40px 32px -24px rgba(15, 15, 15, 0.12);
        border-radius: 10px;
      }
      .lan {
        button {
          background-color: ${({ landrop }) => (landrop ? "#45B26B" : "#141416")};
          color: ${({ landrop }) => (landrop ? "#FCFCFD" : "#E6E8EC")};
          :hover {
            background-color: ${({ landrop }) => (landrop ? "#45B26B" : "#23262F")};
            .ui__icon__wrapper {
              .icon {
                background-color: #fcfcfd;
              }
            }
          }
          .ui__icon__wrapper {
            .icon {
              background-color: ${({ landrop }) => (landrop ? "#FCFCFD" : "#B1B5C3")};
            }
          }
          .check {
            .icon {
              background-color: ${({ landrop }) => (landrop ? "#FCFCFD" : "#F4F5F6")};
            }
          }
        }
      }
      .lan_body {
        .lan_btn {
          button {
            background-color: #23262f;
            color: #e6e8ec;
            border: none;
            :hover {
              background-color: #353945;
              color: #fcfcfd;
            }
          }
        }
        .active {
          button {
            background-color: #353945;
            color: #fcfcfd;
            font-weight: 500;
            .ui__icon__wrapper {
              .icon {
                background-color: #2cc560;
              }
            }
          }
        }
      }
    `}
  .dropDown {
    width: auto;
    height: auto;

    &__body {
      top: auto;
      right: auto;
      padding: 10px;
    }
  }
`;

const SystemSettings = ({
  changeModeRequest = () => {},
  changeLangRequest = () => {},
  mode,
  button = "",
  languages = [],
  lang = "uz",
}) => {
  const [landrop, setLandrop] = useState(false);

  const changeMode = () => {
    if (mode) {
      if (isEqual(mode, "light")) {
        changeModeRequest("dark");
      } else {
        changeModeRequest("light");
      }
    }
  };

  return (
    <Styles className="system-setting" landrop={landrop}>
      <Dropdown button={button}>
        <Button className="drop_btn lan" onCLick={() => setLandrop((state) => !state)}>
          <Icon icon="icon-language" color="#777E90" />
          <span>
            {get(
              languages.find((item) => isEqual(get(item, "code"), lang)),
              "name"
            )}
          </span>
          <Icon className="check" icon="icon-bottom-arrow" color="#353945" />
        </Button>
        <div className="lan_body">
          {isArray(languages) &&
            languages.map(({ name, code }) => (
              <Button
                key={code}
                className={`lan_btn ${code === lang ? "active" : ""}`}
                onCLick={() => {
                  changeLangRequest(code);
                  setLandrop(false);
                }}
              >
                <Icon icon="icon-check2" />
                {name}
              </Button>
            ))}
        </div>
        <Button className="drop_btn" onCLick={changeMode}>
          <Icon icon="icon-moon" color="#777E90" />
          {isEqual(mode, "dark") ? "Light " : "Dark "}
          theme
        </Button>
      </Dropdown>
    </Styles>
  );
};

export default memo(withRouter(SystemSettings));
