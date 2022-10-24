import React, { memo, useMemo, useState } from "react";
import styled from "styled-components";
import { Col, Row } from "react-grid-system";
import { withTranslation } from "react-i18next";
import { isArray, isEmpty, toLower } from "lodash";
import Button from "../elements/button";
import FormDemo from "../../containers/Form/form-demo";
import Field from "../../containers/Form/field";
import Icon from "../elements/icon";

const Styled = styled.div`
  .addColumn {
    background: #ffffff;
    border: 1px solid #e6e8ec;
    box-sizing: border-box;
    box-shadow: 0px 40px 32px -24px rgba(15, 15, 15, 0.12);
    border-radius: 8px;
    padding: 15px 18px;

    &__head {
    }

    &__title {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 21px;
      text-align: center;
      color: #b1b5c4;
    }

    &__body {
      .form-label {
        color: #c9c9c9;
      }

      .select__header__content,
      .content {
        font-size: 12px;
      }

      .ui__icon__wrapper {
        margin-right: 8px;
      }

      .input-wrapper {
        position: relative;
      }

      .recycle {
        position: absolute;
        top: 32px;
        right: 7px;
      }

      .colorLabel {
        margin-right: 18px;
      }

      margin: 15px 0 20px;

      .row {
        margin-bottom: 10px;
      }

      .checkbox-input {
        display: flex;
        margin: 10px 0;
      }

      .checkbox-label {
        margin-left: 10px;
      }

      .input-wrapper {
        .form-input-container {
          border-radius: 8px;
          height: 40px;
        }

        .rc-slider {
          margin: 20px auto;
        }

        .select {
          &__header {
            height: 40px !important;
          }

          &__body {
            &__options {
              &__option {
                .content {
                  display: flex;
                }
              }
            }
          }
        }

        .input-label {
          font-style: normal;
          font-weight: 600;
          font-size: 12px;
          line-height: 12px;
          display: flex;
          align-items: center;
          text-transform: uppercase;
          color: #b1b5c4;
          margin-bottom: 4px;
        }

        .inputContainer {
          width: 100% !important;
          height: 40px !important;
        }

        .react-emoji {
          width: 100% !important;
          height: 40px !important;
        }
      }
    }

    &__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;

      button {
        width: 100px;
        border-radius: 6px;
        padding: 6px 10px;
        margin: 0 5px;
        font-style: normal;
        text-align: center;
        border: none;
        height: 34px;
        font-weight: 600;
        font-size: 12px;
        line-height: 18px;
      }

      .addNewOption {
        button {
          width: fit-content;
          margin-right: auto;
        }
      }

      .addDelBtn {
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    }
  }
`;

const ignoreOption = {
  SPECIAL_LABEL: "SPECIAL_LABEL",
  CALL_TYPE: "CALL_TYPE",
  CALL_STATUS: "CALL_STATUS",
};

const getSelectOptionsListFromData = (data = [], value = "id", label = "title", other) => {
  if (other)
    return (
      data.map((item) => ({
        ...item,
        value: item[value],
        label: item[label],
      })) || []
    );
  return (
    data.map((item) => ({
      value: item[value],
      label: (
        <>
          <Icon size="sm" icon={`icon-${toLower(item[label])}`} />
          {item[label]}
        </>
      ),
    })) || []
  );
};

const moneyOptions = [
  { value: "USD", label: "USD - US Dollar ($)" },
  { value: "UZS", label: "UZS - UZ So'm (so'm)" },
  { value: "RUB", label: "RUB - RU Rubl (₽)" },
];

