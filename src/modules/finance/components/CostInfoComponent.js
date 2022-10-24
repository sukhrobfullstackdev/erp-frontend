import React, { memo, useMemo, useState } from "react";
import { get, head, isArray } from "lodash";
import { withTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import Title from "../../../components/elements/title";
import Button from "../../../components/elements/button";
import Field from "../../../containers/Form/field";
import ReviewComponent from "./reviewComponent";
import CancelComponent from "./cancelComponent";
import AcceptComponent from "./acceptComponent";
import { formatDate, getSelectOptionsListFromData, getSelectOptionsListFromListData } from "../../../utils";
import DeleteComponent from "./deleteCompoent";

const CostInfoComponent = ({ data, isCreatePage, isEditPage, request, t, id, setData }) => {
  let createOrEdit = isCreatePage || isEditPage;
  const history = useHistory();
  const [state, setState] = useState({
    expensePropositionType: "ALL",
    groupTypeId: "",
  });

  let branchOption = useMemo(() => getSelectOptionsListFromData(get(data, "branch.options", []), "id", "name", "other"), [data]);
  let departmentOption = useMemo(
    () => getSelectOptionsListFromData(get(data, "department.options", []), "id", "name", "other"),
    [data]
  );
  let costTypeOption = useMemo(
    () => getSelectOptionsListFromData(get(data, "expensePropositionType.options", []), "id", "name", "other"),
    [data]
  );
  let durationOption = useMemo(
    () => getSelectOptionsListFromData(get(data, "duration.options", []), "id", "name", "other"),
    [data]
  );
  let currencyTypeOptions = useMemo(() => getSelectOptionsListFromListData(get(data, "currencyType.options", [])), [data]);
  let groupOptions = useMemo(() => getSelectOptionsListFromData(get(data, "group.options", []), "id", "name"), [data]);
  let groupTypeOptions = useMemo(() => getSelectOptionsListFromData(get(data, "groupType.options", []), "id", "name"), [data]);

  const getButtons = (type) => {
    if (type in data) {
      switch (type) {
        case "canAccept": {
          return (
            <AcceptComponent
              {...{
                request,
                id,
                setData,
                hasAccess: get(data, "canAccept", null),
              }}
            />
          );
        }
        case "canReview": {
          return (
            <ReviewComponent
              {...{
                request,
                hasAccess: get(data, "canReview", null),
              }}
            />
          );
        }
        case "canCancel": {
          return (
            <CancelComponent
              {...{
                request,
                hasAccess: get(data, "canCancel", null),
              }}
            />
          );
        }
        case "canEdit": {
          return (
            <Button
              className={"editBtn"}
              xs
              semiBold
              outline_success
              onCLick={() => history.push(`/finance/finance/expense-proposition-item/edit/${id}`)}
            >
              {t("edit") ?? "EDIT"}
            </Button>
          );
        }
        case "canDelete": {
          return <DeleteComponent {...{ request, id }} />;
        }
      }
    }
  };

  const getTitle = (values, options = []) => {
    let found = options.find((item) => get(item, "id", "") === head(values));
    return (
      <Title sm medium lHeight={21}>
        {get(found, "name", "")}
      </Title>
    );
  };

  const getTitleWithoutObj = (values, options = []) => {
    let found = options.find((item) => item === head(values));
    return (
      <Title sm medium lHeight={21}>
        {found}
      </Title>
    );
  };

  const getStatus = (status) => {
    return (
      isArray(status) &&
      status.map((item, index) => (
        <div key={get(item, "name", "") + index} style={{ background: get(item, "colorCode", "") }} className={"status_btn"}>
          {get(item, "name", "")}
        </div>
      ))
    );
  };

  const typeSelectHandling = (id, value) => {
    if (createOrEdit) {
      setState((s) => ({
        ...s,
        expensePropositionType: get(value, "expensePropositionTypeForward", ""),
      }));
    }
  };

  const getGroupOptions = useMemo(
    () => groupOptions.filter((item) => get(item, "groupTypeId", "") === get(state, "groupTypeId", null)),
    [state.groupTypeId]
  );

  const groupTypeChangeHandling = (id, item) => setState((s) => ({ ...s, groupTypeId: id }));

  const getValueFromOptions = (options, value) => {
    let res = options.find((item) => head(value) === get(item, "id", ""));
    if (res)
      return (
        <Title sm medium lHeight={21}>
          {get(res, "name", "")}
        </Title>
      );
  };

  return (
    <div className={`cost_info ${createOrEdit ? "editStyle" : ""}`}>
      <div className={"cost_info_header"}>
        <div className="cost_info_header_title">
          <Title lHeight={24} regular medium>
            INFO
          </Title>
        </div>
        <div className="cost_info_header_btns">
          {getButtons("canAccept")}
          {getButtons("canReview")}
          {getButtons("canCancel")}
          {!isEditPage && getButtons("canEdit")}
          {getButtons("canDelete")}
        </div>
      </div>
      <div className={"cost_info_body"}>
        <div className="list_row">
          <div className="left_row">
            <Title sm medium lHeight={21}>
              FILIAL
            </Title>
          </div>
          <div className="right_row">
            {createOrEdit ? (
              <Field
                hideLabel
                type={"custom-select"}
                name={"branchId"}
                options={branchOption}
                placeholder={"Select filial..."}
                defaultValue={get(data, "branch.values", "")}
              />
            ) : (
              getValueFromOptions(branchOption, get(data, "branch.values", []))
            )}
          </div>
        </div>

        <div className="list_row">
          <div className="left_row">
            <Title sm medium lHeight={21}>
              SECTION
            </Title>
          </div>
          <div className="right_row">
            {createOrEdit ? (
              <Field
                hideLabel
                type={"custom-select"}
                name={"departmentId"}
                options={departmentOption}
                placeholder={"Select section..."}
                defaultValue={get(data, "department.values", "")}
              />
            ) : (
              getValueFromOptions(departmentOption, get(data, "department.values", []))
            )}
          </div>
        </div>

        <div className="list_row">
          <div className="left_row">
            <Title sm medium lHeight={21}>
              FIO
            </Title>
          </div>
          <div className="right_row">
            {createOrEdit ? (
              <Field
                hideLabel
                disabled
                type={"input"}
                name={"fullName"}
                defaultValue={get(data, "fullName", "")}
                placeholder={"Enter name..."}
              />
            ) : (
              <Title sm medium lHeight={21}>
                {get(data, "fullName", "")}
              </Title>
            )}
          </div>
        </div>

        <div className="list_row">
          <div className="left_row">
            <Title sm medium lHeight={21}>
              EXPENSE PROPOSITION TYPE
            </Title>
          </div>
          <div className="right_row">
            {createOrEdit ? (
              <Field
                hideLabel
                type={"custom-select"}
                name={"expensePropositionTypeId"}
                options={costTypeOption}
                placeholder={"Select expense proposition type..."}
                defaultValue={get(data, "expensePropositionType.values", "")}
                onChange={typeSelectHandling}
              />
            ) : (
              getTitle(get(data, "expensePropositionType.values", []), get(data, "expensePropositionType.options", []))
            )}
          </div>
        </div>

        {!createOrEdit && (
          <div className="list_row">
            <div className="left_row">
              <Title sm medium lHeight={21}>
                COST DURATION
              </Title>
            </div>
            <div className="right_row">
              {createOrEdit ? (
                <Field
                  hideLabel
                  type={"custom-select"}
                  name={"select"}
                  options={durationOption}
                  placeholder={"Select month..."}
                  defaultValue={get(data, "duration.values", "")}
                />
              ) : (
                get(data, "duration.options", []).map((item, index) => (
                  <Title sm medium lHeight={21} key={get(item, "name", "")}>
                    {get(item, "name", "")}
                  </Title>
                ))
              )}
            </div>
          </div>
        )}
        <div className="list_row">
          <div className="left_row">
            <Title sm medium lHeight={21}>
              DEADLINE
            </Title>
          </div>
          <div className="right_row">
            {createOrEdit ? (
              <Field
                hideLabel
                type={"custom-datepicker"}
                name={"deadline"}
                placeholder={"Select date..."}
                defaultValue={get(data, "deadline", "")}
              />
            ) : (
              <Title sm medium lHeight={21}>
                {formatDate(new Date(get(data, "createdDate", new Date().getTime())), "dd / mm / yyyy")}
              </Title>
            )}
          </div>
        </div>

        {state.expensePropositionType === "STUDENT" && (
          <div className="list_row">
            <div className="left_row">
              <Title sm medium lHeight={21}>
                GROUP TYPE
              </Title>
            </div>
            <div className="right_row">
              <Field
                hideLabel
                type={"custom-select"}
                name={"groupTypeId"}
                options={groupTypeOptions}
                placeholder={"Select groupType..."}
                defaultValue={get(data, "groupType.values", "")}
                onChange={groupTypeChangeHandling}
              />
            </div>
          </div>
        )}

        {state.expensePropositionType === "STUDENT" && (
          <div className="list_row">
            <div className="left_row">
              <Title sm medium lHeight={21}>
                GROUP
              </Title>
            </div>
            <div className="right_row">
              <Field
                hideLabel
                type={"custom-select"}
                name={"groupId"}
                options={getGroupOptions}
                placeholder={"Select group..."}
                defaultValue={get(data, "group.values", "")}
              />
            </div>
          </div>
        )}

        <div className="list_row">
          <div className="left_row">
            <Title sm medium lHeight={21}>
              AMOUNT TO BE PAID
            </Title>
          </div>
          <div className="right_row">
            {createOrEdit ? (
              <Field
                hideLabel
                type={"input"}
                name={"amount"}
                property={{ type: "number" }}
                params={{ required: true }}
                placeholder={"Enter amount..."}
                canFocus={false}
                defaultValue={get(data, "amount", "")}
              />
            ) : (
              <Title sm medium lHeight={21}>
                {get(data, "amount", "")}
              </Title>
            )}
          </div>
        </div>

        <div className="list_row">
          <div className="left_row">
            <Title sm medium lHeight={21}>
              CURRENCY TYPE
            </Title>
          </div>
          <div className="right_row">
            {createOrEdit ? (
              <Field
                hideLabel
                type={"custom-select"}
                name={"currencyType"}
                options={currencyTypeOptions}
                placeholder={"Select month..."}
                defaultValue={get(data, "currencyType.values", "")}
              />
            ) : (
              getTitleWithoutObj(get(data, "currencyType.values", []), get(data, "currencyType.options", []))
            )}
          </div>
        </div>

        {isCreatePage && (
          <div className="list_row">
            <div className="left_row">
              <Title sm medium lHeight={21}>
                CREATED DATE
              </Title>
            </div>
            <div className="right_row">
              <Field
                hideLabel
                type={"custom-datepicker"}
                name={"deadline"}
                placeholder={"Select date..."}
                defaultValue={get(data, "createdDate", "")}
                disabled={"1"}
              />
            </div>
          </div>
        )}

        <div className="list_row">
          <div className="left_row">
            {!createOrEdit && (
              <Title sm medium lHeight={21}>
                STATUS
              </Title>
            )}
          </div>
          <div className="right_row">{!createOrEdit && getStatus(get(data, "status.values", []))}</div>
        </div>

        <div className="list_row">
          <div className="left_row"></div>
          <div className="right_row"></div>
        </div>
        {state.expensePropositionType !== "STUDENT" && (
          <div className="list_row">
            <div className="left_row"></div>
            <div className="right_row"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default withTranslation("pdp")(memo(CostInfoComponent));
