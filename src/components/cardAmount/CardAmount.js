import React from "react";
import styled from "styled-components";
import Title from "../../components/elements/title";
import Icon from "../../components/elements/icon";
import Button from "../../components/elements/button";
import Dropdown from "../elements/dropDown/dropdown";
import Text from "../../components/elements/text";
import IconAssign from "../../assets/icons/assign_me.svg";

const CardAmountStyle = styled.div`
  background-color: #fff;
  border: 1px solid #f4f5f6;
  border-radius: 8px;

  .header {
    color: #353945;
    display: flex;
    padding: 14px 16px 14px 14px;
    border-bottom: 1px solid #f4f5f6;
    justify-content: space-between;

    .main {
      display: flex;

      .card_dropdown-filled {
        border-radius: 50%;
        transition: 0.3s ease;
        border: 1px solid transparent;
        margin-left: 5px;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;

        .dropDown__body {
          box-shadow: 0px 8px 16px -8px rgba(15, 15, 15, 0.2);
          top: 40px;
          right: -60px;
          z-index: 10 !important;
        }

        &:hover {
          border: 1px solid #e6e8ec;
        }

        .ui__icon__wrapper {
          width: 16px;
          height: 16px;

          .icon {
            width: 14px;
            height: 14px;
          }
        }

        .filled__body {
          padding: 12px 12px 8px;

          span {
            display: flex;
            min-width: 70px;
            align-items: end;
            justify-content: space-between;
            margin-bottom: 16px;
            color: #353945;
            font-weight: 400;
            font-size: 10px;
            line-height: 15px;

            &:last-child {
              margin: 0;
            }
          }
        }
      }
    }

    .dots_btn {
      .card_dropdown-dots {
        margin-left: 194px;

        .dropdown_dots {
          transform: rotate(-90deg);
        }

        .dots_body {
          width: 113px;
          border-radius: 8px;
          background-color: #fff;
          box-shadow: 0px 2px 10px rgb(40 40 40 / 30%);
          padding: 11px 15px;

          .dropdown_edit-btn {
            button {
              margin-bottom: 11px;

              &:hover {
                color: #01ac56;

                .icon {
                  background-color: #01ac56;
                }
              }
            }
          }

          .dropdown_delete-btn {
            button {
              &:hover {
                color: #ef466f;

                .icon {
                  background-color: #ef466f;
                }
              }
            }
          }

          button {
            width: 100%;
            border: none;
            padding: 0px;
            display: flex;
            align-items: center;
            background-color: transparent;
            border-radius: 0px;
            font-size: 14px;
            line-height: 21px;
            color: #777e91;
            font-weight: normal;

            .ui__icon__wrapper {
              margin-right: 15px;
            }
          }
        }
      }
    }
  }

  .body {
    padding: 20px 0px 14px;

    &_content {
      padding-left: 14px;

      div {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        :first-child {
          p {
            color: #3772ff;
          }
        }

        :last-child {
          margin-bottom: 0;
        }
      }

      h2 {
        font-weight: 400;
        font-size: 12px;
        line-height: 18px;
        color: #777e90;
      }

      .border {
        width: 1px;
        height: 8px;
        background-color: #b1b5c4;
        margin: 0px 10px;
      }

      p {
        font-size: 12px;
        line-height: 18px;
        font-weight: 500;
        color: #353945;
      }
    }

    &_multiselects {
      padding-left: 14px;
      border-bottom: 1px solid #f4f5f6;
      width: 100%;

      .multi_inv {
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        color: #fcfcfd;
        padding: 4px 12px 3px;
        background-color: #353945;
        border-radius: 2px;
        display: inline-block;
        margin: 20px 0px 10px;
      }

      .multi_div {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        .multi_teg {
          color: #fcfcfd;
          font-weight: 400;
          font-size: 10px;
          line-height: 15px;
          padding: 3px 10px 3px 6px;
          border-radius: 2px 12px 12px 2px;
        }

        .blue {
          background-color: #4bc9f0;
          margin-right: 6px;
        }

        .pink {
          background-color: #ef466f;
          margin-right: 8px;
        }

        .multi_icon {
          background-color: #fff;
          width: 22px;
          height: 22px;
          border: 0.8px dashed #b1b5c3;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;

          .icon {
            width: 14px;
            height: 14px;
          }
        }
      }
    }

    &_payment {
      width: 100%;
      padding: 14px 14px 0px;

      div {
        display: flex;
        justify-content: space-between;

        :first-child {
          margin-bottom: 10px;

          span {
            color: #45b26b;
          }
        }

        :last-child {
          span {
            color: #ef466f;
          }
        }
      }

      h2 {
        font-weight: 400;
        font-size: 12px;
        line-height: 18px;
        color: #777e90;
      }

      span {
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
      }
    }
  }

  .footer {
    padding: 12px 14px;
    border-top: 1px solid #f4f5f6;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .assign_icon {
      width: 30px;
      height: 30px;
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

    .assign_row {
      display: flex;
      align-items: center;
      padding: 4px;
    }

    .assign__title {
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;
      color: #353945;
      margin: 10px 14px;
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
      color: #353945;
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

    .footer_btn {
      button {
        border-radius: 3px;

        :hover {
          background-color: #ffd166;
          color: #353945;
        }
      }
    }
  }
`;

