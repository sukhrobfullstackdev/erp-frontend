import React, { useEffect, useState } from "react";
import { Col, Row } from "react-grid-system";
import { connect } from "react-redux";
import { get, includes, isEmpty, isEqual } from "lodash";
import { toast } from "react-toastify";
import { withTranslation } from "react-i18next";
import Field from "../../../../containers/Form/field";
import FormDemo from "../../../../containers/Form/form-demo";
import Modal from "../../../../components/elements/modal";
import ApiActions from "../../../../services/api/actions";

import Button from "../../../../components/elements/button";
import { Style } from "containers/DataGrid/components/view-header/Styles/view-header-create-btn";
import { getSelectOptionsListFromListData } from "../../../../utils";

const GroupAddAndEditModal = ({ getFormData, formData, t, addItemRequest, reRender = () => "" }) => {
  const [selectedAdmission, setSelectedAdmission] = useState();
  const [branch, setBranch] = useState();
  const [state, setState] = useState({ activeModal: false });

  useEffect(() => {
    getFormData();
  }, []);

  let branches = get(formData, "result.data.branch.options", []);
  let groups = get(formData, "result.data.groupType.options", []);
  let specializations = get(formData, "result.data.specialization.options", []);
  let weekdays = get(formData, "result.data.weekday.options", []);
  let mentors = get(formData, "result.data.mentor.options", []);
  let admissions = get(formData, "result.data.admission.options", []);
  let rooms = get(branch, "rooms", []);

  branches = isEmpty(branches) ? [] : branches;
  groups = isEmpty(groups) ? [] : groups;
  specializations = isEmpty(specializations) ? [] : specializations;
  weekdays = isEmpty(weekdays) ? [] : getSelectOptionsListFromListData(weekdays);
  mentors = isEmpty(mentors) ? [] : mentors;
  admissions = isEmpty(admissions) ? [] : admissions;
  rooms = isEmpty(rooms) ? [] : rooms;

  const getValueFromField = (data, name) => {
    if (includes(["admissionId", "branchId"], name)) {
      if (isEqual(name, "admissionId")) {
        setSelectedAdmission(admissions.find((item) => isEqual(get(item, "id"), data)));
      } else if (isEqual(name, "branchId")) {
        setBranch(branches.find((item) => isEqual(get(item, "id"), data)));
        getFormData(data);
      }
    }
  };

  const closeModal = () => setState((s) => ({ ...s, activeModal: false }));

  const submitHandling = ({ data, setError }) => {
    addItemRequest({
      attributes: data,
      formMethods: {
        setError,
      },
      cb: {
        success: ({ message = "SUCCESS", ...res }) => {
          toast.success(message);
          closeModal();
          reRender();
        },
        fail: (e) => "",
      },
    });
  };

  return (
    <Style>
      <Button className={"create-new"} success={"1"} onCLick={() => setState((s) => ({ ...s, activeModal: true }))}>
        {t("create_new") ?? "Create new"}
      </Button>
      <Modal active={state.activeModal}>
        <FormDemo
          formRequest={submitHandling}
          getValueFromField={getValueFromField}
          footer={
            <div className={"footer"}>
              <Button className={"cancel"} outlineDanger={"1"} onCLick={closeModal}>
                {t("cancel") ?? "Cancel"}
              </Button>
              <Button type={"submit"} className={"save"} success={"1"}>
                {t("save") ?? "Save"}
              </Button>
            </div>
          }
        >
          <div className="title">{t("ADD-A-GROUP") ?? "ADD A GROUP"}</div>
          <Row>
            <Col xs={6}>
              <Field
                type="custom-select"
                name="branchId"
                options={branches}
                placeholder="Select..."
                params={{ required: true }}
                label={t("SELECT-FILIAL") ?? "SELECT FILIAL"}
                labelRequired
                nullable={false}
                valueKey={"id"}
                labelKey={"name"}
                defaultValue={!state.activeModal && " "}
                isChangeDefaultValue={false}
              />
            </Col>
            <Col xs={6}>
              <Field
                type="custom-select"
                name="admissionId"
                options={admissions}
                placeholder="Select..."
                label={t("SELECT-RECEPTION") ?? "SELECT RECEPTION"}
                nullable
                valueKey={"id"}
                labelKey={"name"}
                defaultValue={!state.activeModal && " "}
              />
            </Col>
            <Col xs={6}>
              <Field
                type="custom-select"
                name="specializationId"
                options={specializations}
                placeholder={`${t("select_placeholder") ?? "Select"}...`}
                params={{ required: true }}
                label={t("SPECIALIZATION") ?? "SPECIALIZATION"}
                labelRequired
                defaultValue={get(selectedAdmission, "specializationId", " ")}
                disabled={!!selectedAdmission}
                valueKey={"id"}
                labelKey={"name"}
              />
            </Col>
            <Col xs={6}>
              <Field
                type="custom-select"
                name="groupTypeId"
                options={groups}
                placeholder={`${t("select_placeholder") ?? "Select"}...`}
                params={{ required: true }}
                label={t("ENTER-GROUP-TYPE") ?? "ENTER GROUP TYPE"}
                defaultValue={get(selectedAdmission, "groupTypeId", " ")}
                labelRequired
                disabled={!!selectedAdmission}
                valueKey={"id"}
                labelKey={"name"}
              />
            </Col>
            <Col xs={6}>
              <Field
                type="input"
                name="name"
                placeholder={`${t("type_here_placeholder") ?? "Type here"}...`}
                params={{ required: true }}
                label={t("ENTER-A-GROUP-NAME") ?? "ENTER A GROUP NAME"}
                labelRequired
                defaultValue={!state.activeModal && ""}
              />
            </Col>
            <Col xs={6}>
              <Field
                type="custom-select"
                name="mentorId"
                options={mentors}
                placeholder="Select..."
                label={t("CHOOSE-A-TEACHER") ?? "CHOOSE A TEACHER"}
                valueKey={"id"}
                labelKey={"fullName"}
                defaultValue={!state.activeModal && " "}
              />
            </Col>
            <Col xs={6}>
              <Field
                type="custom-select"
                name="weekdays"
                options={weekdays}
                placeholder={`${t("select_placeholder") ?? "Select"}...`}
                params={{ required: true }}
                label={t("SELECT-DAYS-OF-THE-WEEK") ?? "SELECT DAYS OF THE WEEK"}
                defaultValue={get(selectedAdmission, "weekdays", null)}
                labelRequired
                isMulti
              />
            </Col>
            <Col xs={6}>
              <Field
                type="input"
                name="maximumNumberOfStudents"
                property={{
                  placeholder: "Enter count...",
                  type: "number",
                }}
                label={t("MAX-STUDENT-COUNT") ?? "MAX STUDENT COUNT"}
                params={{ required: true }}
                labelRequired
                defaultValue={!state.activeModal && ""}
              />
            </Col>
            <Col xs={6}>
              <Field
                type="custom-select"
                name="roomId"
                options={rooms}
                placeholder={`${t("select_placeholder") ?? "Select"}...`}
                label={t("SELECT_ROOM") ?? "SELECT ROOM"}
                valueKey={"id"}
                labelKey={"name"}
                defaultValue={!state.activeModal && " "}
              />
            </Col>
            <Col xs={6} />
            <Col xs={6}>
              <Field
                type="checkbox"
                name="infiniteVideoWatching"
                placeholder={`${t("select_placeholder") ?? "Select"}...`}
                label={t("Watch-a-video-when-the-group-ends") ?? "Watch a video when the group ends"}
                defaultValue={!state.activeModal && false}
                // onChange={(value) => setSpecialPrice(value)}
              />
            </Col>
            <Col xs={6} />
            <Col xs={6}>
              <Field
                className={"clock"}
                type="clock"
                name="lessonStartTime"
                params={{ required: true }}
                label={t("CHOOSE-A-LESSON-START-TIME") ?? "CHOOSE A LESSON START TIME"}
                labelRequired
                property={{
                  format: "HH:mm",
                  placeholder: "HH : mm",
                }}
                defaultValue={get(selectedAdmission, "lessonStartTime", new Date().getTime())}
                disable={!!selectedAdmission}
              />
            </Col>
            <Col xs={6}>
              <Field
                className={"clock"}
                type="clock"
                name="lessonEndTime"
                params={{ required: true }}
                label={t("SELECT-THE-END-OF-THE-LESSON") ?? "SELECT THE END OF THE LESSON"}
                labelRequired
                property={{
                  format: "HH:mm",
                  placeholder: "HH : mm",
                }}
                defaultValue={get(selectedAdmission, "lessonEndTime", new Date().getTime())}
                disable={!!selectedAdmission}
              />
            </Col>

            <Col xs={6} className={"mt-30"}>
              <Field
                type="custom-datepicker2"
                name="estimatedStartTime"
                params={{ required: true }}
                label={t("SELECT-THE-START-TIME-OF-THE-RECEPTION") ?? "SELECT THE START TIME OF THE RECEPTION"}
                labelRequired
                property={{
                  format: "yyyy-MM-dd",
                  placeholder: "yyyy - MM - dd",
                }}
                // defaultValue={!state.activeModal ? "" : null}
              />
            </Col>
          </Row>
        </FormDemo>
      </Modal>
    </Style>
  );
};

const mapStateToProps = (state) => {
  return {
    formData: get(state, "api.group-form-data.data", {}),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFormData: (branchId = "") => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          url: `education/v1/group/form?branchId=${branchId}`,
          method: "get",
          storeName: "group-form-data",
          cb: {
            success: (res) => "",
            fail: (e) => "",
          },
        },
      });
    },
    getFormPrice: (specializationId, groupTypeId) => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          url: `education/v1/specialization-price/price-by-group-type-id-and-spec-id?specializationId=${specializationId}&groupTypeId=${groupTypeId}`,
          method: "get",
          storeName: "admission-form-price",
        },
      });
    },
    addItemRequest: ({ attributes, formMethods, cb }) => {
      dispatch({
        type: ApiActions.OPERATION_ADD.REQUEST,
        payload: {
          attributes,
          formMethods,
          cb,
          url: `education/v1/group`,
        },
      });
    },
  };
};

export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(GroupAddAndEditModal));
