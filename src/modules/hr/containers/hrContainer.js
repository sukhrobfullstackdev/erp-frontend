import React, { useCallback, useEffect, useMemo, useState } from "react";
import { get, includes, isArray, isEmpty, isNil } from "lodash";
import { useHistory, useRouteMatch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import FormDemo from "../../../containers/Form/form-demo";
import AboutEmployee from "./hr/aboutEmployee";
import Employments from "./hr/employments";
import Identification from "./hr/identification";
import Education from "./hr/education";
import AccountInformation from "./hr/accountInformation";
import Experiment from "./hr/experiment";
import Skills from "./hr/skills";
import Attachments from "./hr/attachments";
import ApiActions from "../../../services/api/actions";
import { InitialLoader } from "../../../components/loader";
import Button from "../../../components/elements/button";
import SettingsActions from "../../settings/actions";
import { getSelectOptionsListFromData } from "utils";

const HrContainer = ({
  getFormData,
  employeeData,
  getPhoto,
  getPhoneId,
  updateItemRequest,
  match,
  history,
  fileUpload,
  ...props
}) => {
  const [indexOfRadio, setIndexOfRadio] = useState(0);
  const [avatarId, setAvatarId] = useState("");
  const [editable, setEditable] = useState(null);
  const [loader, setLoader] = useState(false);
  const [attachment, setAttachmen] = useState([]);
  const [state, setState] = useState({
    phoneNumberTypes: [],
  });
  const id = match.params.id;

  useEffect(() => {
    let options = get(employeeData, "result.data.employerInfo.phoneNumber.options", []);
    if (!isEmpty(options)) {
      options = getSelectOptionsListFromData(options, "id", "name");
      setState((s) => ({ ...s, phoneNumberTypes: options }));
    }
  }, [employeeData]);

  const optionHandling = ({ options, name }) => {
    options = getSelectOptionsListFromData(options, "id", "name");
    if (name === "skill.skillsIdList") setState((s) => ({ ...s, skillsOptions: options }));
    else setState((s) => ({ ...s, phoneNumberTypes: options }));
  };

  const uploadFile = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return fileUpload({
      attributes: formData,
      formMethods: { setLoading: () => {} },
      cb: {
        success: ({ id }) => {
          setAvatarId(id);
        },
      },
    });
  };

  useEffect(() => {
    if (!isNil(editable)) getFormData(id);
  }, [editable]);

  useEffect(() => {
    setEditable(includes(match.url, "edit"));
  }, [match]);

  const update = ({ data, setError }) => {
    console.log(data);
    if (editable) {
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

      const roleList = get(employeeData, "result.data.accountInfo.role.options", []);
      let phoneNumbers = data?.employerInfo?.phoneNumbers?.phoneNumber;
      let phoneNumberTypes = data?.employerInfo?.phoneNumbers?.phoneNumberTypeId;
      let checkboxId = data?.employerInfo?.main;
      let phoneNumbersTemp = [];
      console.log(isArray(phoneNumbers), data?.employerInfo?.phoneNumbers);
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
      data.employerInfo.photoId = avatarId ? avatarId : get(employeeData, "employerInfo.photo.id");

      let temp = [];

      Object.keys(data.accountInfo.roles).forEach((val, index) => {
        if (data.accountInfo.roles[val]) temp.push(roleList[index].id);
      });
      data.accountInfo.roles = temp;
      const attachmentsData = attachment;

      data.attachments = [...attachmentsData];

      setLoader(true);

      updateItemRequest(
        {
          attributes: data,
          formMethods: { setError },
          cb: {
            success: (res) => {
              setLoader(false);
              history.push(`/hrm/company/employee/${id}`);
            },
            fail: (res) => {
              setLoader(false);
            },
          },
        },
        id
      );
    } else {
      history.push(`/hrm/company/employee/edit/${id}`);
      setEditable((s) => !s);
    }
  };

  // if (!get(employeeData,"isFetched", true) || loader) return <InitialLoader />;
  return (
    <FormDemo
      formRequest={update}
      footer={
        <Button className="submitBtn" success type={"submit"}>
          {editable ? "Save" : "Edit"}
        </Button>
      }
    >
      {(!get(employeeData, "isFetched", true) || loader) && <InitialLoader />}
      <AboutEmployee
        {...{
          employerInfo: get(employeeData, "result.data.employerInfo", {}),
          editable,
          setIndexOfRadio,
          uploadFile,
          optionHandling,
          phoneNumberOptions: state.phoneNumberTypes,
        }}
      />
      <Employments
        {...{
          employmentData: get(employeeData, "result.data.employments", []),
          editable,
        }}
      />
      <Identification
        {...{
          passportInfo: get(employeeData, "result.data.passportInfo", {}),
          editable,
        }}
      />
      <Education
        {...{
          educations: get(employeeData, "result.data.educations", {}),
          editable,
        }}
      />
      <Experiment
        {...{
          experiment: get(employeeData, "result.data.experiences", {}),
          editable,
        }}
      />
      <Skills
        {...{
          skills: get(employeeData, "result.data.skill", {}),
          editable,
        }}
      />
      <Attachments
        {...{
          attachments: get(employeeData, "result.data.attachments", []),
          editable,
          setFiles: setAttachmen,
        }}
      />
      <AccountInformation
        {...{
          accountInfo: get(employeeData, "result.data.accountInfo", {}),
          editable,
        }}
      />
    </FormDemo>
  );
};
const mapStateToProps = (state) => {
  return {
    employeeData: get(state, "api.hr-employee-form-data.data", {}),
    getPhoneId: get(state, "api.hr-employee-info-photo.data", {}),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFormData: (id) => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          url: `staff/v1/employee/get/${id}`,
          method: "get",
          storeName: "hr-employee-form-data",
        },
      });
    },
    fileUpload: ({ attributes, formMethods = {}, cb }) => {
      dispatch({
        type: SettingsActions.FILE_UPLOAD.REQUEST,
        payload: { attributes, formMethods, cb },
      });
    },
    updateItemRequest: ({ attributes, formMethods, cb }, id) => {
      dispatch({
        type: ApiActions.OPERATION_UPDATE.REQUEST,
        payload: {
          attributes,
          formMethods,
          cb,
          url: `staff/v1/employee/edit/${id}`,
        },
      });
    },
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HrContainer));
