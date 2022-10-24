import { get, head, isArray, isEmpty, isNil } from "lodash";
import React, { memo, useEffect, useMemo, useState } from "react";
import { withTranslation } from "react-i18next";
import { Col, Row } from "react-grid-system";
import Collapse from "../../../../components/elements/collapse";
import Field from "../../../../containers/Form/field";
import AddButton from "../../components/addButton";
import TrashIcon from "./../../../../assets/icons/trash-icon.svg";
import Button from "../../../../components/elements/button";
import EmploymentsTimeTable from "../../components/employmentsTimeTable";
import { StyledEmploymentInformation } from "./style/employmentsStyle";

const MiniContainer = ({ departmentList, positionsList, department, editable, index, position, t }) => {
  const [departmentId, setDepartmentId] = useState(null);

  if (departmentId) positionsList = positionsList.filter((item) => get(item, "departmentId", "") === departmentId);

  return (
    <>
      <Col md={2}>
        <Field
          type={"custom-select"}
          className="mb-40"
          name={`employments[${index}].departmentId`}
          placeholder="-"
          options={departmentList}
          defaultValue={isEmpty(get(department, "values", [])) ? departmentId : get(department, "values", [])}
          label={t("employee-department-label") ?? "Select a SECTION"}
          labelRequired
          params={{ required: editable }}
          editable={editable}
          isSearchable={editable}
          onChange={setDepartmentId}
          defaultHideAnimation={false}
          valueKey={"id"}
          labelKey={"name"}
        />
      </Col>
      <Col md={2}>
        <Field
          type={"custom-select"}
          className="mb-40"
          name={`employments[${index}].positionId`}
          placeholder="-"
          options={positionsList}
          defaultValue={get(position, "values", [])}
          label={t("employee-position-label") ?? "Select a POSITION"}
          labelRequired
          params={{ required: editable }}
          editable={editable}
          isSearchable={editable}
          defaultHideAnimation={false}
          valueKey={"id"}
          labelKey={"name"}
        />
      </Col>
    </>
  );
};

