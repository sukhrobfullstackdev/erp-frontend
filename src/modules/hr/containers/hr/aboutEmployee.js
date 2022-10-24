import { isArray, get, isEmpty } from "lodash";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Collapse from "../../../../components/elements/collapse";
import Img from "../../../../components/elements/img";
import Field from "../../../../containers/Form/field";
import Radio from "../../components/Radio";
import { Col, Row } from "react-grid-system";
import { getSelectOptionsListFromData } from "../../../../utils";
import { withTranslation } from "react-i18next";

const AboutEmployeeStyle = styled.div`
  .firstCollapse {
    &.active {
      margin-bottom: 50px;
    }
  }
  .img-container {
    padding: 0 10px !important;
  }
  .form-label {
    color: #353945;
    line-height: 12px;
  }
  .form-input-container {
    width: 100% !important;
    height: 50px !important;
    input {
      font-size: 16px !important;
      line-height: 24px !important;
      color: #777e91;
    }
  }
  .select__header__selectedNumber {
    min-width: 30px;
    min-height: 30px;
    font-size: 14px;
    font-weight: 600;
  }
  .imgContainer {
    width: 100% !important;
    height: 268px !important;
  }
  .first-row {
    margin-bottom: 30px;
  }
  .main__upload__label {
    width: 100%;
  }
  .collapse {
    &__body {
      &.active {
        padding: 40px 30px 37px 30px;
      }
      .datePicker {
        width: 100%;
        .rs-picker-toggle {
          height: 50px;
          display: flex;
          align-items: center;
          background: #fcfcfd !important;
          &:after {
            top: 10px;
            display: none;
          }
          &::before {
            top: 11px;
          }
        }
      }
      .radio-section-input {
        .form-input-container {
          height: 48px !important;
        }
      }
    }
  }
`;

const AboutEmployee = ({
  employerInfo = [],
  isRequire,
  editable = true,
  t,
  setIndexOfRadio,
  uploadFile,
  optionHandling,
  phoneNumberOptions,
  ...props
}) => {
  const [phoneNumbers, setPhoneNumbers] = useState([]);

  useEffect(() => {
    setPhoneNumbers(get(employerInfo, "phoneNumber.phoneNumbers", []));
  }, [employerInfo]);

  const gender_list = getSelectOptionsListFromData(get(employerInfo, "gender.options", []), "id", "name");
  const maritalStatusList = getSelectOptionsListFromData(get(employerInfo, "maritalStatus.options", []), "id", "name");
  const privilegesList = getSelectOptionsListFromData(get(employerInfo, "privilegeType.options", []), "id", "name");

  const clickPhone = useCallback(() => {
    setPhoneNumbers((phoneNumbers) => [...phoneNumbers, { id: new Date().getTime() }]);
  }, []);

  const clickTrash = (index) => {
    if (!isEmpty(phoneNumbers)) setPhoneNumbers(phoneNumbers.filter((item, i) => i !== index));
  };

  return (
    <AboutEmployeeStyle>
      <Collapse title="Xodim haqida ma'lumot" active="1" className="firstCollapse">
        <Row>
          <Col xs={2}>
            {editable ? (
              <Field type={"dropzone"} hideLabel name={"dropzone"} onChange={(file) => uploadFile(file)}>
                <Img />
              </Field>
            ) : (
              <Img />
            )}
          </Col>
          <Col xs={10}>
            <Row>
              <Col xs={2.4}>
                <Field
                  className="mb-40"
                  type={"input"}
                  defaultValue={get(employerInfo, "firstName", "")}
                  label={t("employee-firstName-label") ?? "Name"}
                  labelRequired
                  name={"employerInfo.firstName"}
                  property={{ placeholder: "Enter name..." }}
                  disabled={!editable}
                />
              </Col>
              <Col xs={2.4}>
                <Field
                  className="mb-40"
                  type={"input"}
                  defaultValue={get(employerInfo, "lastName", "")}
                  label={t("employee-lastName-label") ?? "SURNAME"}
                  name={"employerInfo.lastName"}
                  placeholder="Enter surename..."
                  labelRequired
                  disabled={!editable}
                />
              </Col>
              <Col xs={2.4}>
                <Field
                  className="mb-40"
                  type={"input"}
                  defaultValue={get(employerInfo, "middleName", "")}
                  label={t("employee-middleName-label") ?? "Father name"}
                  name={"employerInfo.middleName"}
                  disabled={!editable}
                />
              </Col>
              <Col xs={2.4}>
                <Field
                  className="mb-40"
                  type={"custom-datepicker"}
                  property={{
                    format: "dd/MM/yyyy",
                    placeholder: "dd / MM / yyyy",
                  }}
                  defaultValue={get(employerInfo, "birthDate", new Date().getTime())}
                  label={t("employee-birthDate-label") ?? "date of birth"}
                  name={"employerInfo.birthDate"}
                  labelRequired
                />
              </Col>
              <Col xs={2.4}>
                <Field
                  className="mb-40"
                  type={"input"}
                  defaultValue={get(employerInfo, "email", "")}
                  label={t("employee-email-label") ?? "mail"}
                  name={"employerInfo.email"}
                  labelRequired
                  disabled={!editable}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={2.4}>
                <Field
                  className="mb-40"
                  options={gender_list}
                  defaultValue={get(employerInfo, "gender.values", [])}
                  type={"custom-select"}
                  label={t("employee-gender") ?? "gender"}
                  name={"employerInfo.gender"}
                  placeholder="-"
                  labelRequired
                  isSearchable={editable}
                  params={{ required: isRequire }}
                  editable={editable}
                />
              </Col>
              <Col xs={2.4}>
                <Field
                  className="mb-40"
                  options={maritalStatusList}
                  defaultValue={get(employerInfo, "maritalStatus.values", [])}
                  isSearchable={editable}
                  type={"custom-select"}
                  label={t("employee-maritalStatus") ?? "Marital status"}
                  placeholder="-"
                  name={"employerInfo.maritalStatus"}
                  labelRequired
                  params={{ required: isRequire }}
                  editable={editable}
                />
              </Col>
              <Col xs={2.4}>
                <Field
                  className="mb-40"
                  options={privilegesList}
                  defaultValue={get(employerInfo, "privilegeType.values", [])}
                  type={"custom-select"}
                  label={t("employee-privilegeTypes") ?? "Privileges"}
                  name={"employerInfo.privilegeTypes"}
                  isMulti
                  isSearchable
                  maxShowSelected={1}
                  placeholder="-"
                  editable={editable}
                />
              </Col>
              <Col xs={4.8}>
                {isArray(phoneNumbers) &&
                  phoneNumbers.map((val, index) => (
                    <Radio
                      options={phoneNumberOptions}
                      key={val.id}
                      isEditable={editable}
                      value={val}
                      isRemove={index > 0}
                      isLast={index === phoneNumbers.length - 1}
                      name={`employerInfo.phoneNumbers`}
                      label={t("employee-phone-number-label") ?? "phone number"}
                      clickRadio={setIndexOfRadio}
                      defaultValueForSelect={val.phoneNumberTypeId}
                      selectAction={get(employerInfo, "phoneNumber.action", {})}
                      firstValue={phoneNumbers[0]}
                      {...{
                        index,
                        clickPhone,
                        clickTrash,
                        optionHandling,
                      }}
                    />
                  ))}
              </Col>
            </Row>
          </Col>
        </Row>
      </Collapse>
    </AboutEmployeeStyle>
  );
};

export default withTranslation("pdp")(AboutEmployee);
