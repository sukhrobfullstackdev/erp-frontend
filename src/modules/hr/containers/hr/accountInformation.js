import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import Collapse from "../../../../components/elements/collapse";
import { isArray, get } from "lodash";
import Flex from "../../../../components/elements/flex";
import Field from "../../../../containers/Form/field";
import Icon from "../../../../components/elements/icon";
import AddButton from "../../components/addButton";
import { withTranslation } from "react-i18next";

const StyledAccountInfo = styled.div`
  .box {
    .role {
      width: 100%;
      display: flex;
      flex-direction: column;
      background: #fff;
      box-shadow: 0px 8px 16px -8px rgba(15, 15, 15, 0.2);
      border-radius: 10px;

      &__header {
        margin-bottom: 30px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 23px 20px 30px;
        border-bottom: 1px solid #e6e8ec;
      }

      &__title {
        font-size: 24px;
        font-weight: 500;
      }

      &__option {
        display: flex;
      }

      &__access {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-right: 23px;
        border: 1px solid #f4f5f6;
        padding: 13px 20px;
        border-radius: 8px;
        min-width: 180px;

        span {
          font-weight: 500;
          font-size: 16px;
        }

        .rc-checkbox-inner {
          background: #f4f5f6;
        }

        .rc-checkbox-checked {
          .rc-checkbox-inner {
            background: #45b26b;
          }
        }
      }

      &__question-icon {
        height: 50px;
        width: 38px;

        .icon-question {
          height: 34px;
          width: 34px;
        }
      }

      &__body {
        padding-bottom: 14px;

        button,
        label {
          width: 100% !important;
          border: none;
        }
      }

      &__row {
        margin: 0 20px 6px;

        span {
          font-size: 20px;
          font-weight: 500;
        }
      }
    }

    display: flex;
    flex-direction: column;

    form {
      width: 311px;
    }

    label {
      padding-left: 0;
    }

    .inputContainer,
    .dateInputContainer,
    .Select__controller,
    .form-input-container {
      width: 311px;
      height: 50px;
      /* border: 1px solid #E6E8EC; */
      border-radius: 10px;

      input {
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        color: #777e91;
      }
    }

    &.box-center {
      width: 100%;
    }

    &.box-end {
      .form-input-container {
        width: 311px;
      }
    }

    .boxInside {
      padding: 0 27px 0 40px;

      form {
        label {
          width: 100%;
        }
      }
    }

    .select-privilliges {
      padding-left: 40px;
      padding-right: 27px;
      position: relative;
      width: 100%;

      .Select__controller {
        /* position: absolute;
        top: 0;
        left: 0; */
        width: 100%;
      }

      .form-body-select,
      label {
        width: 100%;
      }
    }
  }

  .boxInsideFlex {
    width: 100%;

    .boxInsideBox {
      margin-right: 27px;

      &:last-child {
        margin-right: 0px;
      }
    }
  }

  .box-end {
    label {
      width: 100%;
    }
  }

  .infoContainer {
    display: flex;
    justify-content: space-between;
  }

  .seventhCollapse {
    position: relative;
    margin: 0 0px 10px 0px;

    .collapse__title {
      font-size: 16px;
      line-height: 24px;
      color: #23262f;
    }

    &.active {
      border-radius: 9px;

      .collapse__title {
        border-radius: 9px 9px 2px 2px;
        background: #353945;
        color: #fcfcfd;

        &__bottom-arrow {
          .icon {
            background-color: #fcfcfd;
          }
        }
      }
    }

    .selectContainer {
      .select__control {
        width: 311px;
        height: 50px;
      }
    }
  }

  .add-doc-container {
    position: absolute;
    left: 47%;
    bottom: -20px;
    padding: 9px;
    background: #45b36b;
    border-radius: 50%;
    cursor: pointer;
    z-index: 1;
  }

  .radioInput {
    padding-left: 12px !important;
  }

  @media (max-width: 1449px) {
    .seventhCollapse {
      .selectContainer,
      .dateInputContainer,
      .inputContainer {
        width: auto;
      }
    }

    .box {
      width: 100%;
    }
  }
  //
  .seventhCollapse {
    ////

    &.active {
      .collapse__body {
        padding: 40px 30px 30px;
        margin-bottom: 50px;

        .task_list {
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;

          .task {
            button {
              position: absolute;
              bottom: -70px;
              background-color: #45b26b;
              border-radius: 50%;
              height: 60px;
              width: 60px;
              display: flex;
              align-items: center;
              justify-content: center;

              .ui__icon__wrapper {
                width: 36px;
                height: 36px;

                .icon {
                  width: 36px;
                  height: 36px;
                }
              }
            }
          }
        }

        label {
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          display: inline-block;
        }

        .form-label {
          width: 100%;
          line-height: 12px;
          color: #353945;
          margin-bottom: 8px !important;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .inputStyle .inputContainer {
          padding: 5px 10px;
        }

        .dateInputContainer {
          input {
            padding: 7px 11px 7px 10px;
          }
        }

        .formWrapper {
          margin-bottom: 40px;
          text-align: bottom;

          .dropdown {
            .Select__controller {
              font-weight: 500;
              font-size: 16px;
            }
          }
        }

        .check_btn {
          button {
            display: flex;
            align-items: center;
            justify-content: start;
            width: 311px;
            height: 50px;
            background-color: #fcfcfd;
            border-radius: 10px;
            padding: 15px 18px;
            color: #777e90;

            .rc-checkbox {
              /* height: 16px; */
              margin-right: 19px;

              .rc-checkbox-inner {
                ::after {
                  left: 5px;
                  top: 1px;
                }

                border: 2px solid #777e91;
              }
            }

            .rc-checkbox-checked {
              .rc-checkbox-inner {
                border: 2px solid #45b36b;
              }
            }

            div {
              margin: 0 19px 0 0;
              width: 15px;
              height: 28px;
            }
          }
        }

        .timetable {
          padding: 60px;
          background-color: #fff;
          border-radius: 10px;
          width: 1664px;
          height: 688px;
          display: flex;
          justify-content: space-between;

          .title {
            color: #777e90;
            font-size: 20px;
            font-weight: 500;
            text-transform: uppercase;
            margin-bottom: 40px;
          }

          .work_day {
            .days {
              width: 340px;
              height: 60px;
              background: #f4f5f6;
              border-radius: 10px;
              padding: 18px 20px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 14px;

              :last-child {
                margin-bottom: 0;
              }

              label {
                margin: 0;
              }

              .title {
                margin: 0;
              }

              .formWrapper {
                margin: 0;
                width: 40px;
              }

              .bwLPty .box form {
                width: 40px;
              }
            }
          }

          .work_hour {
            width: 424px;
            margin: 0 150px;
          }

          .dinner {
            width: 480px;
          }
        }
      }
    }

    .role__access {
      background: #fcfcfd;
      color: #b1b5c4;
    }
  }
`;

