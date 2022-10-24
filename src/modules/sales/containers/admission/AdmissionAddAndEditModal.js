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
import NormalizeActions from "../../../../services/normalizer/actions";
import { Style } from "./Style";
import { getSelectOptionsListFromListData } from "../../../../utils";

const AdmissionAddAndEditModal = ({
  getFormData,
  formData,
  t,
  getFormPrice,
  formPrice,
  addItemRequest,
  reRender = () => "",
  setTemp,
}) => {
  const [spacialPrice, setSpecialPrice] = useState(false);
  const [specializationIdAndGroupId, setSpecializationIdAndGroupId] = useState({});
  const [state, setState] = useState({
    activeModal: false,
  });

  useEffect(() => {
    getFormData();
  }, []);

  useEffect(() => {
    if (!state.activeModal) {
      setTemp({ item: null, storeName: "admission-form-price" });
    }
  }, [state.activeModal]);

  let BranchList = get(formData, "result.data.branch.options", []);
  let GroupList = get(formData, "result.data.groupType.options", []);
  let specialization = get(formData, "result.data.specialization.options", []);
  let weeks = get(formData, "result.data.weekdays.options", []);

  BranchList = isEmpty(BranchList) ? [] : BranchList;
  GroupList = isEmpty(GroupList) ? [] : GroupList;
  specialization = isEmpty(specialization) ? [] : specialization;
  weeks = isEmpty(weeks) ? [] : getSelectOptionsListFromListData(weeks);

  const getValueFromField = (data, name) => {
    if (includes(["specializationId", "groupTypeId", "branchId"], name)) {
      if (data) {
        if (isEqual(name, "specializationId")) {
          setSpecializationIdAndGroupId((s) => ({
            ...s,
            specializationId: data,
          }));
          if (data && specializationIdAndGroupId.branchId && specializationIdAndGroupId.groupTypeId) {
            getFormPrice(data, get(specializationIdAndGroupId, "groupTypeId", ""), specializationIdAndGroupId.branchId);
          }
        }

        if (isEqual(name, "groupTypeId")) {
          setSpecializationIdAndGroupId((s) => ({
            ...s,
            groupTypeId: data,
          }));
          if (specializationIdAndGroupId.specializationId && data && specializationIdAndGroupId.branchId) {
            getFormPrice(get(specializationIdAndGroupId, "specializationId", ""), data, specializationIdAndGroupId.branchId);
          }
        }
        if (isEqual(name, "branchId")) {
          setSpecializationIdAndGroupId((s) => ({
            ...s,
            branchId: data,
          }));
          if (specializationIdAndGroupId.specializationId && specializationIdAndGroupId.groupTypeId && data) {
            getFormPrice(
              get(specializationIdAndGroupId, "specializationId", ""),
              get(specializationIdAndGroupId, "groupTypeId", ""),
              data
            );
          }
        }
      }
    }
  };

  const submitHandling = ({ data, setError }) => {
    setState((s) => ({ ...s, activeModal: false }));
    addItemRequest({
      attributes: data,
      formMethods: {
        setError,
      },
      cb: {
        success: ({ message = "SUCCESS", ...res }) => {
          toast.success(message);
          reRender();
        },
        fail: (res) => {},
      },
    });
  };

  let temp = {};
  if (!state.activeModal)
    temp.resetData = {
      endTime: "",
      startTime: "",
      maximumNumberOfPaidStudents: "",
      lessonEndTime: "",
      lessonStartTime: "",
      weekdays: "",
      specializationPrice: "",
      specialPricing: "",
      specializationId: "",
      groupTypeId: "",
      branchId: "",
    };
  return (
    <Style>
      <Button className={"create-new"} success={"1"} onCLick={() => setState((s) => ({ ...s, activeModal: true }))}>
        {t("create_new") ?? "Create new"}
      </Button>

      <Modal active={state.activeModal}>
        <FormDemo
          {...temp}
          formRequest={submitHandling}
          getValueFromField={getValueFromField}
          footer={
            <div className={"footer"}>
              <Button
                className={"cancel"}
                outlineDanger={"1"}
                onCLick={() =>
                  setState((s) => ({
                    ...s,
                    activeModal: false,
                  }))
                }
              >
                {t("cancel") ?? "Cancel"}
              </Button>
              <Button type={"submit"} className={"save"} success={"1"}>
                {t("save") ?? "Save"}
              </Button>
            </div>
          }
        >
          <div className="title">{t("ADD-RECEPTIONS") ?? "ADD RECEPTIONS"}</div>

          <Row className={"body"}>
            <Col xs={6}>
              <Field
                type="custom-select"
                name="branchId"
                options={BranchList}
                placeholder={`${t("select") ?? "Select"}...`}
                params={{ required: true }}
                label={t("SELECT-FILIAL") ?? "SELECT FILIAL"}
                defaultValue={state.activeModal ? "" : " "}
                labelRequired
                valueKey={"id"}
                labelKey={"name"}
              />
            </Col>
            <Col xs={6}>
              <Field
                type="custom-select"
                name="groupTypeId"
                options={GroupList}
                placeholder={`${t("select") ?? "Select"}...`}
                params={{ required: true }}
                label={t("SELECT-GROUP-TYPE") ?? "SELECT GROUP TYPE"}
                labelRequired
                valueKey={"id"}
                labelKey={"name"}
                defaultValue={state.activeModal ? "" : " "}
              />
            </Col>
            <Col xs={6}>
              <Field
                type="custom-select"
                name="specializationId"
                options={specialization}
                placeholder={`${t("select") ?? "Select"}...`}
                params={{ required: true }}
                label={t("SPECIALIZATION") ?? "SPECIALIZATION"}
                labelRequired
                valueKey={"id"}
                labelKey={"name"}
                defaultValue={state.activeModal ? "" : " "}
              />
            </Col>
            <Col xs={6} />
            <Col xs={6}>
              <Field
                type="checkbox"
                name="specialPricing"
                placeholder={`${t("select") ?? "Select"}...`}
                label={t("Special-pricing") ?? "Special pricing"}
                onChange={(value) => setSpecialPrice(value)}
                defaultValue={state.activeModal ? "" : false}
              />
            </Col>
            <Col xs={6} />
            <Col xs={6}>
              <Field
                type="input"
                name="specializationPrice"
                placeholder= {`${t("enter_price") ?? "Enter price"}...`}
                property={{
                  type: "number",
                }}
                label={t("SPECIALIZATION-PRICE") ?? "SPECIALIZATION-PRICE"}
                defaultValue={state.activeModal ? `${formPrice}` : ""}
                disabled={!spacialPrice}
              />
            </Col>
            <Col xs={6}>
              <Field
                type="custom-select"
                name="weekdays"
                options={weeks}
                placeholder={`${t("select") ?? "Select"}...`}
                params={{ required: true }}
                label={t("SELECT-DAYS-OF-THE-WEEK") ?? "SELECT DAYS OF THE WEEK"}
                isMulti
                labelRequired
                defaultValue={state.activeModal ? "" : null}
              />
            </Col>
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
                defaultValue={state.activeModal ? null : ""}
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
                defaultValue={state.activeModal ? null : ""}
              />
            </Col>
            <Col xs={6}>
              <Field
                type="input"
                name="maximumNumberOfPaidStudents"
                placeholder= {`${t("enter_number") ?? "Enter number"}...`}
                property={{
                  type: "number",
                }}
                label={t("MAXIMUM-NUMBER-OF-STUDENTS-WHO-CAN-PAY") ?? "MAXIMUM NUMBER OF STUDENTS WHO CAN PAY"}
                params={{ required: true }}
                labelRequired
                defaultValue={state.activeModal ? "" : ""}
              />
            </Col>
            <Col xs={6} />
            <Col xs={6}>
              <Field
                type="custom-datepicker"
                name="startTime"
                params={{ required: true }}
                label={t("SELECT-THE-START-TIME-OF-THE-RECEPTION") ?? "SELECT THE START TIME OF THE RECEPTION"}
                labelRequired
                property={{
                  format: "yyyy-MM-dd",
                  placeholder: "dd - MM - yyyy",
                }}
                defaultValue={state.activeModal ? "" : null}
              />
            </Col>
            <Col xs={6}>
              <Field
                type="custom-datepicker"
                name="endTime"
                params={{ required: true }}
                label={t("SELECT-THE-START-TIME-OF-THE-RECEPTION") ?? "SELECT THE START TIME OF THE RECEPTION"}
                labelRequired
                property={{
                  format: "yyyy-MM-dd",
                  placeholder: "dd - MM - yyyy",
                }}
                defaultValue={state.activeModal ? "" : null}
              />
            </Col>
          </Row>
        </FormDemo>
      </Modal>
    </Style>
  );
};

