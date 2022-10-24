import React, { useState } from "react";
import styled from "styled-components";
import { get, isArray } from "lodash";
import Button from "../../../components/elements/button";
import Flex from "../../../components/elements/flex";
import Icon from "../../../components/elements/icon";
import Modal from "../../../components/elements/modal";
import Title from "../../../components/elements/title";
import Text from "../../../components/elements/text";
import Dropdown from "../../../components/elements/dropDown/dropdown";
import FormDemo from "../../../containers/Form/form-demo";
import Field from "../../../containers/Form/field";
import Assign from "../../../components/assign";
import AssignIcon from "../../../assets/icons/assign_me.svg";
import UserImg from "../../../assets/images/staticWoman.png";
import DifferentColorImg from "../../../assets/images/Diferrent-color.png";
import UserImg2 from "../../../assets/images/staticMan.png";

const StyledSelesModal = styled.div`
  .modal__body {
    padding: 0;
    border-radius: 12px;
    min-height: 700px;
    min-width: 1200px;

    .left_part {
      width: 50%;

      &_header {
        padding: 20px;
        padding-left: 25px;
        border-bottom: 1px solid #e6e8ec;
        background: #f4f5f6;
        border-radius: 12px 0px 0px 0px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .status {
          .status_btn {
            button {
              background-color: #9757d7;
              display: flex;
              align-items: center;
              color: #ffffff;
              font-weight: 400;
              font-size: 14px;
              line-height: 21px;
              padding: 7px 5px 7px 14px;
              border-radius: 6px;
              margin-right: 20px;
              position: relative;

              ::after {
                content: "";
                width: 1px;
                height: 12px;
                position: absolute;
                top: 11px;
                left: 100px;
                background-color: #d3d5df;
              }

              .ui__icon__wrapper {
                width: 20px;
                height: 20px;
                margin-left: 19px;
                .icon-bottom-arrow {
                  width: 20px;
                  height: 20px;
                }
              }
            }
          }

          .dropDown__body {
            box-shadow: 0px 8px 16px -8px rgba(15, 15, 15, 0.2);
            border-radius: 6px;
            padding: 8px;
            top: 55px;
            left: 0;
            width: fit-content;

            .status_btns {
              button {
                padding: 6px 10px;
                font-weight: 500;
                font-size: 12px;
                line-height: 18px;
                border-radius: 2px;
                width: 170px;
                margin-bottom: 5px;
                display: flex;
                justify-content: space-between;
              }
              :last-child {
                button {
                  margin-bottom: 0;
                }
              }
            }

            .generated {
              button {
                background: #fbf7fe;
                color: #9757d7;
                border: 1px solid #9757d7;
              }
            }

            .completed {
              button {
                background: #f8fffa;
                border: 1px solid #e2f5e9;
                color: #45b26b;
              }
            }

            .pending {
              button {
                background: #fffdf8;
                border: 1px solid #f4efe1;
                color: #d6ba35;
              }
            }

            .paused {
              button {
                background: #f6f8f0;
                border: 1px solid #f0f4e2;
                color: #91b41c;
              }
            }

            .canceled {
              button {
                background: #f8f0f2;
                border: 1px solid #f5e1e6;
                color: #ef466f;
              }
            }

            .paid {
              button {
                background: #eff2f8;
                border: 1px solid #dee4f1;
                color: #3772ff;
              }
            }
          }
        }

        .flag_drop {
          .flag {
            width: 34px;
            height: 34px;
            border: 1px solid #ef466f;
            .icon-flag {
              width: 18px;
              height: 18px;
              background-color: #ef466f;
            }
          }

          .dropDown__body {
            top: 44px;
            left: 0;
            width: fit-content;
            border: 1px solid #e6e8ec;
            border-radius: 6px;
            box-shadow: 0px 8px 16px -8px rgba(15, 15, 15, 0.2);
            padding: 12px 8px;

            .flags {
              margin-bottom: 16px;
              font-weight: 400;
              font-size: 10px;
              line-height: 15px;
              display: flex;
              white-space: nowrap;
              .ui__icon__wrapper {
                width: 14px;
                height: 14px;
                margin-right: 8px;
                .icon-flag {
                  width: 14px;
                  height: 14px;
                }
              }
              :last-child {
                margin-bottom: 0;
              }
            }
          }
        }

        .assign_icon {
          width: 34px;
          height: 34px;
        }
      }

      &_content {
        height: 724px;
        overflow: auto;
        ::-webkit-scrollbar {
          display: none;
        }
        .file {
          padding: 20px 25px;
          .user_img {
            height: 40px;
            width: 40px;
            border-radius: 50%;
            margin: 0 14px 20px 0;
          }
          .show {
            cursor: pointer;
            font-weight: 600;
          }
          .d-grid {
            display: grid;
            gap: 10px;
            grid-template-columns: auto auto auto auto auto auto;
            margin-bottom: 30px;
          }
          &_img {
            text-align: center;
            margin-top: 10px;
            img {
              height: 80px;
              width: 80px;
              border-radius: 4px;
              margin-bottom: 6px;
            }
          }

          .view_all {
            position: relative;
            .gradient {
              display: none;
            }
            :last-child {
              .gradient {
                background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6));
                position: absolute;
                display: block;
                top: 0;
                left: 1px;
                height: 80px;
                width: 80px;
                border-radius: 4px;
                font-weight: 600;
                font-size: 20px;
                line-height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                cursor: pointer;
              }
              img {
              }
            }
          }

          .form-input-file-container {
            .custom-file-input {
              display: none;
            }
          }
          &_btn {
            button {
              display: flex;
              align-items: center;
              font-weight: 500;
              font-size: 10px;
              line-height: 15px;
              background: #f4f5f6;
              border: 1px solid #e6e8ec;
              border-radius: 4px;
              padding: 4px;
              padding-right: 10px;
              color: #353945;
              .ui__icon__wrapper {
                height: 12px;
                width: 12px;
                margin-right: 4px;
                .icon-files {
                  height: 12px;
                  width: 12px;
                }
              }
            }
          }
        }
        .description {
          padding: 20px 25px;
          border-top: 1px solid #e6e8ec;
          border-bottom: 1px solid #e6e8ec;

          .form-textarea {
            background: #f4f5f6;
            border: 1px solid #e6e8ec;
            border-radius: 6px;
            font-weight: 500;
            font-size: 12px;
            line-height: 18px;
            min-height: 130px;
            height: 130px;
            resize: none;
            margin-top: 8px;
            ::placeholder {
              color: #777e90;
            }
          }
        }

        .comment_section {
          padding: 20px 25px;
          .oldest {
            button {
              display: flex;
              align-items: center;
              font-weight: 500;
              font-size: 12px;
              line-height: 18px;
              color: #777e91;
              text-transform: none;
              background-color: transparent;
              .ui__icon__wrapper {
                margin-left: 10px;
                height: 20px;
                width: 17px;
                .icon-insert-top {
                  height: 13px;
                  width: 16px;
                }
              }
            }
          }
          .form-input-container {
            border-radius: 6px;
            background: #f4f5f6;
            margin-top: 8px;
            .form-input {
              font-weight: 500;
              font-size: 12px;
              line-height: 18px;
              ::placeholder {
                color: #777e90;
              }
            }
          }
          .comment {
            margin-top: 20px;
            .user {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background-color: palegoldenrod;
              padding-top: 2px;
              margin-right: 10px;
              font-weight: 500;
              font-size: 16px;
              line-height: 24px;
              text-align: center;
              color: #ffffff;
            }
            .date {
              font-size: 10px;
              margin-left: 20px;
            }
            .ui__icon__wrapper {
              transform: rotate(90deg);
            }
            &_content {
              margin: 10px 0 0 40px;

              img {
                border-radius: 4px;
                max-width: 300px;
                max-height: 300px;
              }
            }
          }
        }
      }
    }

    .tag {
      background: #ef466f;
      border-radius: 2px 12px 12px 2px;
      padding: 3px 10px 3px 6px;
      width: fit-content;
      margin-right: 6px;
      font-weight: 400;
      font-size: 10px;
      line-height: 15px;
      color: #fcfcfd;
    }

    .right_part {
      height: 800px;
      width: 50%;
      border-left: 1px solid #e6e8ec;

      &_header {
        border-bottom: 1px solid #e6e8ec;
        background: #f4f5f6;
        padding: 16px 20px;
        border-radius: 0px 12px 0px 0px;
        display: flex;
        align-items: center;

        .ui__icon__wrapper {
          background-color: #353945;
          height: 34px;
          width: 34px;
          border-radius: 50%;
          .icon-support {
            height: 18px;
            width: 18px;
          }
        }

        .column {
          padding: 0 20px;
          border-right: 1px solid #e0e4eb;
          :last-child {
            border: none;
          }

          .info {
            margin-top: 8px;
            font-size: 12px;
          }

          .form-date-container {
            position: relative;
            ::after {
              content: "";
              width: 1px;
              height: 12px;
              position: absolute;
              top: 10px;
              right: 29px;
              background-color: #d3d5df;
            }

            .datepicker__input {
              background-color: #e9ebef;
              border-radius: 6px;
              padding: 3px 7px;
              font-weight: 500 !important;
              font-size: 12px !important;
              line-height: 18px;
              height: 24px;
              min-width: 100px;
              width: 118px !important;
              margin-top: 5px;
            }

            .date__icon {
              position: absolute;
              top: 32%;
              right: 7px;
              height: 14px;
              width: 14px;
              filter: invert(23%) sepia(6%) saturate(1386%) hue-rotate(188deg) brightness(35%) contrast(97%);
            }
          }
        }
      }

      &_content {
        height: 723px;
        background: #f0f1f2;
        padding: 20px 25px;
        font-weight: 400;
        font-size: 12px;
        line-height: 18px;
        overflow: auto;
        ::-webkit-scrollbar {
          display: none;
        }

        p + p {
          margin: 0;
        }

        .action {
          button {
            background: #e6e8ec;
            border-radius: 12px;
            padding: 4px 10px 4px 12px;
            display: flex;
            align-items: center;
            font-weight: 500;
            font-size: 10px;
            line-height: 15px;
            cursor: pointer;
            color: #777e90;

            .ui__icon__wrapper {
              margin-left: 10px;
              height: 15px;
              width: 15px;
              .icon-clock-refresh {
                height: 15px;
                width: 15px;
              }
              .icon-insert-top {
                height: 10px;
                width: 15px;
              }
            }
          }
        }

        .message {
          margin-top: 20px;

          &_info {
            margin-bottom: 10px;
          }

          .invoice {
            background: #353945;
            border-radius: 2px;
            padding: 5px 9px;
            color: #e6e8ec;
            font-weight: 500;
            font-size: 10px;
            line-height: 15px;
            width: fit-content;
          }
        }
      }
    }

    .footer {
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      border-top: 1px solid #e6e8ec;

      button {
        margin-left: 10px;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
      }
    }
  }
`;

