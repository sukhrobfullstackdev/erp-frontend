import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Row, Col } from "react-grid-system";
import Box from "components/elements/box";
import Dropdown from "components/elements/dropDown";
import Icon from "components/elements/icon";
import Tabs from "components/tabs";
import InvoiceStyle from "./LeadInvoiceOneWrapper";
import FormDemo from "containers/Form/form-demo";
import Field from "containers/Form/field";
import Button from "components/elements/button";
import Flex from "components/elements/flex";
import userImage from "../../../../assets/images/userImage.png";
import Input from "components/elements/input";
import { numberPrettier } from "utils";
import { get, isArray, isEmpty, isEqual, isNil, isNull } from "lodash";
import { connect } from "react-redux";
import ApiActions from "services/api/actions";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { getHours, getMinutes } from "date-fns";
import AssignSelect from "../../Components/CustomOptions";
import LeadOnePayment from "../../Components/liead-invoice-one-payment";
import { CustomHeaderPriority, CustomOptionPriority } from "modules/sales/Components/CustomOptionPriority";
import ModalInvoice from "../../Components/ModalInvoice";
import InfoList from "modules/sales/Components/info_list";
import InfoListItem from "modules/sales/Components/info_list-item";
import Radio from "modules/sales/Components/Radio";
import { toast } from "react-toastify";

const getFildType = (type) => {
  switch (type) {
    case "TIME":
      return "clock";
    case "LABELS":
      return "custom-select";
    case "DROPDOWN":
      return "custom-select";
    case "DATE":
      return "custom-datepicker";
    default:
      return "input";
  }
};

const getFilteredData = (options, filters) => {
  let data = [];
  if (!filters || !filters.length) return options;
  filters.map((filter, i) => {
    if (i !== 0) options = data;
    switch (filter.type) {
      case "DROPDOWN":
        data = options.filter((i) => i[filter.name]?.id == filter.value);
        break;
      case "LABELS":
        data = options.filter((i) => filter?.value.every((v) => i[filter.name]?.includes(v)));
        break;
      case "TIME":
        if (filter.name == "lessonStartTime") {
          data = options.filter(
            (option) =>
              getHours(option[filter.name]) * 60 + getMinutes(option[filter.name]) >
              getHours(filter.value) * 60 + getMinutes(filter.value)
          );
        } else if (filter.name == "lessonEndTime") {
          data = options.filter(
            (option) =>
              getHours(option[filter.name]) * 60 + getMinutes(option[filter.name]) <
              getHours(filter.value) * 60 + getMinutes(filter.value)
          );
        } else {
          data = options;
        }
        break;
      case "DATE":
        if (filter.name == "lessonStartDate") {
          data = options.filter((option) => option[filter.name] > filter.value);
        } else if (filter.name == "lessonEndDate") {
          data = options.filter((option) => option[filter.name] < filter.value);
        } else {
          data = options;
        }
        break;
      default:
        return options;
    }
  });
  return data;
};