const AccountInformation = ({ addBtn = false, active = "1", accountInfo, editable, t, ...props }) => {
  const [access, setAccess] = useState(get(accountInfo, "access", false));

  useEffect(() => {
    setAccess(get(accountInfo, "access", false));
  }, [accountInfo]);

  const roleList = get(accountInfo, "role.options", []);
  const values = get(accountInfo, "role.values", []);

  return (
    <StyledAccountInfo>
      <Collapse title={t("account_information") ?? "ACCOUNT INFORMATION"} active={active} className="seventhCollapse">
        <div className="box">
          <Flex className="boxInsideFlex">
            <div className="role">
              <div className="role__header">
                <span className="role__title">{t("employee-accountInfo-title") ?? "ROLES"}</span>
                <div className="role__option">
                  <div className="role__access">
                    <span>{t("access") ?? "Access"}</span>
                    <Field
                      type={"switch"}
                      name={`accountInfo.access`}
                      defaultValue={get(accountInfo, "access", false)}
                      disabled={!editable}
                      onChange={setAccess}
                    />
                  </div>
                  <Icon className="role__question-icon" icon="icon-question" size="lg" color="#B1B5C4" />
                </div>
              </div>
              <div className="role__body">
                {isArray(roleList) &&
                  roleList.map(({ id, name }, ind) => (
                    <div className="role__row" key={ind + new Date().getTime()}>
                      <Field
                        type={"checkbox"}
                        name={`accountInfo.roles.${name}`}
                        className="check check_btn"
                        md
                        inBtn={true}
                        label={name}
                        disabled={!editable || !access}
                        defaultValue={!access ? false : values.some((i) => i === id)}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </Flex>
        </div>
        {addBtn && <AddButton className="" />}
      </Collapse>
    </StyledAccountInfo>
  );
};

export default withTranslation("pdp")(memo(AccountInformation));
