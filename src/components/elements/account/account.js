import React, { memo, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { get } from "lodash";
import Button from "../button";
import Icon from "../icon";
import Modal from "../modal";
import Title from "../title/title";
import Dropdown from "./../dropDown/index";
import { withTranslation } from "react-i18next";

const StyledAccount = styled.div`
  position: relative;
  min-width: 85px;
  text-align: right;
  display: flex;
  justify-content: space-between;

  .header_bell,
  .user_Img,
  .unknown_Img {
    width: 35px !important;
    height: 35px !important;
    border-radius: 50%;
    background: #e6e8ec;
  }
  .user_Img {
    background-image: url(${({ userImg }) => userImg});
  }

  .dropdawn {
    background-color: #fff;
    height: content-box;
    width: 169px;
    border-radius: 10px;
    position: absolute;
    top: 40px;
    right: 0px;
    padding: 10px;
    box-shadow: 0px 40px 32px -24px rgba(15, 15, 15, 0.12);
    border: 1px solid #e6e8ec;
    display: block;
    z-index: 9;
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
  .modal {
    &__body {
      padding: 70px 0 0;
      border-radius: 16px;
      width: 400px;
      height: 416px;
      display: flex;
      align-items: center;
      flex-direction: column;
      min-height: 0;
      .logout_icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 140px;
        height: 140px;
        border-radius: 50%;
        background: rgba(69, 179, 107, 0.1);
        margin-bottom: 40px;
        .ui__icon__wrapper {
          width: 75px;
          height: 75px;
          .icon {
            width: 63px;
            height: 63px;
          }
        }
      }
      .title {
        text-align: center;
        font-size: 22px;
        font-weight: 400;
        line-height: 33px;
        margin-bottom: 40px;
      }
      .btn_row {
        display: flex;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
        button {
          box-sizing: border-box;
          width: 199px;
          height: 60px;
          border-top: 1px solid #e6e8ec;
          background-color: #fff;
          font-size: 16px;
          :hover {
            background-color: #f4f5f6;
          }
        }
        .cancel {
          button {
            border-right: 1px solid #e6e8ec;
            border-radius: 0 0 0 16px;
            color: #777e90;
            :hover {
              color: #353945;
              font-weight: 500;
            }
          }
        }
        .logout_btn {
          button {
            border-radius: 0 0 16px 0;
            font-weight: 500;
            text-transform: none;
            :hover {
              color: #ef466f;
              background: rgba(239, 70, 111, 0.1);
            }
          }
        }
      }
    }
  }
  ${({ theme: { mode } }) =>
    mode === "dark" &&
    css`
      .dropdawn {
        background-color: #141416;
        border: 1px solid #23262f;
      }
      .drop_btn {
        button {
          background-color: #141416;
          color: #e6e8ec;
          .icon {
            background-color: #b1b5c3;
          }
          :hover {
            background-color: #23262f;
            color: #fcfcfd;
            .icon {
              background-color: #fcfcfd;
            }
          }
        }
      }
    `}
  .dropDown {
    width: auto;
    height: auto;

    &__body {
      top: 40px;
      .dropdawn {
        position: unset;
      }
    }
  }
`;

const Account = ({ t, user, children, logoutRequest = () => {}, history, ...props }) => {
  const [active, setActive] = useState(false);
  const [modal, setModal] = useState(false);

  const ref = useRef();

  useEffect(() => {
    const checkClickedOutside = (e) => {
      if (active && ref.current && !ref.current.contains(e.target)) {
        setActive(false);
      }
    };
    document.addEventListener("click", checkClickedOutside);
    return () => {
      document.removeEventListener("click", checkClickedOutside);
    };
  }, [active]);

  return (
    <StyledAccount {...props} ref={ref} active={active} userImg={get(user, "photo", "")}>
      <Icon icon={"icon-bell"} className={"header_bell"} />
      <Dropdown
        button={
          get(user, "photo", "") ? (
            <div
              className="user_Img"
              onClick={() => {
                setActive((state) => !state);
              }}
            />
          ) : (
            <Icon icon={"icon-userImg"} className={"unknown_Img"} />
          )
        }
      >
        <div className="dropdawn">
          <Button className="drop_btn" onCLick={() => history.push("/account")}>
            <Icon icon="icon-settings" color="#777E90" />
            User Settings
          </Button>
          <Button
            className="drop_btn"
            onCLick={() => {
              setModal((state) => !state);
              setActive(false);
            }}
          >
            <Icon icon="icon-logout" color="#777E90" />
            Log out
          </Button>
        </div>
      </Dropdown>
      <Modal active={modal} onClose={() => setModal(false)} className="modal">
        <div className="logout_icon">
          <Icon icon="icon-logout" color="#45B26B" />
        </div>
        <Title className="title">
          Oh no! You’re leaving...
          <br />
          Are you sure?
        </Title>
        <div className="btn_row">
          <Button className="cancel" onCLick={() => setModal(false)}>
            {t("Cancel") ?? "Cancel"}
          </Button>
          <Button
            className="logout_btn"
            onCLick={() => {
              logoutRequest();
              setModal(false);
            }}
          >
            Log out
          </Button>
        </div>
      </Modal>
    </StyledAccount>
  );
};

export default withTranslation("pdp")(memo(Account));