const mapStateToProps = (state, ownProp) => {
  return {
    formData: get(state, "api.admission-form-data.data", {}),
    formPrice: get(state, "api.admission-form-price.data.result.data", 0),
    viewDataList: get(state, `normalizer.data.${get(ownProp, "entityName", "")}-view-data-list`, 0),
    entities: get(state, "normalizer.entities", {}),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getFormData: () => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          url: `education/v1/admission/form`,
          method: "get",
          storeName: "admission-form-data",
        },
      });
    },
    getFormPrice: (specializationId, groupTypeId, branchId) => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          url: `education/v1/specialization-price/price-by-group-type-id-and-spec-id?specializationId=${specializationId}&groupTypeId=${groupTypeId}&branchId=${branchId}`,
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
          url: `education/v1/admission`,
        },
      });
    },
    changeRequest: ({ data, entities, infinite = false }) => {
      const storeName = `${ownProps.entityName}-view-data-list`;
      const entityName = ownProps.entityName;
      const scheme = ownProps.scheme;
      dispatch({
        type: NormalizeActions.NORMALIZE.SUCCESS,
        payload: {
          entities,
          result: data,
          storeName,
          entityName,
          infinite,
        },
      });
    },
    setTemp: ({ item, storeName }) => {
      dispatch({ type: ApiActions.TEMP_DATA.REQUEST, payload: { item, storeName } });
    },
  };
};

export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(AdmissionAddAndEditModal));