const LeadInvoiceOneContainer = ({
  match: {
    params: { id },
  },
  request,
  t,
}) => {
  // backend data
  const [data, setData] = useState(null);
  // input
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [budget, setBudget] = useState(null);
  const [phoneNumbers, setPhoneNumbers] = useState({});
  const [phoneNumberTypes, setPhoneNumberTypes] = useState([]);
  const [phnInput, setPhnInput] = useState("");
  const [phSelected, setPhSelected] = useState(null);
  // modal   // invoice
  const [invoiceModal, setinvoiceModal] = useState(false);
  const [invoiceType, setInvoiceType] = useState(null);
  const [invoiceData, setInvoiceData] = useState(null);
  const [invoiceDatafilters, setInvoiceDatafilters] = useState(null);
  const [activeOption, setActiveOption] = useState(null);
  // object to send
  const [dataToSend, setDataToSend] = useState({
    firstName: firstName,
    lastName: lastName,
    statusId: 1,
    priority: "LOW",
    tags: [],
    assign: null,
    sourceId: 1,
    phoneNumbers: [
      {
        phoneNumber: "+998901234567",
        relationId: 5,
        main: true,
        colorCode: "fake_data",
        orderIndex: 1,
      },
    ],
    interestedCourse: 2,
    englishLevel: "BEGINNER",
    birthDate: 97885906,
    budget: 71.1,
    gender: "MALE",
  });
  // chat
  const messages = [
    { type: "sent", content: "Hi, Kate. Sure, when would you like it ?", by: "me", time: "11:53", from: userImage },
    { type: "got", content: "Hey Olivia. Can we get on a quick call?", by: "them", time: "11:53", from: userImage },
    { type: "sent", content: "Hi, Kate. Sure, when would you like it ?", by: "me", time: "11:53", from: userImage },
    { type: "got", content: "Hey Olivia. Can we get on a quick call?", by: "them", time: "11:53", from: userImage },
    { type: "sent", content: "Hi, Kate. Sure, when would you like it ?", by: "me", time: "11:53", from: userImage },
    { type: "got", content: "Hey Olivia. Can we get on a quick call?", by: "them", time: "11:53", from: userImage },
    { type: "sent", content: "Hi, Kate. Sure, when would you like it ?", by: "me", time: "11:53", from: userImage },
    { type: "got", content: "Hey Olivia. Can we get on a quick call?", by: "them", time: "11:53", from: userImage },
    { type: "sent", content: "Hi, Kate. Sure, when would you like it ?", by: "me", time: "11:53", from: userImage },
    { type: "got", content: "Hey Olivia. Can we get on a quick call?", by: "them", time: "11:53", from: userImage },
    { type: "sent", content: "Hi, Kate. Sure, when would you like it ?", by: "me", time: "11:53", from: userImage },
    {
      type: "got",
      content: (
        <>
          {"Feel free to give feedback I'd appreciate it."}
          <br /> {"I'm making this animation in Figma 🤩"}
          <br />
          {"I've been busy for a while and have so much to share. Will be back with much more soon."}
        </>
      ),
      by: "them",
      time: "11:53",
      from: userImage,
    },
    {
      type: "sent",
      content: (
        <>
          {"Feel free to give feedback I'd appreciate it."}
          <br /> {"I'm making this animation in Figma 🤩"}
          <br />
          {"I've been busy for a while and have so much to share. Will be back with much more soon."}
        </>
      ),
      by: "me",
      time: "11:53",
      from: userImage,
    },
    { type: "got", content: "Hey Olivia. Can we get on a quick call?", by: "them", time: "11:53", from: userImage },
  ];
  // scroll to bottom automatically
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
    if (data === null || data === undefined)
      request({
        url: `sales/v1/lead-invoice/by-id/${id}`,
        method: "get",
        cb: {
          success: (data) => {
            // console.log(data.data.summary);
            setData(data.data.summary);
            setFirstName(data.data.summary.firstName);
            setLastName(data.data.summary.lastName);
            setBudget(data.data.summary.budget);
            setPhoneNumbers(data.data.summary.phoneNumbers);
          },
          fail: (err) => "",
        },
      });
  }, [data]);
  // get typesPhoneNumbers
  useEffect(() => {
    phoneNumbers.options && createPhoneNumbersTypes(phoneNumbers.options);
  }, [phoneNumbers]);

  //filter data
  useEffect(() => {
    const invData = get(data, "invoiceTypeDoubleSelect", {})[invoiceType?.toLowerCase()];
    if (!isEmpty(invoiceDatafilters) && invoiceType) {
      setInvoiceData((i) => ({ ...i, options: getFilteredData(invData?.options, invoiceDatafilters) }));
    } else {
      setInvoiceData(invData);
    }
  }, [invoiceDatafilters]);

  const createPhoneNumbersTypes = useCallback((options) => {
    const data = [];
    for (let i of options || []) {
      data.push({
        value: i.id,
        label: i.name,
      });
    }
    setPhoneNumberTypes(data);
  }, []);

  const clickPhone = useCallback(() => {
    let myDate = new Date().getTime();
    setPhoneNumbers((phoneNumbers) => {
      return {
        ...phoneNumbers,
        phoneNumbers: [
          ...phoneNumbers.phoneNumbers,
          {
            main: true,
            phoneNumber: "+998901234567",
            id: myDate,
          },
        ],
      };
    });
  }, []);

  const clickTrash = (index) => {
    if (phoneNumbers.phoneNumbers[index].main == true) {
      let data = phoneNumbers.phoneNumbers;
      data[0] = { ...data[0], main: true };
      setPhoneNumbers((p) => ({ ...p, phoneNumbers: data }));
    }
    if (!isEmpty(phoneNumbers?.phoneNumbers)) {
      setPhoneNumbers((p) => ({
        ...p,
        phoneNumbers: p.phoneNumbers.filter((_, i) => i !== index),
      }));
    }
  };

  const clearFilters = () => {
    setInvoiceDatafilters(null);
  };

  // selectdan tanlash
  const handleInvoiceSelect = (e) => {
    setInvoiceType(e);
    setInvoiceData(get(data, "invoiceTypeDoubleSelect")[e.toLowerCase()]);
    if (get(data, "invoiceTypeDoubleSelect")[e.toLowerCase()].values)
      setActiveOption(get(data, "invoiceTypeDoubleSelect")[e.toLowerCase()].values[0]);
  };

  // cardlardan birini tanlash
  const invoiceCardHandler = (id) => {
    let oldData = structuredClone(data);
    let oldInvoiceData = structuredClone(invoiceData);
    oldInvoiceData.values = [id];
    oldData.invoiceTypeDoubleSelect.invoiceType.values = [invoiceType];
    oldData.invoiceTypeDoubleSelect[invoiceType.toLowerCase()] = oldInvoiceData;
    setData(oldData);
    setActiveOption(id);
    setInvoiceData(oldInvoiceData);
  };
  const invoiceCardIDhandler = (ids) => {
    console.log(ids);
  };

  // save all editions
  const saveHandler = (e) => {
    console.log(e);
    let requestData = structuredClone(dataToSend);
    requestData.statusId = e.data.statusId;
    requestData.firstName = firstName;
    requestData.lastName = lastName;
    requestData.priority = e.data.priority;
    requestData.tags = e.data.tags;
    requestData.assign = e.data.assign;
    requestData.sourceId = e.data.sourceId;
    requestData.interestedCourse = e.data.interestedCourse;
    requestData.englishLevel = e.data.englishLevel;
    requestData.birthDate = e.data.birthDate;
    requestData.budget = e.data.budget;
    requestData.gender = e.data.gender;
    // invoicedata va discount qismlari
    if (e.ids && e.ids.length > 0 && activeOption) {
      requestData.invoiceType = e.data.invoiceType;
      if (invoiceType === "GROUP" || invoiceType === "ADMISSION") {
        requestData.invoiceData = {
          ids: e.ids,
          value: activeOption,
        };
        let obj = invoiceData[invoiceType].options.find((v) => v.id === activeOption);
        for (let i of invoiceData.discounts) {
          if (
            i.groupTyped === obj.groupType.id &&
            i.branchId === obj.branch.id &&
            i.specializationId === obj.specialization.id &&
            i.timeTableCount <= e.ids.length
          ) {
            if (i.discountType === "MONEY") {
              requestData.discountType = "MONEY";
              requestData.discountPrice = obj.price * e.ids.length - i.amount;
            } else if (i.discountType === "PERCENT") {
              requestData.discountType = "PERCENT";
              requestData.discountPrice =
                obj.price * e.ids.length - parseInt((parseFloat(obj.price * e.ids.length) * parseFloat(i.amount)) / 100);
            }
          }
        }
      } else {
        requestData.invoiceData = {
          value: activeOption,
        };
      }
    }
    console.log(requestData);
    request({
      url: `sales/v1/lead-invoice/edit/${id}`,
      method: "put",
      attributes: requestData,
      cb: {
        success: ({ data }) => {
          toast.success("Saved Successfully");
        },
        fail: (err) => "",
      },
    });
  };
  return (
    <>
      <InvoiceStyle>
        <Box>
          <Row className="">
            <Col xs={4} className="mx-height">
              <FormDemo formRequest={(e) => saveHandler(e)}>
                <div className="user-card card">
                  <div className="user-card_head">
                    <span className="user-card_name">
                      <h4>
                        <input
                          type="text"
                          className="input-text"
                          name={"firstName"}
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />{" "}
                        <br />
                        <input
                          type="text"
                          className="input-text"
                          name={"lastName"}
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </h4>
                    </span>
                    {/* <Dropdown button={<Icon icon="icon-more-dots" color="#fff" />}>
                    <div>
                      <span className="drop-down-item .first" onClick={() => console.log("summary")}>
                        Summary
                      </span>
                      <span className="drop-down-item" onClick={() => console.log("edit")}>
                        Edit
                      </span>
                    </div>
                  </Dropdown> */}
                  </div>
                  <div className="user-card_content card">
                    <div className="select-control">
                      <div className="user-card_content-select">
                        <Field
                          type={"custom-select"}
                          options={get(data, "status.options")}
                          action={get(data, "status.action")}
                          labelKey={"name"}
                          name={"statusId"}
                          isFixed
                          hideLabel
                          defaultValue={get(data, "status.values")}
                          valueKey={"id"}
                        />
                      </div>
                    </div>
                    <div className="progressbar">
                      <div className="progressbar-content" style={{ width: `${get(data, "statusPercent")}%` }}></div>
                    </div>
                  </div>
                </div>
                <Tabs
                  leftList={["Info", "Payment", "Setting"]}
                  leftContent={[
                    <InfoList>
                      <InfoListItem>
                        <span className="key">{t("assign") ?? "assign"}</span>
                        <span className="value w-50">
                          <Field
                            type={"custom-select"}
                            options={get(data, "assign.options")}
                            CustomOption={AssignSelect}
                            defaultValue={get(data, "assign.values")}
                            name={"assign"}
                            isSearchable={false}
                            labelKey={"initialName"}
                            valueKey={"id"}
                            nullable={false}
                          />
                        </span>
                      </InfoListItem>
                      <InfoListItem>
                        <span className="key">{t("operator") ?? "operator"}</span>
                        <span className="value w-50">
                          <Field
                            type={"custom-select"}
                            options={get(data, "operator.options")}
                            CustomOption={AssignSelect}
                            defaultValue={get(data, "operator.values")}
                            name={"operator"}
                            isSearchable={false}
                            labelKey={"initialName"}
                            valueKey={"id"}
                            nullable={false}
                          />
                        </span>
                      </InfoListItem>
                      {/* <InfoListItem>
                        <span className="key">{t("address") ?? "address"}</span>
                        <span className="value w-50">
                          <Field
                            type={"custom-select"}
                            options={get(data, "address.options")}
                            defaultValue={get(data, "address.values")}
                            name={"address"}
                            isSearchable={false}
                            labelKey={"name"}
                            valueKey={"id"}
                            nullable={false}
                          />
                        </span>
                      </InfoListItem> */}
                      <InfoListItem>
                        <span className="key">{t("budget") ?? "budget"}</span>
                        <span className="value w-50">
                          {budget && (
                            <Field type={"input"} name="budget" property={{ type: "money" }} defaultValue={budget} hideLabel />
                          )}
                        </span>
                      </InfoListItem>
                      <InfoListItem>
                        <span className="key">{t("payment") ?? "payment"}</span>
                        <span className="value w-50 fw-bold txt-align-right">
                          {get(data, "paidPrice") && `${numberPrettier(get(data, "paidPrice"))}/`}
                          {get(data, "paidPrice") &&
                            (get(data, "price") !== get(data, "discountPrice") ? (
                              <>
                                <strike style={{ color: "red" }}>
                                  <span style={{ color: "black" }}>{numberPrettier(get(data, "price"))}</span>{" "}
                                </strike>
                                {numberPrettier(get(data, "discountPrice"))}
                              </>
                            ) : (
                              numberPrettier(get(data, "discountPrice"))
                            ))}
                        </span>
                      </InfoListItem>
                      <InfoListItem>
                        <span className="key">{t("birthDate") ?? "birthDate"}</span>
                        <span className="value w-50">
                          {/* {get(data, "birthDate") && new Date(get(data, "birthDate")).toLocaleDateString("en-US")} */}
                          <Field type={"custom-datepicker"} hideLabel defaultValue={get(data, "birthDate")} name="birthDate" />
                        </span>
                      </InfoListItem>
                      <InfoListItem>
                        <span className="key">
                          <Link to={`/sales/sales/lead/edit/${get(data, "lead.id")}`}> {get(data, "lead.fullName")}</Link> ning{" "}
                        </span>
                        <span className="value">{get(data, "relation")}</span>
                      </InfoListItem>
                      <InfoListItem>
                        <span className="key">{t("source") ?? "source"}</span>
                        <span className="value w-50">
                          <div className="w-100">
                            <Field
                              type={"custom-select"}
                              options={get(data, "source.options")}
                              action={get(data, "source.action")}
                              labelKey={"name"}
                              name={"sourceId"}
                              isFixed
                              hideLabel
                              defaultValue={get(data, "source.values")}
                              valueKey={"id"}
                            />
                          </div>
                        </span>
                      </InfoListItem>
                      <InfoListItem>
                        <span className="key">{t("gender") ?? "gender"}</span>

                        <span className="value w-50">
                          <div className="w-100">
                            <Field
                              type={"custom-select"}
                              options={get(data, "gender.options")}
                              action={get(data, "gender.action")}
                              labelKey={"name"}
                              name="gender"
                              hideLabel
                              isFixed
                              defaultValue={get(data, "gender.values")}
                              valueKey={"id"}
                            />
                          </div>
                        </span>
                      </InfoListItem>
                      <InfoListItem>
                        <span className="key">{t("interestedCourse") ?? "interestedCourse"}</span>

                        <span className="value w-50">
                          <div className="w-100">
                            <Field
                              type={"custom-select"}
                              options={get(data, "interestedCourse.options")}
                              action={get(data, "interestedCourse.action")}
                              labelKey={"name"}
                              name="interestedCourse"
                              hideLabel
                              isFixed
                              defaultValue={get(data, "interestedCourse.values")}
                              valueKey={"id"}
                            />
                          </div>
                        </span>
                      </InfoListItem>
                      <InfoListItem>
                        <span className="key">{t("englishLevel") ?? "englishLevel"}</span>

                        <span className="value w-50">
                          <div className="w-100">
                            <Field
                              type={"custom-select"}
                              name="englishLevel"
                              isFixed
                              options={get(data, "englishLevel.options")}
                              action={get(data, "englishLevel.action")}
                              labelKey={"name"}
                              hideLabel
                              defaultValue={get(data, "englishLevel.values")}
                              valueKey={"id"}
                            />
                          </div>
                        </span>
                      </InfoListItem>
                      <InfoListItem>
                        <span className="key">{t("tags") ?? "tags"}</span>

                        <span className="value w-50">
                          <div className="w-100">
                            <Field
                              type={"custom-select"}
                              options={get(data, "tags.options")}
                              action={get(data, "tags.action")}
                              labelKey={"name"}
                              name={"tags"}
                              isMulti
                              hideLabel
                              isFixed
                              defaultValue={get(data, "tags.values")}
                              maxShowSelected={1}
                              valueKey={"id"}
                            />
                          </div>
                        </span>
                      </InfoListItem>
                      <InfoListItem>
                        <span className="key">{t("priority") ?? "priority"}</span>

                        <span className="value w-50">
                          <div className="w-100">
                            <Field
                              className={"w-100"}
                              isSearchable={false}
                              type={"custom-select"}
                              options={get(data, "priority.options")}
                              action={get(data, "priority.action")}
                              labelKey={"name"}
                              CustomOption={CustomOptionPriority}
                              CustomHeader={CustomHeaderPriority}
                              name={"priority"}
                              hideLabel
                              isFixed
                              defaultValue={get(data, "priority.values")}
                              valueKey={"id"}
                            />
                          </div>
                        </span>
                      </InfoListItem>

                      <hr />
                      <InfoListItem>
                        <span className="key w-50 mr-5">
                          <Field
                            className="w-100"
                            type={"custom-select"}
                            isFixed
                            name={"invoiceType"}
                            options={get(data, "invoiceTypeDoubleSelect.invoiceType.options")}
                            action={get(data, "invoiceTypeDoubleSelect.invoiceType.action")}
                            labelKey={"name"}
                            onChange={(e) => handleInvoiceSelect(e)}
                            hideLabel
                            defaultValue={get(data, "invoiceTypeDoubleSelect.invoiceType.values")}
                            valueKey={"id"}
                          />
                        </span>
                        {invoiceType ? (
                          <Button onClick={() => setinvoiceModal((state) => !state)} className="btn-color-dark w-50">
                            {invoiceType}
                          </Button>
                        ) : null}
                        <ModalInvoice
                          open={invoiceModal}
                          setOpen={setinvoiceModal}
                          data={invoiceData}
                          type={invoiceType}
                          active={activeOption}
                          setActive={invoiceCardHandler}
                          setIds={invoiceCardIDhandler}
                          clearFilters={clearFilters}
                          invoiceDatafilters={invoiceDatafilters}
                          setInvoiceDatafilters={setInvoiceDatafilters}
                          getFildType={getFildType}
                        />
                      </InfoListItem>

                      <div className="p-15-30">
                        {isArray(phoneNumbers?.phoneNumbers) &&
                          phoneNumbers?.phoneNumbers.length > 0 &&
                          phoneNumbers?.phoneNumbers.map((val, index) => {
                            return (
                              <Radio
                                options={phoneNumberTypes}
                                key={val.relationId ?? index}
                                selectAction={get(phoneNumbers, "action")}
                                value={val}
                                isRemove={index > 0}
                                isEditable={true}
                                isLast={index === phoneNumbers.phoneNumbers.length - 1}
                                index={index}
                                labelRequired
                                fildDisable={true}
                                radioDisable={false}
                                label={"Phone Numbers"}
                                defaultValueForSelect={val.main && val.relationId}
                                clickRadio={() => {}}
                                name={`additionalPhoneNumbers.phoneNumbers[${index}]`}
                                clickPhone={clickPhone}
                                optionHandling={() => {}}
                                clickTrash={clickTrash}
                              />
                            );
                          })}
                      </div>
                      <InfoListItem className="justify-content-end">
                        <Button className="btn-color-dark">Cancel</Button>
                        <Button bg="var(--green)" type="submit">
                          Save
                        </Button>
                      </InfoListItem>
                    </InfoList>,
                    <LeadOnePayment />,
                    <>
                      <InfoList>
                        <InfoListItem>
                          <Button bg="var(--info)">Setings</Button>
                        </InfoListItem>
                        <InfoListItem>
                          <span className="key">Assigned</span>
                          <Button bg="var(--btn--bg--purple)">Want to pay</Button>
                        </InfoListItem>
                        <hr />
                        <InfoListItem>
                          <span className="key">Budget</span>

                          <Button bg="var(--info)">Need to think</Button>
                        </InfoListItem>
                        <InfoListItem>
                          <span className="key">Invoice type</span>
                          <Button bg="var(--btn--bg--purple)">Interesting</Button>
                        </InfoListItem>
                        <InfoListItem>
                          <span className="key">Phone Number</span>
                          <Button bg="var(--danger)">Not interested</Button>
                        </InfoListItem>
                        <InfoListItem>
                          <span className="key">Social network</span>
                          <Button bg="var(--warning)">Pending</Button>
                        </InfoListItem>
                        <InfoListItem>
                          <span className="key">Courses</span>
                          <Button bg="var(--success)">Paid</Button>
                        </InfoListItem>
                      </InfoList>
                    </>,
                  ]}
                  rightList={[]}
                />
              </FormDemo>
            </Col>
            <Col xs={8} className="">
              <div className="chat-wrapper">
                <div className="chat">
                  {messages.map((v, i) =>
                    v.type === "sent" ? (
                      <Flex key={i} align="flex-start" justify="flex-end" className="msg">
                        <div className="msg-time">{v.time}</div>
                        <div className="msg-content sent">
                          <p>
                            {v.content} <div className="rectangle"></div>
                          </p>
                        </div>
                        <div className="msg-avatar">
                          <img src={v.from} alt="username" />
                        </div>
                      </Flex>
                    ) : (
                      <Flex key={i} align="flex-start" justify="start" className="msg">
                        <div className="msg-avatar">
                          <img src={v.from} alt="username" />
                        </div>
                        <div className="msg-content got">
                          <p>
                            {v.content} <div className="rectangle"></div>
                          </p>
                        </div>
                        <div className="msg-time">{v.time}</div>
                      </Flex>
                    )
                  )}
                  <div ref={messagesEndRef} />
                </div>
                <div className="chat-input w-100">
                  <Input placeholder="Typing here..." className="w-100" />
                  <Button className="send-btn" bg="var(--success)">
                    Send <Icon icon="icon-send" size="xs" color={"white"} className="checkIcon" />
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Box>
      </InvoiceStyle>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    request: ({ url, method = "get", cb, attributes }) => {
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

export default withTranslation("pdp")(connect(null, mapDispatchToProps)(memo(LeadInvoiceOneContainer)));
