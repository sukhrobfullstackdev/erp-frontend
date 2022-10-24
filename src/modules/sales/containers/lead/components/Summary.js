import { isArray, get, find, isEmpty, head, isNil } from "lodash";
import React, { useState, memo, useCallback, useEffect } from "react";
import { SummaryStyles } from "./summaryStyles";
import { Col, Row } from "react-grid-system";
import { useForm } from "react-hook-form";
import { getSelectOptionsListFromData } from "../../../../../utils";
import Collapse from "../../../../../components/elements/collapse";
import Icon from "../../../../../components/elements/icon";
import Field from "../../../../../containers/Form/field";
import Radio from "../../../../hr/components/Radio";
import AddComment from "./addComment";
import AddressSelect from "./addressSelect";

const Summary = ({
  leadState,
  setLeadState,
  data = {},
  indexOfRadio,
  getAddress = () => {},
  setIndexOfRadio,
  deleteComment,
  addCommit = () => {},
  ...props
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [phoneNumberTypes, setPhoneNumberTypes] = useState([]);
  const positionList = get(data, "position.options", []);
  const leadStatusList = get(data, "status.options", []);
  const englishLevelList = get(data, "englishLevel.options", []);
  const interestedCoursesList = get(data, "interestedCourses.options", []);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const genderList = get(data, "gender.options", []);
  const additionalPhoneNumbersList = get(data, "additionalPhoneNumber", [{}]);
  const addPhoneField = () => {
    let data = [];
    if (additionalPhoneNumbersList.phoneNumbers && leadState.numberField) {
      for (let i = 0; i < additionalPhoneNumbersList.phoneNumbers.length; i++) {
        let myDate = new Date().getTime();
        if (leadState.numberField.main == false) {
          data.push({
            phoneNumber: leadState.numberField.number,
            id: myDate + i,
            main: false,
            relationNameId: "1",
          });
          if (phoneNumbers.length == 1) {
            data.unshift(phoneNumbers[0]);
            setPhoneNumbers(data);
            setLeadState((s) => ({
              ...s,
              phoneNumbersId: [...s, data[0].id],
            }));
          }
        }
        if (additionalPhoneNumbersList.phoneNumbers[i].main == true && leadState.numberField.main == true) {
          data.push({
            phoneNumber: leadState.numberField.number,
            id: myDate + 1 + i,
            main: true,
            relationNameId: "1",
          });
          if (phoneNumbers.length == 0) {
            setPhoneNumbers(data);
            setLeadState((s) => ({
              ...s,
              phoneNumbersId: [data[0].id],
            }));
          }
        }
      }
    }
  };
  const setPhoneNumberWithId = () => {
    let temp = [];
    let i = 1;
    for (let index of additionalPhoneNumbersList.phoneNumbers) {
      i++;
      let idDate = new Date().getTime();
      let idm = idDate + i;
      if (!leadState.phoneNumbersId.includes(index)) {
        setLeadState((s) => ({
          ...s,
          phoneNumbersId: [...s.phoneNumbersId, idm],
        }));
        setPhoneNumbers((state) => [
          ...state,
          {
            phoneNumber: index.phoneNumber,
            main: index.main,
            relationNameId: index.relationNameId,
            id: idm,
          },
        ]);
        i++;
      }
    }
  };
  useEffect(() => {
    setAddressList(get(data, "address", []));
    let options = get(data, "additionalPhoneNumber.options", [{}]);
    if (!isNil(additionalPhoneNumbersList.phoneNumbers) && !leadState.isCreate) {
      if (additionalPhoneNumbersList.phoneNumbers.length > 0) {
        setLeadState((s) => ({ ...s, phoneNumbersId: [] }));

        setPhoneNumbers([]);
        setIndexOfRadio(0);
        setPhoneNumberWithId();
      } else {
        let myDate = new Date().getTime();
        setLeadState((s) => ({ ...s, phoneNumbersId: [myDate] }));

        setPhoneNumbers([
          {
            phoneNumber: null,
            id: myDate,
            main: true,
            relationNameId: "1",
          },
        ]);
      }
    }
    if (!isEmpty(options)) {
      options = getSelectOptionsListFromData(options, "id", "name");
      setPhoneNumberTypes(options);
    }
  }, [data]);
  useEffect(() => {
    if (leadState.isCreate) addPhoneField();
  }, [leadState.numberField]);

  const clickPhone = useCallback(() => {
    let myDate = new Date().getTime();
    setPhoneNumbers((phoneNumbers) => [
      ...phoneNumbers,
      {
        id: myDate,
        phoneNumber: leadState.phoneNumber,
        main: leadState.main,
      },
    ]);
    setLeadState((s) => ({
      ...s,
      phoneNumbersId: [...s.phoneNumbersId, myDate],
    }));
  }, [leadState.phoneNumber, leadState.main]);
  const clickTrash = (index) => {
    if (phoneNumbers[index].main == true) {
      setIndexOfRadio(0);
      let data = phoneNumbers;
      data[0] = { ...data[0], main: true };
      setPhoneNumbers(data);
    } else {
    }
    if (!isEmpty(phoneNumbers)) {
      setPhoneNumbers(phoneNumbers.filter((item, i) => i != index));
      setLeadState((s) => ({
        ...s,
        phoneNumbersId: s.phoneNumbersId.filter((item, ind) => ind != index),
      }));
    }
    if (indexOfRadio > index) {
      setIndexOfRadio((state) => state - 1);
    }
  };
  const clickRadio = (index) => {
    let data = phoneNumbers;
    data[index] = { ...data[index], main: true };
    setPhoneNumbers(data);
    setIndexOfRadio(index);
  };

  const optionHandling = ({ options, name }) => {
    options = getSelectOptionsListFromData(options, "id", "name");
    setPhoneNumberTypes(options);
  };
  return (
    <SummaryStyles isFocus={isFocus}>
      <Collapse title="Xodim haqida ma'lumot" active="1" className="collapse firstCollapse">
        <Row style={{ width: "100%" }}>
          <Col xs={2} className="img-container">
            <img
              className="main_user_img"
              src={"https://i.stack.imgur.com/l60Hf.png"}
              style={{ width: "100%" }}
              isEditable={leadState.editable}
            />
            <Field
              label={"Status"}
              placeholder={"Status"}
              labelRequired
              options={getSelectOptionsListFromData(leadStatusList, "id", "name")}
              params={{ required: true }}
              name={"statusId"}
              defaultValue={head(get(data.status, "values"))}
              type="custom-select"
              editable={leadState.editable}
            />
          </Col>
          <Col xs={10}>
            <Row className="first-row">
              <Col xs={2.4}>
                <Field
                  type={"input"}
                  labelRequired
                  property={{ placeholder: "Firstname" }}
                  name={"firstName"}
                  params={{ required: true }}
                  disabled={!leadState.editable}
                  defaultValue={get(data, "firstName")}
                  label={"FirstName"}
                />
              </Col>
              <Col xs={2.4}>
                <Field
                  type={"input"}
                  name={"lastName"}
                  property={{ placeholder: "Lastname" }}
                  disabled={!leadState.editable}
                  defaultValue={get(data, "lastName")}
                  label={"SurName"}
                />
              </Col>
              <Col xs={2.4}>
                <Field
                  className="mb-40"
                  type={"custom-datepicker"}
                  defaultValue={get(data, "birthDate", new Date().getTime())}
                  editable={leadState.editable}
                  property={{
                    format: "dd/MM/yyyy",
                    placeholder: "dd / MM / yyyy",
                  }}
                  name={"birthDate"}
                  label={"DateOfBirth"}
                />
              </Col>
              <Col xs={2.4}>
                <Field
                  label={"Position"}
                  placeholder={"Position"}
                  labelRequired
                  type="custom-select"
                  editable={leadState.editable}
                  params={{ required: true }}
                  name={"positionId"}
                  options={getSelectOptionsListFromData(positionList, "id", "name")}
                  defaultValue={head(get(data.position, "values"))}
                />
              </Col>
              <Col xs={2.4}>
                <Field
                  placeholder={"English lavel"}
                  options={getSelectOptionsListFromData(englishLevelList, "id", "name")}
                  name="englishLevel"
                  defaultValue={head(get(data.englishLevel, "values"))}
                  label={"ENGLISH LEVEL"}
                  type="custom-select"
                  editable={leadState.editable}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={7.2}>
                <Row>
                  <Col xs={4}>
                    <Field
                      label={"Interested Course"}
                      placeholder={"Interested Course"}
                      type="custom-select"
                      editable={leadState.editable}
                      isMulti
                      options={getSelectOptionsListFromData(interestedCoursesList, "id", "name")}
                      defaultValue={get(data.interestedCourses, "value")}
                      name="interestedCourses"
                    />
                  </Col>
                  <Col xs={4}>
                    <Field
                      placeholder={"Gender"}
                      options={getSelectOptionsListFromData(genderList, "id", "name")}
                      name="gender"
                      defaultValue={head(get(data.gender, "values"))}
                      label={"Gender"}
                      type="custom-select"
                      editable={leadState.editable}
                    />
                  </Col>
                  <Col xs={4}>
                    <AddressSelect
                      label={"Address"}
                      placeholder={"Address"}
                      editable={leadState.editable}
                      addressList={get(addressList, "options", [])}
                      defaultValue={get(addressList, "value", [])}
                      options={getSelectOptionsListFromData(get(addressList, "options", []), "id", "name")}
                    />
                  </Col>
                </Row>
                <div className="allComment">
                  <div className="allComment__body">
                    {isArray(leadState.myComments) &&
                      leadState.myComments.map((comment, index) => {
                        return (
                          <div className="comment-row" key={new Date() + index}>
                            <div className="comment-row-action">
                              <span className="commit-row-userName">
                                {comment.modifiedName ? comment.modifiedName : "Unknown"}
                              </span>
                              <span className="commit-row-time">10:00</span>
                              <Icon color="#EF466F" icon="icon-recycle" onClick={() => deleteComment(index, comment)} />
                            </div>
                            <div className="commit-row-text">
                              <span>{comment.text}</span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  <div className="allComment__footer">
                    <div className="comment_input">
                      <div className="input-wrapper">
                        <AddComment leadState={leadState} setFocus={setIsFocus} addCommit={addCommit} />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={4.8}>
                {console.log(phoneNumbers, additionalPhoneNumbersList, phoneNumberTypes)}
                {isArray(phoneNumbers) &&
                  phoneNumbers.length > 0 &&
                  phoneNumbers.map((val, index) => {
                    return (
                      <Radio
                        options={phoneNumberTypes}
                        key={val.id}
                        selectAction={get(additionalPhoneNumbersList, "action", {})}
                        value={val}
                        isRemove={index > 0}
                        isEditable={leadState.editable}
                        isLast={index === phoneNumbers.length - 1}
                        index={index}
                        labelRequired
                        fildDisable={!isNil(leadState.numberField) && val.phoneNumber == leadState.numberField?.number}
                        radioDisable={get(leadState.numberField, "number", false)}
                        label={"Phone Numbers"}
                        defaultValueForSelect={find(phoneNumbers, (p) => p.id == val.id).relationNameId}
                        clickRadio={clickRadio}
                        name={`additionalPhoneNumbers.phoneNumbers[${index}]`}
                        clickPhone={clickPhone}
                        optionHandling={optionHandling}
                        clickTrash={clickTrash}
                      />
                    );
                  })}
              </Col>
            </Row>
          </Col>
        </Row>
      </Collapse>
    </SummaryStyles>
  );
};

export default memo(Summary);