const CardAmount = () => {
  return (
    <CardAmountStyle>
      <div className="header">
        <div className={"main"}>
          <Title medium lHeight={24} sm>
            Dianne Russell
          </Title>
          <Dropdown className={"card_dropdown-filled"} button={<Icon icon="icon-filled" color="#3772FF" size={"xs"} />}>
            <div className="filled__body">
              <span>
                <Icon icon="icon-filled" color="#EF466F" size={"xs"} />
                Long text
              </span>
              <span>
                <Icon icon="icon-filled" color="#9757D7" size={"xs"} />
                Long text
              </span>
              <span>
                <Icon icon="icon-filled" color="#3772FF" size={"xs"} />
                Long text
              </span>
              <span>
                <Icon icon="icon-filled" color="#FFD166" size={"xs"} />
                Long text
              </span>
              <span>
                <Icon icon="icon-filled" color="#23262F" size={"xs"} />
                Long text
              </span>
              <span>
                <Icon icon="icon-filled" color="#777E91" size={"xs"} />
                Long text
              </span>
            </div>
          </Dropdown>
        </div>
        <div className={"dots_btn"}>
          <Dropdown
            className={"card_dropdown-dots"}
            button={<Icon className={"dropdown_dots"} size={"sm"} icon="icon-more-dots" color="dark" />}
          >
            <div className="dots_body">
              <Button className={"dropdown_edit-btn"}>
                <Icon icon="icon icon-edit" /> Edit
              </Button>
              <Button className={"dropdown_delete-btn"}>
                <Icon icon="icon icon-recycle " />
                Delete
              </Button>
            </div>
          </Dropdown>
        </div>
      </div>
      <div className="body">
        <div className="body_content">
          <div>
            <Title>SPECIALIZATION</Title>
            <div className={"border"}></div>
            <Text className={"blue"}>FRONTEND</Text>
          </div>
          <div>
            <Title>GROUP</Title>
            <div className={"border"}></div>
            <Text>G - 312</Text>
          </div>
          <div>
            <Title>OPERATOR</Title>
            <div className={"border"}></div>
            <Text>Kristin Watson</Text>
          </div>
          <div>
            <Title>Kristin Watson</Title>
            <div className={"border"}></div>
            <Text>21 / 04 / 2021</Text>
          </div>
        </div>
        <div className="body_multiselects">
          <div className={"multi_inv"}>INV-AA123456</div>
          <div className={"multi_div"}>
            <div className="multi_teg blue">Design</div>
            <div className="multi_teg pink">Developer</div>
            <div className="multi_icon">
              <Icon icon="icon icon-labels" />
            </div>
          </div>
        </div>
        <div className="body_payment">
          <div className="total_price">
            <Title>TOTAL AMOUNT</Title> <span>5 000 000 UZS</span>
          </div>
          <div className="the_rest">
            <Title>THE REMAINING AMOUNT</Title> <span>- 200 000 UZS</span>
          </div>
        </div>
      </div>
      <div className="footer">
        <Dropdown button={<img className={"assign_icon"} src={IconAssign} alt="icon" />}>
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
        <Button className={"footer_btn"} bg={"#FFD166"} xs pl={12} pr={12}>
          Give Discount
        </Button>
      </div>
    </CardAmountStyle>
  );
};

export default CardAmount;