const images = [
  { id: 1, img: UserImg, name: "Image.jpeg" },
  { id: 2, img: DifferentColorImg, name: "Image.jpeg" },
  { id: 3, img: UserImg2, name: "Image.jpeg" },
  { id: 4, img: DifferentColorImg, name: "Image.jpeg" },
  { id: 5, img: UserImg, name: "Image.jpeg" },
  { id: 6, img: UserImg2, name: "Image.jpeg" },
  { id: 7, img: DifferentColorImg, name: "Image.jpeg" },
  { id: 8, img: UserImg2, name: "Image.jpeg" },
  { id: 9, img: DifferentColorImg, name: "Image.jpeg" },
];

const SelesModal = () => {
  const [show, setShow] = useState(true);

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
    <StyledSelesModal>
      <Modal active={true}>
        <FormDemo>
          <Flex>
            <div className="left_part">
              <div className="left_part_header">
                <Flex align={"center"}>
                  <Dropdown
                    className="status"
                    button={
                      <Button className="status_btn">
                        Generated <Icon icon="icon-bottom-arrow" color="#FFFFFF" />
                      </Button>
                    }
                  >
                    <Button className="status_btns generated">Generated</Button>
                    <Button className="status_btns completed">Completed</Button>
                    <Button className="status_btns pending">Pending</Button>
                    <Button className="status_btns paused">Paused</Button>
                    <Button className="status_btns canceled">Canceled</Button>
                    <Button className="status_btns paid">Paid</Button>
                  </Dropdown>
                  <Dropdown className="flag_drop" button={<Icon className="flag" icon="icon-flag" />}>
                    <div className="flags">
                      <Icon icon="icon-flag" color="#3772FF" />
                      Long text
                    </div>
                  </Dropdown>
                </Flex>
                <Assign
                  {...{
                    customHeader,
                    isDoubleClick: false,
                  }}
                />
              </div>
              <div className="left_part_content">
                <div className="file">
                  <Flex align="center">
                    <img className="user_img" src={UserImg} />
                    <Title semiBold regular lHeight="21">
                      Dianne Russell
                    </Title>
                  </Flex>
                  <Flex align="center" justify="space-between">
                    <Title semiBold sm lHeight="18">
                      FILES
                    </Title>
                    <Text className="show" xs cl="#3772FF" onClick={() => setShow((state) => !state)}>
                      {show ? "Show" : "Hide"} all
                    </Text>
                  </Flex>
                  <div className="d-grid">
                    {images.map(
                      ({ id, img, name }, ind) =>
                        (show ? ind < 6 : ind + 1) && (
                          <div key={id} className={`file_img ${show && "view_all"}`}>
                            <img src={img} />
                            <Text xs cl="#777E90">
                              {show ? "View all" : name}
                            </Text>
                            {show && (
                              <div className="gradient" onClick={() => setShow(false)}>
                                +{id}
                              </div>
                            )}
                          </div>
                        )
                    )}
                  </div>
                  <Flex align="center" justify="space-between">
                    <Flex align="center">
                      <div className="tag">Design</div>
                      <div className="tag">Developer</div>
                      <Icon icon="icon-label" />
                    </Flex>
                    <Field type="file" hideLabel>
                      <Button className="file_btn">
                        <Icon icon="icon-files" color="#353945" />
                        File
                      </Button>
                    </Field>
                  </Flex>
                </div>
                <div className="description">
                  <Title semiBold sm lHeight="18">
                    Description
                  </Title>
                  <Field type="textarea" name="description" hideLabel placeholder="Enter a description..." />
                </div>
                <div className="comment_section">
                  <Flex justify="space-between">
                    <Title semiBold sm lHeight="18">
                      Comment
                    </Title>
                    <Button className="oldest">
                      Oldest first <Icon icon="icon-insert-top" />
                    </Button>
                  </Flex>
                  <Field type="input" name="comment" placeholder="Add a comment..." hideLabel />
                  <div className="comment">
                    <Flex align="center" justify="space-between">
                      <Flex align="center">
                        <div className="user">D</div>
                        <Title semiBold sm lHeight="18">
                          David Hobs
                        </Title>
                        <Text className="date" medium cl="#777E90">
                          October 25, 2021, 1:14 PM
                        </Text>
                      </Flex>
                      <Dropdown button={<Icon icon="icon-triple-dots" />}></Dropdown>
                    </Flex>
                    <div className="comment_content">
                      <Text xs>Programmable devices have existed for centuries.</Text>
                    </div>
                  </div>
                  <div className="comment">
                    <Flex align="center" justify="space-between">
                      <Flex align="center">
                        <div className="user">D</div>
                        <Title semiBold sm lHeight="18">
                          David Hobs
                        </Title>
                        <Text className="date" medium cl="#777E90">
                          October 25, 2021, 1:14 PM
                        </Text>
                      </Flex>
                      <Dropdown button={<Icon icon="icon-triple-dots" />}></Dropdown>
                    </Flex>
                    <div className="comment_content">
                      <img src={UserImg} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="right_part">
              <div className="right_part_header">
                <Icon icon="icon-support" color="#FCFCFD" />
                <div className="column">
                  <Title medium fs={10} lHeight={15} cl={"#777E90"}>
                    OPERATOR
                  </Title>
                  <Title className="info" sm medium lHeight={18}>
                    Eleanor Pena
                  </Title>
                </div>
                <div className="column">
                  <Title medium fs={10} lHeight={15} cl={"#777E90"}>
                    CREATED
                  </Title>
                  <Title className="info" sm medium lHeight={18}>
                    14 / 03 / 2021
                  </Title>
                </div>
                <div className="column">
                  <Title medium fs={10} lHeight={15} cl={"#777E90"}>
                    DEADLINE
                  </Title>
                  <Field type="custom-datepicker" name="date" hideLabel />
                </div>
              </div>
              <div className="right_part_content">
                <Flex justify={"space-between"}>
                  <Button className="action">
                    History
                    <Icon icon="icon-clock-refresh" />
                  </Button>
                  <Button className="action">
                    Sort
                    <Icon icon="icon-insert-top" />
                  </Button>
                </Flex>
                <div className="message">
                  <Flex justify={"space-between"} className="message_info">
                    <Text cl={"#777E90"} xs>
                      Eleanor Pena created this invoice
                    </Text>
                    <Text cl={"#777E90"} xs>
                      14 / 03 / 2021 20:03
                    </Text>
                  </Flex>
                  <div className="invoice">INV-AA123456</div>
                </div>
                <div className="message">
                  <Flex justify={"space-between"} className="message_info">
                    <Text cl={"#777E90"} xs>
                      Eleanor Pena added tag
                    </Text>
                    <Text cl={"#777E90"} xs>
                      Yesterday 11:08
                    </Text>
                  </Flex>
                  <Flex>
                    <div className="tag">Design</div>
                    <div className="tag">Developer</div>
                  </Flex>
                </div>
              </div>
            </div>
          </Flex>
          <div className="footer">
            <Button outlineDanger borderR={6}>
              Cancel
            </Button>
            <Button lightSmBorder success borderR={6}>
              Save
            </Button>
          </div>
        </FormDemo>
      </Modal>
    </StyledSelesModal>
  );
};

export default SelesModal;
