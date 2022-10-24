import React, { memo } from "react";
import { isEqual, lowerCase, get } from "lodash";
import classNames from "classnames";
import { Col, Row } from "react-grid-system";
import styled from "styled-components";
import Dropdown from "../../../../components/elements/dropDown/dropdown";
import Button from "../../../../components/elements/button";
import Icon from "../../../../components/elements/icon";
import FormDemo from "../../../Form/form-demo";
import ViewRowReport from "../../../../modules/hr/components/viewRowReport";
import Label from "../../../../components/elements/label";
import Field from "../../../Form/field";

const Style = styled.div`
  .dropDown {
    &__button {
      margin: 0 5px;

      button {
        display: flex;
        border-radius: 6px;
        height: 32px;
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        align-items: center;
      }

      .icon-add-plus {
        width: 13px !important;
        height: 13px !important;
      }

      .filterBtn {
        button {
          padding: 0 14px;

          .ui__icon__wrapper {
            margin-left: 12px;
          }

          .icon-filter {
            width: 14px;
            height: 14px;
          }
        }
      }
    }

    &__body {
      overflow: inherit;
    }
  }

  .view_drop {
    .dropDown__body {
      z-index: 999;
      overflow: inherit;
      left: auto !important;
      right: 0px !important;
      top: 77px;

      .view {
        min-width: 720px;
        min-height: 400px;
        padding: 0 15px;

        &__left {
          padding: 20px 15px;
          border-right: 1px solid #e6e8ec;

          &__content {
            font-size: 12px;
            line-height: 18px;

            .ui__icon__wrapper {
              height: 24px;
              width: 24px;

              .icon-more-dots {
                height: 24px;
                width: 24px;
              }
            }
          }

          &__form {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-top: 20px;

            .personalPublic {
              color: #353945;
              font-size: 12px;
              font-weight: 400;

              .rc-checkbox-inner {
                border: 1px solid #002930;

                ::after {
                  top: 1px;
                  left: 4px;
                }
              }

              .rc-checkbox-checked {
                .rc-checkbox-inner {
                  border: 1px solid #45b26b;
                }
              }
            }

            .addNewList {
              margin-left: 30px;

              button {
                border-radius: 4px;
                font-size: 12px !important;
                font-weight: 500;
              }
            }
          }
        }

        &__right {
          padding-left: 8px !important;

          &__container {
            &__top__label {
              padding: 5px 14px;
              background-color: #fcfcfd;
              display: flex;
              align-items: center;
              margin-top: -36px;
              margin-bottom: 10px;
              min-width: 165px;
              border-bottom: none;
              border-radius: 7px 7px 0 0px;
              position: relative;
              box-shadow: 1px -6px 10px rgb(40 40 40 / 15%);

              ::after {
                content: "";
                position: absolute;
                border-radius: 100% 0 0;
                bottom: 1px;
                left: -3px;
                height: 10px;
                width: 10px;
                background-color: #fcfcfd;
              }

              &__input {
                .form-input-container {
                  border: none;
                  margin-left: 7px;

                  input {
                    padding: 5px;
                    outline: none;
                    font-size: 14px;
                    font-weight: 400;
                  }
                }
              }
            }

            &__body {
              padding: 15px 0 0 7px !important;

              &__title {
                margin-bottom: 10px;
                font-size: 14px;
                font-weight: 500;
                color: #b1b5c3;
              }

              &__button {
                button {
                  background-color: #fcfcfd;
                  display: flex;
                  align-items: center;
                  border-radius: 4px;
                  width: 100%;
                  font-size: 14px;
                  font-weight: 400;
                  padding: 8px 10px;
                  margin-bottom: 4px;
                  transition: 0.5s ease;

                  :hover {
                    color: #353945;
                    background-color: #fcfcfd;
                  }

                  .ui__icon__wrapper {
                    margin-right: 12px;

                    .icon {
                      background-color: #323232;
                    }
                  }
                }
              }
            }
          }

          .selected {
            button {
              background-color: #141416;
              color: #fcfcfd;

              .icon {
                background-color: #fcfcfd;
              }
            }
          }
        }
      }
    }
  }
`;

const ViewHeaderViews = ({
  t,
  viewTypesList = {},
  redirectUrl,
  createView,
  deleteView,
  getView,
  viewTypesListState,
  setSelectedViewType,
  selectedViewType,
}) => {
  // console.log(viewTypesList);
  return (
    <Style>
      <Dropdown
        className="dropDown__filter view_drop"
        button={
          <Button className="plus" outline_success>
            {" "}
            {t("View") ?? "View"}
          </Button>
        }
      >
        <FormDemo formRequest={createView}>
          <Row className="view">
            <Col xs={9} className="view__left">
              <div className={"view__left__content"}>
                {get(getView(selectedViewType), `defaultView.defaultView`, false) && (
                  <ViewRowReport redirectUrl={get(redirectUrl, "view")} {...get(getView(selectedViewType), `defaultView`, {})} />
                )}
                {get(getView(selectedViewType), `views`, [])?.map((view) => (
                  <ViewRowReport deleteView={deleteView} redirectUrl={get(redirectUrl, "view")} key={get(view, "id")} {...view} />
                ))}
              </div>

              {get(viewTypesListState, "result.data.permissions.canCreateView", false) && (
                <div className="view__left__form">
                  <Field
                    sm
                    className="personalPublic"
                    type="checkbox"
                    name="personal"
                    label={t("Personal view") ?? "Personal view"}
                  />
                  <Button className="addNewList" type={"submit"} success>
                    {t("Add new list") ?? "Add new list"}
                  </Button>
                </div>
              )}
            </Col>
            <Col xs={3} className="view__right">
              <div className="view__right__container">
                <div className="view__right__container__top">
                  <Label className="view__right__container__top__label">
                    <Icon icon="icon-list" color="#323232" />

                    <Field
                      className="view__right__container__top__label__input"
                      property={{
                        placeholder: t("Enter name...") ?? "Enter name...",
                      }}
                      hideLabel
                      type="input"
                      name="name"
                    />
                  </Label>
                </div>
                <div className="view__right__container__body">
                  <div className="view__right__container__body__title">View</div>
                  {get(viewTypesList, "result.data.viewTypes", [])
                    .map((type) => ({
                      icon: (
                        <>
                          <Icon icon={`icon-${lowerCase(get(type, "name"))}`} /> {get(type, "name")}
                        </>
                      ),
                      type: get(type, "name"),
                    }))
                    .map(({ icon, type }, ind) => (
                      <Button
                        key={ind + 1}
                        className={classNames(`view__right__container__body__button`, {
                          selected: isEqual(selectedViewType, type),
                        })}
                        onClick={() => setSelectedViewType(type)}
                      >
                        {" "}
                        {icon}{" "}
                      </Button>
                    ))}
                </div>
              </div>
            </Col>
          </Row>
        </FormDemo>
      </Dropdown>
    </Style>
  );
};

export default memo(ViewHeaderViews);
