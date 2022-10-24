import React from "react";
import styled from "styled-components";
import Button from "../../../components/elements/button";
import Dropdown from "../../../components/elements/dropDown/dropdown";
import Icon from "../../../components/elements/icon/icon";
import Title from "../../../components/elements/title/title";
import Text from "../../../components/elements/text/text";

import UserImg from "../../../assets/images/staticWoman.png";
import UnknowUserImg from "../../../assets/images/unknow-user.png";

const AccountHeadStyle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  .user_img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-right: 20px;
    border: 1px solid #f4f5f6;
    background: #fcfcfd;
  }

  .main {
    .user_info {
      display: flex;
      align-items: center;
      margin-top: 20px;

      .success {
        button {
          border: 1px solid #e2f5e9;
          border-radius: 6px;
          line-height: 18px;
          background-color: #f2fdf6;
        }
      }

      .danger {
        button {
          border: 1px solid #ef466f;
          border-radius: 6px;
          line-height: 16px;
          background-color: #fff8f9;
        }
      }

      .dropdown {
        margin-left: 12px;

        .dropDown__body {
          right: -137px;
          top: 64px;
          box-shadow: 0px 40px 32px -24px rgba(15, 15, 15, 0.12);
          border-radius: 10px;
          border: 1px solid #f4f5f6;
        }

        &_body {
          padding: 20px;

          div {
            width: 360px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #fcfcfd;
            border-radius: 6px;
            padding: 0px 10px;
            margin-bottom: 6px;

            &:last-child {
              margin-bottom: 0;
            }

            p {
              font-weight: 500;
              font-size: 10px;
              line-height: 15px;
              color: #777e91;
            }

            h2 {
              font-weight: 600;
              font-size: 10px;
              line-height: 15px;
              color: #353945;
            }
          }

          &_btn {
            height: 27px !important;
            width: 87px !important;
            padding: 0 !important;
            display: flex !important;
            justify-content: right !important;

            button {
              font-size: 10px;
              font-weight: 500;
              padding: 5px 10px;
              line-height: 15px;
            }
          }
        }
      }
    }
  }
`;

const AccountHeadComponent = ({ register }) => {
  return (
    <AccountHeadStyle>
      {register ? (
        <img className={"user_img"} src={UserImg} alt="img" />
      ) : (
        <img className={"user_img"} src={UnknowUserImg} alt="img" />
      )}
      <div className="main">
        {register ? (
          <Title semiBold lg lHeight={36}>
            Floyd Miles
          </Title>
        ) : (
          <Title semiBold lg lHeight={36}>
            Unknow
          </Title>
        )}
        <div className="user_info">
          {register ? (
            <Button className={"success"} xs light_success>
              Confirmed
            </Button>
          ) : (
            <Button className={"danger"} xs outlineDanger>
              Unconfirmed
            </Button>
          )}
          <Dropdown className={"dropdown"} button={<Icon size={"sm"} color={"#B1B5C4"} icon={"icon-question"} />}>
            <div className="dropdown_body">
              <div>
                <Text>Full name</Text>
                <Title>David cooper</Title>
              </div>
              <div>
                <Text>Your status</Text>
                {register ? (
                  <Button className={"dropdown_body_btn success"} light_success color={"#45B36B"}>
                    Confirmed
                  </Button>
                ) : (
                  <Button className={"dropdown_body_btn danger"} outlineDanger>
                    Unconfirmed
                  </Button>
                )}
              </div>
              <div>
                <Text>User ID</Text>
                <Title>127009831</Title>
              </div>
              <div>
                <Text>Date of brith</Text>
                <Title>14 / 06 / 1998</Title>
              </div>
              <div>
                <Text>Address</Text>
                <Title>просп. Амира Темура, 6офис 516, 528</Title>
              </div>
              <div>
                <Text>Country</Text>
                <Title>Uzbekistan</Title>
              </div>
              <div>
                <Text>Passport seria number</Text>
                <Title>AA 3212401</Title>
              </div>
              <div>
                <Text>Passport date</Text>
                <Title>21 / 04 / 2017</Title>
              </div>
              <div>
                <Text>Email</Text>
                <Title>yourmail@gmail.com</Title>
              </div>
              <div>
                <Text>PINFL</Text>
                <Title>009831</Title>
              </div>
            </div>
          </Dropdown>
        </div>
      </div>
    </AccountHeadStyle>
  );
};

export default AccountHeadComponent;
