import React, { memo, useCallback, useEffect, useState } from "react";
import { get, isArray, isEmpty, isEqual } from "lodash";
import { withTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { Col, Row } from "react-grid-system";
import { connect } from "react-redux";
import Collapse from "../../../../components/elements/collapse";
import Box from "../../../../components/elements/box";
import FormDemo from "../../../../containers/Form/form-demo";
import Img from "../../../../components/elements/img";
import Field from "../../../../containers/Form/field";
import Radio from "../../components/Radio";
import ApiActions from "../../../../services/api/actions";
import { getSelectOptionsListFromData } from "../../../../utils";
import Button from "../../../../components/elements/button";
import Employments from "../hr/employments";
import AccountInformation from "../hr/accountInformation";
import Education from "../hr/education";
import Experiment from "./../hr/experiment";
import Skills from "../hr/skills";
import SkillsScheme from "../../../../schema/SkillsScheme";
import Attachments from "../hr/attachments";
import Identification from "../hr/identification";
import { InitialLoader } from "../../../../components/loader";
import SettingsActions from "../../../settings/actions";

let dataForForm = {};
const CreateContainer = ({
  entities,
  getSkillsList,
  skillsList,
  getDataOfEmployee,
  employeeData,
  fileUpload,
  addItemRequest,
  createOption,
  t,
  ...rest
}) => {
  const [attachments, setAttachments] = useState([]);
  const [loader, setLoader] = useState(false);
  const [state, setState] = useState({
    deletedIds: [],
    phoneNumbers: [],
    skillsOptions: [],
    avatarId: "",
    phoneNumberTypes: [],
    index: 0,
  });
  const [render, setRender] = useState({});
  const history = useHistory();

  useEffect(() => {
    getSkillsList();
    getDataOfEmployee();
  }, []);

  const uploadFile = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    fileUpload({
      attributes: formData,
      formMethods: {
        setLoading: () => {},
      },
      cb: {
        success: ({ id }) => {
          setState((s) => ({ ...s, avatarId: id }));
        },
      },
    });
  };

  const maritalStatusList = getSelectOptionsListFromData(
    get(employeeData, "result.data.employerInfo.maritalStatus.options", []),
    "id",
    "name"
  );
  const genderList = getSelectOptionsListFromData(get(employeeData, "result.data.employerInfo.gender.options", []), "id", "name");
  const privilegeTypeList = getSelectOptionsListFromData(
    get(employeeData, "result.data.employerInfo.privilegeType.options", []),
    "id",
    "name"
  );
  const roleList = get(employeeData, "result.data.accountInfo.role.options", []);

  useEffect(() => {
    let phones = get(employeeData, "result.data.employerInfo.phoneNumber.phoneNumbers", []);
    setState((s) => ({
      ...s,
      phoneNumbers: phones.map((item, index) => ({ ...item, index })),
      index: phones.length - 1,
    }));
    let options = get(employeeData, "result.data.employerInfo.phoneNumber.options", []);
    let skillOptions = get(employeeData, "result.data.skill.options", []);
    if (!isEmpty(skillOptions)) {
      skillOptions = getSelectOptionsListFromData(skillOptions, "id", "name");
      setState((s) => ({ ...s, skillsOptions: skillOptions }));
    }

    if (!isEmpty(options)) {
      options = getSelectOptionsListFromData(options, "id", "name");
      setState((s) => ({ ...s, phoneNumberTypes: options }));
    }
  }, [employeeData]);

  const create = useCallback(({ data, setError }) => {
    let educations = [];
    let experiences = [];
    if (data.educations) {
      for (let item in data.educations) {
        if (item.length === 36) data.educations[item] = { ...data.educations[item], id: item };
        educations.push(data.educations[item]);
      }
    }
    if (data.experiences) {
      for (let item in data.experiences) {
        if (item.length === 36) data.experiences[item] = { ...data.experiences[item], id: item };
        experiences.push(data.experiences[item]);
      }
    }

    data.educations = educations;
    data.experiences = experiences;

    let phoneNumbers = data?.employerInfo?.phoneNumbers?.phoneNumber;
    let phoneNumberTypes = data?.employerInfo?.phoneNumbers?.phoneNumberTypeId;
    let checkboxId = data?.employerInfo?.main;
    let phoneNumbersTemp = [];
    if (isArray(phoneNumbers)) {
      phoneNumbers.forEach((val, ind) => {
        let keys = Object.keys(val);
        let id = keys[0];
        let value = val[keys[0]];
        if (!isEmpty(value))
          phoneNumbersTemp.push({
            phoneNumber: "+" + value,
            phoneNumberTypeId: phoneNumberTypes[ind][id],
            main: checkboxId == id,
          });
      });
    }
    data.employerInfo.phoneNumbers = phoneNumbersTemp;

    data.employments = data.employments.map((item) => {
      if (item.employeeWorkDayList) {
        item.employeeWorkDayList = item.employeeWorkDayList.map((i) => {
          let temp = Object.keys(i).find((j) => j.startsWith("week"));
          return {
            ...i,
            working: i[temp],
            weekDay: Object.keys(i)
              .find((j) => j.startsWith("week"))
              .split("week")[1],
          };
        });
        return { ...item };
      }
    });
    data.employerInfo.photoId = state.avatarId;
    data.attachments = attachments;

    let temp = [];
    console.log(data.accountInfo.roles, roleList);
    Object.keys(data.accountInfo.roles).forEach((val, index) => {
      if (data.accountInfo.roles[val]) temp.push(roleList[index].id);
    });
    data.accountInfo.roles = temp;

    // setLoader(true);

    addItemRequest({
      attributes: data,
      formMethods: {
        setError,
      },
      cb: {
        success: (res) => {
          // setLoader(false);
          history.push("/hrm/company/employees");
        },
        fail: (res) => {
          // setLoader(false);
        },
      },
      isChangeListState: false,
    });
  }, []);

  const clickPhone = useCallback(() => {
    setState((s) => ({
      ...s,
      index: s.index + 1,
      phoneNumbers: [
        ...s.phoneNumbers,
        {
          id: new Date().getTime(),
          phoneNumber: "",
          phoneNumberTypeId: "",
          main: "",
          index: s.index + 1,
        },
      ],
    }));
  }, []);

  const removeItem = useCallback(
    (id) =>
      setState((s) => ({
        ...s,
        phoneNumbers: [...s.phoneNumbers.filter((number) => !isEqual(get(number, "phoneNumberTypeId"), id))],
      })),
    []
  );
  const optionHandling = ({ options, name }) => {
    options = getSelectOptionsListFromData(options, "id", "name");
    if (name === "skill.skillsIdList") setState((s) => ({ ...s, skillsOptions: options }));
    else setState((s) => ({ ...s, phoneNumberTypes: options }));
  };

  const clickTrash = (index, name, valIndex, id) => {
    if (!isEmpty(state.phoneNumbers)) {
      let deletedItem = state.phoneNumbers.splice(index, 1);
      // setState(s => ({...s, deletedIds: [...s.deletedIds, get(deletedItem, "[0].id") ], phoneNumbers: [...s.phoneNumbers] }));
      setState((s) => ({
        ...s,
        deletedIds: [`${name}.phoneNumber[${valIndex}].${id}`, `${name}.phoneNumberTypeId[${valIndex}].${id}`],
        phoneNumbers: [...s.phoneNumbers],
      }));
    }
  };

  const editable = true;

  let temp = {};
  if (!isEmpty(state.deletedIds))
    temp = {
      setValueData: [
        { name: get(state, "deletedIds[0]", ""), value: "" },
        { name: get(state, "deletedIds[1]", ""), value: "" },
      ],
    };

  const educationCallBack = useCallback(({ getValues, setValue, index, id }) => {
    let getEducation = getValues(`educations`);
    delete getEducation[id];
    setValue(`educations`, getEducation);
  }, []);

  const experimentCallBack = useCallback(({ getValues, setValue, index, id }) => {
    let getEducation = getValues(`educations`);
    delete getEducation[id];
    setValue(`educations`, getEducation);
  }, []);

  const deleteEducation = useCallback((index, id) => {
    dataForForm = {
      ...dataForForm,
      formCb: educationCallBack,
      dataForCb: { index, id },
    };
    setRender({});
  }, []);

  const deleteExperiment = useCallback((index, id) => {
    dataForForm = {
      ...dataForForm,
      formCb: experimentCallBack,
      dataForCb: { index, id },
    };
    setRender({});
  }, []);

  return (
    <Box>
      {(!get(employeeData, "isFetched", true) || loader) && <InitialLoader className={"initialLoader"} />}
      <Row>
        <Col xs={12}>
          <FormDemo
            {...temp}
            {...dataForForm}
            formRequest={create}
            footer={
              <Button className="submitBtn" success type={"submit"}>
                {t("submit") ?? "Submit"}
              </Button>
            }
          >
            <Collapse title={t("xodim_haqida_ma'lumot") ?? "Xodim haqida ma'lumot"} active="1" className="firstCollapseForAdd">
              <Row>
                <Col xs={2}>
                  <Field type={"dropzone"} hideLabel name={"dropzone"} onChange={(file) => uploadFile(file)}>
                    <Img />
                  </Field>
                </Col>
                <Col xs={10}>
                  <Row>
                    <Col xs={2.4}>
                      <Field
                        className="mb-40"
                        type={"input"}
                        placeholder={`${t("enter_name_placeholder") ?? "Enter name"}...`}
                        label={t("name") ?? "Name"}
                        labelRequired
                        name={"employerInfo.firstName"}
                        params={{ required: editable }}
                      />
                    </Col>
                    <Col xs={2.4}>
                      <Field
                        className="mb-40"
                        type={"input"}
                        label={t("surname") ?? "SURNAME"}
                        placeholder={`${t("enter_surename_placeholder") ?? "Enter surename"}...`}
                        name={"employerInfo.lastName"}
                        labelRequired
                        params={{ required: editable }}
                      />
                    </Col>
                    <Col xs={2.4}>
                      <Field
                        className="mb-40"
                        type={"input"}
                        placeholder={`${t("enter_name_placeholder") ?? "Enter name"}...`}
                        label={t("father_name") ?? "Father name"}
                        name={"employerInfo.middleName"}
                      />
                    </Col>
                    <Col xs={2.4}>
                      <Field
                        className="mb-40"
                        type={"custom-datepicker"}
                        property={{
                          placeholder: "dd / MM / yyyy",
                        }}
                        label={t("date_of_birth") ?? "date of birth"}
                        name={"employerInfo.birthDate"}
                        labelRequired
                        params={{ required: editable }}
                      />
                    </Col>
                    <Col xs={2.4}>
                      <Field
                        className="mb-40"
                        type={"input"}
                        label={t("mail") ?? "mail"}
                        name={"employerInfo.email"}
                        labelRequired
                        placeholder={`${t("enter_mail_address_placeholder") ?? "Enter mail address"}...`}
                        property={{
                          type: "email",
                        }}
                        params={{ required: editable }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={2.4}>
                      <Field
                        className="mb-40"
                        options={genderList}
                        type={"custom-select"}
                        label={t("gender") ?? "gender"}
                        name={"employerInfo.gender"}
                        placeholder="-"
                        labelRequired
                        params={{ required: editable }}
                        nullable={false}
                      />
                    </Col>
                    <Col xs={2.4}>
                      <Field
                        className="mb-40"
                        options={maritalStatusList}
                        isSearchable
                        type={"custom-select"}
                        label={t("marital_status") ?? "Marital status"}
                        placeholder="-"
                        name={"employerInfo.maritalStatus"}
                        labelRequired
                        params={{ required: editable }}
                        nullable={false}
                      />
                    </Col>
                    <Col xs={2.4}>
                      <Field
                        className="mb-40"
                        options={privilegeTypeList}
                        type={"custom-select"}
                        label={t("privileges") ?? "Privileges"}
                        name={"employerInfo.privilegeTypes"}
                        isMulti
                        isSearchable
                        maxShowSelected={1}
                        placeholder="-"
                      />
                    </Col>
                    <Col xs={4.8}>
                      {state.phoneNumbers?.map((val, index) => (
                        <Radio
                          options={state.phoneNumberTypes}
                          // isNew={newItem}
                          selectAction={get(employeeData, "result.data.employerInfo.phoneNumber.action", {})}
                          key={val.id}
                          isEditable
                          value={val}
                          firstValue={state.phoneNumbers[0]}
                          {...{
                            // indexOfRadio: state.indexOfRadio,
                            index,
                            clickPhone,
                            clickTrash,
                            optionHandling,
                          }}
                          isRemove={index > 0}
                          isLast={index === state.phoneNumbers.length - 1}
                          // clickRadio={(ind) => setState(s => ({...s, indexOfRadio: ind }))}
                          name={`employerInfo.phoneNumbers`}
                          label={t("phone_number") ?? "phone number"}
                        />
                      ))}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Collapse>
            <Employments
              {...{
                employmentData: get(employeeData, "result.data.employments", []),
                editable,
              }}
            />
            <Identification {...{ editable }} />
            <Education
              {...{
                educations: get(employeeData, "result.data.educations", {}),
                editable,
                deleteEducation,
              }}
            />
            <Experiment {...{ editable, deleteExperiment }} />
            <Skills
              {...{
                editable,
                skills: get(employeeData, "result.data.skill", {}),
                options: state.skillsOptions,
                optionHandling,
                deleteEducation,
              }}
            />
            <Attachments
              {...{
                attachments,
                setFiles: setAttachments,
                editable,
              }}
            />
            <AccountInformation
              {...{
                accountInfo: get(employeeData, "result.data.accountInfo", {}),
                editable,
              }}
            />
          </FormDemo>
        </Col>
      </Row>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    entities: get(state, "normalizer.entities", {}),
    skillsList: get(state, "normalizer.data.skills-list", {}),
    employeeData: get(state, "api.hr-employee.data", {}),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSkillsList: () => {
      const storeName = "skills-list";
      const entityName = "skills-list";
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: "staff/v1/skill/get-all",
          config: {
            params: {},
          },
          scheme: { data: [SkillsScheme] },
          storeName: storeName,
          entityName: entityName,
        },
      });
    },
    getDataOfEmployee: () => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          url: "staff/v1/employee/get",
          method: "get",
          storeName: "hr-employee",
        },
      });
    },
    fileUpload: ({ attributes, formMethods = {}, cb }) => {
      dispatch({
        type: SettingsActions.FILE_UPLOAD.REQUEST,
        payload: { attributes, formMethods, cb },
      });
    },
    addItemRequest: ({ attributes, formMethods, cb, ...other }) => {
      dispatch({
        type: ApiActions.OPERATION_ADD.REQUEST,
        payload: {
          attributes,
          formMethods,
          cb,
          url: "staff/v1/employee/add",
          ...other,
        },
      });
    },
    createOption: ({ attributes, formMethods, cb, url }) => {
      dispatch({
        type: ApiActions.OPERATION_ADD.REQUEST,
        payload: {
          attributes,
          formMethods,
          cb,
          url,
        },
      });
    },
  };
};

export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(memo(CreateContainer)));
