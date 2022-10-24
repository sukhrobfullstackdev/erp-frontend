import React from "react";
import styled from "styled-components";
import Icon from "../elements/icon";
import defaultAvatar from "../../assets/icons/defaultAvatar.png";

const NotificationStyled = styled.div`
  display: flex;
  align-items: center;
  .avatar {
    width: 19px;
    height: 19px;
    background: #ffffff;
    border: 1px solid #45b36b;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    img {
      width: 16px;
      height: 16px;
      border-radius: 50%;
    }
  }
  .notification {
    &:hover {
      .icon-notification {
        background-color: #00b533;
      }
    }
  }
`;

const Notification = ({ avatar = defaultAvatar, avatarClick = () => {}, notificationClick = () => {}, ...props }) => {
  return (
    <NotificationStyled {...props}>
      <Icon size="sm" icon="icon-notification" mainClassName="notification" />
      <div className="avatar" onChange={avatarClick}>
        <img src={avatar} alt="avatar" />
      </div>
    </NotificationStyled>
  );
};

export default Notification;
