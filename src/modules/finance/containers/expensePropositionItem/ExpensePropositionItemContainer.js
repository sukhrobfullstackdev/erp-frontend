import { get, head, includes, isEmpty, isNull } from "lodash";
import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import ApiActions from "../../../../services/api/actions";
import { Col, Row } from "react-grid-system";
import Title from "../../../../components/elements/title";
import SimpleBar from "simplebar-react";
import ChatComponent from "../../components/ChatComponent";
import CostInfoComponent from "../../components/CostInfoComponent";
import CostTableComponent from "../../components/CostTableComponent";

import FormDemo from "../../../../containers/Form/form-demo";
import Button from "../../../../components/elements/button";
import Field from "../../../../containers/Form/field";
import { getSelectOptionsListFromData } from "../../../../utils";
import Tabs from "../../../../components/tabs";
import Icon from "../../../../components/elements/icon";
import Minus from "../../../../assets/icons/minus.svg";
import Plus from "../../../../assets/icons/plus.svg";
import Modal from "../../../../components/elements/modal";
import { withTranslation } from "react-i18next";

const ExpensePropositionItemContainer = ({
  getExpenseProposition,
  expensePropositionItem,
  match,
  addExpenseProposition,
  editExpenseProposition,
  history,
  getMessageList,
  request,
  t,
  ...rest
}) => {
  let isCreatePage = includes(match.url, "create");
  let isEditPage = includes(match.url, "edit");
  let createOrEdit = isCreatePage || isEditPage;
  let id = get(match, "params.id", "");

  const [tempData, setTempData] = useState({
    attachments: [],
  });

  const [data, setData] = useState({
    modal: false,
    paymentField: [{ select: "click", input: "date", id: new Date().getTime() }],
    selectedCash: {},
    options: [],
    data: {},
    payNow: false,
  });

  useEffect(() => {
    if (isCreatePage) getExpenseProposition();
    else if (id)
      getExpenseProposition(id, {
        fail: (e) => "",
      });
  }, []);

  useEffect(() => {
    if (data.modal && (isEmpty(get(data, "data", {})) || isEmpty(get(data, "dat.method.values", {})))) {
      request({
        attributes: {},
        method: "get",
        url: `finance/v1/expense-proposition/confirm/${id}`,
        cb: {
          success: (res) => {
            let options = getSelectOptionsListFromData(get(res, "data.cashRegisters", []), "cashId", "name", "other");
            setData((s) => ({
              ...s,
              data: get(res, "data", {}),
              options,
            }));
          },
        },
      });
    }
  }, [data.modal]);

  const setAttachments = (ids) => setTempData((s) => ({ ...s, attachments: ids }));

  const submitHandling = ({ data, setError }) => {
    if (isCreatePage) {
      addExpenseProposition({
        attributes: { ...data, ...tempData },
        url: "finance/v1/expense-proposition/apply",
        formMethods: { setError },
        cb: {
          success: (res) => {
            history.push("/finance/finance/expense-proposition");
          },
          fail: (e) => "",
        },
      });
    } else if (isEditPage) {
      editExpenseProposition({
        attributes: { ...data, ...tempData },
        url: `finance/v1/expense-proposition/edit/${id}`,
        formMethods: { setError },
        cb: {
          success: (res) => {
            history.push("/finance/finance/expense-proposition");
          },
          fail: (e) => "",
        },
      });
    }
  };

  const plusClicked = () => {
    if (data.payNow) {
      setData((state) => ({
        ...state,
        paymentField: [
          ...state.paymentField,
          {
            select: "click",
            input: "date",
            id: new Date().getTime(),
          },
        ],
      }));
    }
  };

  const deleteClick = (id, index) => {
    if (data.payNow) {
      if (data.paymentField.length > 1) {
        data.paymentField = data.paymentField.filter((e) => e.id !== id);
        delete data.selectedCash[index];
        setData({ ...data });
      }
    }
  };

  const onChange = (val, obj, index) =>
    setData((s) => ({
      ...s,
      selectedCash: { ...s.selectedCash, [index]: obj },
    }));

  let getDisabledSomeOptions = () => Object.values(get(data, "selectedCash", {}));

  const requestConfirm = ({ data: info, setError }) => {
    info.expensePropositionId = id;
    info.method = data.method;
    if (get(info, "payAmounts", []).length === 1) {
      let val = Object.values(get(info, "payAmounts[0]", []));
      if (val.length < 2) info.payAmounts = [];
      else {
        // val.find(item => isNill(item) )
      }
    }
    request({
      attributes: info,
      url: `finance/v1/expense-proposition/confirm`,
      cb: {
        success: (res) => {
          getExpenseProposition(id, {
            fail: (e) => "",
          });
          setData((s) => ({ ...s, modal: false }));
        },
      },
    });
  };

  let temp = {};
  if (!isEmpty(get(data, "data.method.values", ""))) {
    let res = get(data, "data.method.options", "").indexOf(head(get(data, "data.method.values", "")));
    temp.index = res;
    temp.canChange = false;
  }

  return (
    <>
      <FormDemo
        formRequest={submitHandling}
        footer={
          <div className={"form_footer"}>
            <Button
              className={"cancel"}
              onCLick={() => isEditPage && history.push(`/finance/finance/expense-proposition-item/${id}`)}
            >
              Cancel
            </Button>
            <Button className={"save"} success type={"submit"}>
              Save
            </Button>
          </div>
        }
      >
        <Row className={"row"}>
          <Col xs={6} className={"chat_col"}>
            <div className="description">
              <Title medium regular lHeight={24}>
                DESCRIPTION
              </Title>
              {createOrEdit ? (
                <Field
                  type={"textarea"}
                  name={"description"}
                  placeholder={"Type here..."}
                  hideLabel
                  defaultValue={get(expensePropositionItem, "result.data.description", "")}
                />
              ) : (
                <SimpleBar className={"simplebar"}>
                  <Title regular lHeight={24}>
                    {get(expensePropositionItem, "result.data.description", "")}
                  </Title>
                </SimpleBar>
              )}
            </div>
            <ChatComponent
              {...{
                chatData: get(expensePropositionItem, "result.data.chat", {}),
                isCreatePage,
                isEditPage,
                getMessageList,
                request,
              }}
            />
          </Col>
          <Col xs={6} className={"info_col"}>
            <CostInfoComponent
              {...{
                data: get(expensePropositionItem, "result.data", {}),
                isCreatePage,
                isEditPage,
                request,
                id,
                setData,
              }}
            />
          </Col>
        </Row>
        <Row className={"row"}>
          <Col xs={12}>
            <CostTableComponent
              {...{
                data: get(expensePropositionItem, "result.data", {}),
                isCreatePage,
                isEditPage,
                setAttachments,
              }}
            />
          </Col>
        </Row>
      </FormDemo>

      {/* ACCEPT MODAL */}
      <Modal active={data.modal} className={"accept-modal"}>
        <FormDemo formRequest={requestConfirm}>
          <div className={"Container"}>
            <Title cl={"#777E91"} semiBold fs={14} lHeight={21} className={"Container__text"}>
              {t("accept_the_cost") ?? "ACCEPT THE COST"}
            </Title>
            <Tabs
              {...{
                leftList: ["ONE_TIME", "CONTINUED"],
                rightList: [],
                rightContent: [],
                onChange: (val) => setData((s) => ({ ...s, method: val })),
                ...temp,
              }}
              leftContent={[
                <div className="first">
                  <Field
                    name={"period"}
                    label={"FROM"}
                    type={"custom-datepicker"}
                    className={"custom__date"}
                    placeholder={"DD / MM / YYYY"}
                    defaultValue={get(data, "data.from", null)}
                    disabled={!isNull(get(data, "data.from", null))}
                  />
                </div>,
                <div className="first">
                  <Field
                    name={"fromPeriod"}
                    label={"FROM"}
                    type={"custom-datepicker"}
                    className={"left__date"}
                    placeholder={"DD / MM / YYYY"}
                    defaultValue={get(data, "data.fromPeriod", null)}
                    disabled={!isNull(get(data, "data.fromPeriod", null))}
                  />
                  <Icon icon={"icon-arrow-right-stick"} className={"Right__icon"} />
                  <Field
                    name={"toPeriod"}
                    label={"TO"}
                    type={"custom-datepicker"}
                    className={"right__date"}
                    placeholder={"DD / MM / YYYY"}
                    defaultValue={get(data, "data.toPeriod", null)}
                    disabled={!isNull(get(data, "data.toPeriod", null))}
                  />
                </div>,
              ]}
            ></Tabs>

            <div className="body">
              <div className="body__header">
                <Field
                  onChange={(e) => setData((s) => ({ ...s, payNow: e }))}
                  type={"checkbox"}
                  name={"payNow"}
                  label={"Make a payment now"}
                  className={"Check"}
                />
              </div>
              {data.paymentField.map((val, index) => (
                <div key={index}>
                  {!isEmpty(String(get(data, `selectedCash[${index}].amount`, ""))) && (
                    <Title fs={10} cl={"#3772FF"} lHeight={15} medium className={`Simple__text ${data.payNow && "active"}`}>
                      Non-existent amount : ${get(data, `selectedCash[${index}].amount`, "")}
                    </Title>
                  )}
                  <div className="body__footer">
                    <Field
                      type={"custom-select"}
                      options={get(data, "options", [])}
                      name={`payAmounts[${index}].cashId`}
                      placeholder={"Select the cash register"}
                      className={`select__active ${data.payNow && "active"}`}
                      hideLabel
                      editable={data.payNow}
                      disabled={!data.payNow}
                      onChange={(val, obj) => onChange(val, obj, index)}
                      disabledSomeOptions={getDisabledSomeOptions()}
                    />
                    <Field
                      type={"input"}
                      name={`payAmounts[${index}].amount`}
                      placeholder={"Enter the amount"}
                      disabled={!data.payNow}
                      hideLabel
                    />
                    <div className={"body__footer__img"}>
                      <img
                        src={Minus}
                        onClick={() => deleteClick(data.paymentField[index].id, index)}
                        className={`minus__img ${data.payNow && "active"}`}
                        alt={"minus"}
                      />
                      {index + 1 === data.paymentField.length && !(data.paymentField.length === data.options.length) && (
                        <img
                          src={Plus}
                          onClick={() => plusClicked()}
                          className={`plus__img ${data.payNow && "active"}`}
                          alt={"minus"}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={"footer"}>
              <Button className={"footer__first-button"} onCLick={() => setData((s) => ({ ...s, modal: false }))}>
                {" "}
                Cancel{" "}
              </Button>
              <Button success className={"footer__second-button"} type={"submit"}>
                {" "}
                Save{" "}
              </Button>
            </div>
          </div>
        </FormDemo>
      </Modal>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    expensePropositionItem: get(state, "api.expense-proposition-item.data", {}),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getExpenseProposition: (id = "", cb = {}) => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          method: "get",
          storeName: "expense-proposition-item",
          url: `finance/v1/expense-proposition/${id}`,
          cb,
        },
      });
    },
    addExpenseProposition: ({ attributes, url, formMethods, cb }) => {
      dispatch({
        type: ApiActions.OPERATION_ADD.REQUEST,
        payload: {
          attributes,
          formMethods,
          isChangeListState: false,
          url,
          cb,
        },
      });
    },
    editExpenseProposition: ({ attributes, url, formMethods, cb }) => {
      dispatch({
        type: ApiActions.OPERATION_UPDATE.REQUEST,
        payload: {
          attributes,
          formMethods,
          isChangeListState: false,
          url,
          cb,
        },
      });
    },
    getMessageList: ({ id, cb }) => {
      dispatch({
        type: ApiActions.REQUEST.REQUEST,
        payload: {
          method: "get",
          url: `finance/v1/expense-proposition/chat/message-list/${id}`,
          cb,
        },
      });
    },
    request: ({ attributes = {}, method = "post", url, cb }) => {
      dispatch({
        type: ApiActions.REQUEST.REQUEST,
        payload: {
          attributes,
          method,
          url,
          cb,
        },
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation("pdp")(memo(ExpensePropositionItemContainer)));