const Employments = ({ employmentData = [], addBtn = true, active = "1", clickAdd, editable = false, t, ...props }) => {
  const [employments, setEmployments] = useState(employmentData);

  useEffect(() => {
    if (!isEmpty(employmentData)) setEmployments(employmentData);
  }, [employmentData]);

  const branchList = useMemo(() => get(head(employmentData), "branch.options", []), [employmentData]);
  const categoryList = useMemo(() => get(head(employmentData), "employeeCategory.options", []), [employmentData]);
  const employeeWorkDayList = useMemo(() => get(head(employmentData), "employeeWorkDayList", []), [employmentData]);
  const departmentList = useMemo(() => get(head(employmentData), "department.options", []), [employmentData]);
  let positionsList = useMemo(() => get(head(employmentData), "position.options", []), [employmentData]);
  const employeeModeList = useMemo(() => get(head(employmentData), "employeeMode.options", []), [employmentData]);
  const paymentCriteriaTypeList = useMemo(() => get(head(employmentData), "paymentCriteriaType.options", []), [employmentData]);
  const contractFormList = useMemo(() => get(head(employmentData), "contractForm.options", []), [employmentData]);

  return (
    <StyledEmploymentInformation>
      <Collapse
        title={t("employee-employments-collapse-title") ?? "Ish bilan bandlik haqida ma’lumot"}
        active={active}
        className="secondCollapse"
      >
        {isArray(employments) &&
          employments.map(
            (
              {
                branch,
                department,
                position,
                employeeCategory,
                contractForm,
                employeeMode,
                employeeWorkDayList,
                paymentCriteriaType,
                hireDate,
                manageTimeSheet,
              },
              index
            ) => (
              <div className="content" key={index + new Date().getTime() * 2}>
                {editable && employments.length > 1 && (
                  <div className="deleteBtn">
                    <Button
                      outlineDanger
                      onClick={() => {
                        setEmployments((s) => s.filter((item, ind) => ind !== index));
                      }}
                    >
                      <img src={TrashIcon} alt="trash" />
                      Delete
                    </Button>
                  </div>
                )}
                <Row className="input">
                  <Col md={2}>
                    <Field
                      type={"custom-select"}
                      className="mb-40"
                      name={`employments[${index}].branchId`}
                      placeholder="-"
                      options={branchList}
                      defaultValue={get(branch, "values", [])}
                      label={t("employee-branch-label") ?? "Select a branch"}
                      labelRequired
                      params={{ required: editable }}
                      editable={editable}
                      isSearchable={editable}
                      defaultHideAnimation={false}
                      valueKey={"id"}
                      labelKey={"name"}
                    />
                  </Col>
                  <MiniContainer
                    {...{
                      departmentList,
                      positionsList,
                      department,
                      editable,
                      index,
                      position,
                      t,
                    }}
                  />
                  <Col md={2}>
                    <Field
                      type={"custom-select"}
                      className="mb-40"
                      name={`employments[${index}].employeeCategoryId`}
                      placeholder="-"
                      options={categoryList}
                      defaultValue={get(employeeCategory, "values", [])}
                      label={t("employee-category-label") ?? "Select a CATEGORY"}
                      labelRequired
                      params={{ required: editable }}
                      editable={editable}
                      isSearchable={editable}
                      defaultHideAnimation={false}
                      valueKey={"id"}
                      labelKey={"employeeCategoryTypeName"}
                    />
                  </Col>
                  <Col md={2}>
                    <Field
                      type={"custom-select"}
                      className="mb-40"
                      name={`employments[${index}].paymentCriteriaType`}
                      placeholder="-"
                      options={paymentCriteriaTypeList}
                      defaultValue={get(paymentCriteriaType, "values", [])}
                      label={t("employee-paymentCriteriaType-label") ?? "PERFORMANCE CRITERIA"}
                      labelRequired
                      params={{ required: editable }}
                      editable={editable}
                      isSearchable={editable}
                      defaultHideAnimation={false}
                      valueKey={"id"}
                      labelKey={"name"}
                    />
                  </Col>
                  <Col md={2}>
                    <Field
                      type={"custom-select"}
                      className="mb-40"
                      name={`employments[${index}].contractForm`}
                      placeholder="-"
                      options={contractFormList}
                      defaultValue={get(contractForm, "values", [])}
                      label={t("employee-contractForm-lable") ?? "CONTRACT FORM ( BASIC / C... )"}
                      labelRequired
                      params={{ required: editable }}
                      editable={editable}
                      isSearchable={editable}
                      defaultHideAnimation={false}
                      valueKey={"id"}
                      labelKey={"name"}
                    />
                  </Col>
                  <Col md={2}>
                    <Field
                      type={"custom-select"}
                      className="mb-40"
                      options={employeeModeList}
                      placeholder="-"
                      name={`employments[${index}].employeeMode`}
                      defaultValue={get(employeeMode, "values", "")}
                      label={t("employee-mode-label") ?? "Select a EmployeeMode"}
                      labelRequired
                      params={{ required: editable }}
                      editable={editable}
                      isSearchable={editable}
                      defaultHideAnimation={false}
                      valueKey={"id"}
                      labelKey={"name"}
                    />
                  </Col>
                  <Col md={2}>
                    <Field
                      type={"custom-datepicker"}
                      className="mb-40"
                      name={`employments[${index}].hireDate`}
                      label={t("employee-hireDate-label") ?? "DATE OF EMPLOYMENT"}
                      labelRequired
                      defaultValue={hireDate}
                      property={{
                        format: "dd / MM / yyyy",
                        placeholder: "dd / MM / yyyy",
                      }}
                      params={{ required: editable }}
                      editable={editable}
                    />
                  </Col>
                  <Col md={2}>
                    <Field
                      className="check_btn"
                      type={"checkbox"}
                      name={`employments[${index}].manageTimeSheet`}
                      inBtn={true}
                      label={t("employee-manageTime-label") ?? "Manage tabel"}
                      disabled={!editable}
                      defaultValue={manageTimeSheet}
                    />
                  </Col>
                </Row>
                <div className="dashed">
                  <EmploymentsTimeTable
                    {...{
                      employeeWorkDayList,
                      index,
                      editable,
                    }}
                  />
                </div>
              </div>
            )
          )}
        {addBtn && editable && (
          <AddButton className="task_list" onClick={() => (isNil(clickAdd) ? setEmployments((s) => [...s, s[0]]) : clickAdd())} />
        )}
      </Collapse>
    </StyledEmploymentInformation>
  );
};

export default withTranslation("pdp")(memo(Employments));