const AddColumn = ({ name = "", t, TYPES, cancel, addCustomField, id, idKey, addColumn }) => {
  const [state, setState] = useState({
    type: "",
    rows: [],
  });

  const options = useMemo(() => TYPES, []);

  const fieldSelectHandling = (value) => {
    let rows = [];
    if (value === "DROPDOWN" || value === "LABELS" || value === "TREE") rows = [new Date().getTime()];

    if (value !== name) {
      setState((s) => ({ ...s, type: value, rows }));
    } else {
      setState((s) => ({ ...s, type: name, rows }));
    }
  };

  const addNewOptions = () => setState((s) => ({ ...s, rows: [...s.rows, new Date().getTime()] }));

  const deleteOption = (index, item) => {
    state.rows.splice(index, 1);
    setState({ ...state });
  };

  const submitHandling = ({ data, setError }) => {
    if (state.type === "DROPDOWN" || state.type === "LABELS" || state.type === "TREE")
      data.typeConfig.options = data.typeConfig.options.map((item, index) => ({
        ...item,
        orderIndex: index + 1,
      }));

    if (id && idKey) data[idKey] = id;
    addCustomField({ data, setError });
    cancel();
  };

  return (
    <Styled>
      <FormDemo formRequest={submitHandling} isClear>
        <div className="addColumn">
          <div className="addColumn__head">
            <span className="addColumn__title">ADD COLUMN</span>
          </div>

          <div className="addColumn__body">
            <Row className="row">
              <Col xs={6}>
                <div className="input-wrapper">
                  <Field
                    type={"input"}
                    name={"name"}
                    label={t("FIELD_NAME") ?? "FIELD NAME"}
                    hideError
                    params={{ required: true }}
                  />
                </div>
              </Col>
              <Col xs={6}>
                <div className="input-wrapper">
                  <Field
                    type="custom-select"
                    label={t("FIELD_TYPE") ?? "FIELD TYPE"}
                    className="first-child"
                    options={options}
                    isFixed
                    nullable={false}
                    defaultValue={name}
                    name={"type"}
                    onChange={fieldSelectHandling}
                    ignoreOption={ignoreOption}
                    valueKey={"name"}
                    labelKey={"name"}
                  />
                </div>
              </Col>
            </Row>

            {/* RATING */}
            {state.type === "RATING" && (
              <Row className="row">
                <Col xs={6}>
                  <Field type="emoji" name={"typeConfig.ratingConfig.codePoint"} hideEmojiButton defaultValue={"2b50"} />
                </Col>
                <Col xs={6}>
                  <Field type="range-input" name={"typeConfig.ratingConfig.count"} />
                </Col>
              </Row>
            )}

            {/* MONEY */}
            {state.type === "MONEY" && (
              <Row className="row">
                <Col xs={12}>
                  <Field
                    type="custom-select"
                    isFixed
                    name={"typeConfig.moneyConfig.currencyType"}
                    options={moneyOptions}
                    defaultValue={"UZS"}
                  />
                </Col>
              </Row>
            )}

            {/* OPTIONS */}
            {isArray(state.rows) &&
              state.rows.map((item, index) => (
                <Row className="row" key={item}>
                  <Col xs={12}>
                    <div className="input-wrapper">
                      <Field
                        type={"input"}
                        name={`typeConfig.options[${index}]`}
                        label={(t("option") ?? "option") + " " + (index + 1)}
                        hideError
                        params={{
                          required: index === 0,
                        }}
                        addColor
                        addColorInValue
                        colorKey={"colorCode"}
                      />
                      {<Icon icon={"icon-recycle"} mainClassName={"recycle"} onClick={() => deleteOption(index, item)} />}
                    </div>
                  </Col>
                </Row>
              ))}
          </div>

          <div className="addColumn__footer">
            <div className="addOption">
              {(state.type === "DROPDOWN" || state.type === "LABELS" || state.type === "TREE") && (
                <Button className="addNewOption" outline_success onCLick={addNewOptions} plus>
                  {t("add_new_option") ?? "ADD NEW OPTION"}
                </Button>
              )}
            </div>
            <div className="addDelBtn">
              <Button outlineDanger onCLick={cancel}>
                Cancel
              </Button>
              <Button success type={"submit"} onClick={addColumn}>
                Add Column
              </Button>
            </div>
          </div>
        </div>
      </FormDemo>
    </Styled>
  );
};

export default withTranslation("pdp")(memo(AddColumn));
