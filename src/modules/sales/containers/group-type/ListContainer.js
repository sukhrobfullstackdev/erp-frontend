import React, { memo, useEffect, useState } from "react";
import { get, isEmpty } from "lodash";
import { withTranslation } from "react-i18next";
import { Col, Row } from "react-grid-system";
import GridView from "../../../../containers/GridView/GridView";
import FormDemo from "../../../../containers/Form/form-demo";
import Field from "../../../../containers/Form/field";
import Flex from "../../../../components/elements/flex";
import Button from "../../../../components/elements/button";
import Icon from "../../../../components/elements/icon";
import GroupTypeGridScheme from "../../../../schema/GroupTypeGridScheme";

const CheckboxContainer = ({ item, t }) => {
  const [state, setState] = useState({
    support: true,
    doesSpecialTask: false,
  });
  useEffect(() => {
    setState((s) => ({
      ...s,
      doesSpecialTask: get(item, "doesSpecialTask"),
      support: !!get(item, "doesSpecialTask") || get(item, "supported"),
    }));
  }, [item]);

  return (
    <div className="checkbox__btn">
      <Field
        type={"checkbox"}
        defaultValue={get(item, "supported")}
        name={"supported"}
        label={t("there_is_support") ?? "There is support"}
        sm
        inBtn
        onChange={(value) => {
          if (value && !state.support) setState((s) => ({ ...s, support: value }));
          else if (!value && state.support)
            setState((s) => ({
              ...s,
              support: value,
              doesSpecialTask: false,
            }));
        }}
      />
      <Field
        type={"checkbox"}
        defaultValue={state.doesSpecialTask}
        name={"doesSpecialTask"}
        label={t("performs_a_special_homework") ?? "Performs a special homework"}
        sm
        inBtn
        disabled={!state.support}
        emptyWhenBeDisabled
      />
    </div>
  );
};

const ModalBody = ({ addOrEdit, cancel, item, btnText = "Add", openModal, t }) => {
  let temp = {};
  if (isEmpty(item) && openModal) temp = { resetData: { name: "", active: false } };

  return (
    <FormDemo
      {...temp}
      formRequest={(data) => {
        addOrEdit(get(item, "id", null), data);
      }}
    >
      <Row>
        <Col xs={12}>
          <Field
            type={"input"}
            name={"name"}
            defaultValue={get(item, "name")}
            label={t("enter_name") ?? "ENTER NAME"}
            params={{ required: true }}
          />
          <div className="checkbox__btn">
            <Field
              type={"checkbox"}
              defaultValue={get(item, "comingToBranch")}
              name={"comingToBranch"}
              label={t("coming_to_the_building") ?? "Coming to the building"}
              sm
              inBtn
            />
            <Field
              type={"checkbox"}
              defaultValue={get(item, "watchVideoContent")}
              name={"watchVideoContent"}
              label={t("sees_the_video") ?? "Sees the video"}
              sm
              inBtn
            />
          </div>
          <CheckboxContainer {...{ item, t }} />
        </Col>
        <Col xs={12}>
          <Flex justify={"flex-end"} align={"center"}>
            <Field
              defaultValue={get(item, "active")}
              type={"checkbox"}
              sm
              inBtn
              name={"active"}
              label={
                <>
                  {t("active") ?? "Active"} <Icon icon="icon-question" className="questionIcon" />
                </>
              }
            />
            <Button outlineDanger className="cancelBtn" onCLick={cancel}>
              {t('cancel') ?? "Cancel"}
            </Button>
            <Button success className="addBtn" type={"submit"}>
              {btnText}
            </Button>
          </Flex>
        </Col>
      </Row>
    </FormDemo>
  );
};

const ListContainer = ({ t, name, comingToBranch, watchVideoContent, supported, doesSpecialTask, entities, ...rest }) => {
  return (
    <>
      <GridView
        url={{
          list: "education/v1/group-type",
          one: "education/v1/group-type",
          add: "education/v1/group-type",
          update: "education/v1/group-type",
          delete: "education/v1/group-type",
        }}
        storeName="group-type-list"
        entityName="group-type-grid"
        scheme={GroupTypeGridScheme}
        params={{}}
        disabledOnClose
        hasModal={{ create: true, update: true, delete: true }}
        ModalBody={ModalBody}
        dataForModal={{
          t,
        }}
        columns={[
          {
            Header: "Name",
            columns: [
              {
                Header: "#",
                accessor: "number",
                width: 100,
              },
              {
                Header: `${t("title") ?? "Title"}`,
                accessor: "name",
                width: 100,
              },
              {
                Header: `${t("opportunity") ?? "Opportunity"}`,
                accessor: "features",
                width: 200,
                Cell: ({ value }) => {
                  return value.join(" / ");
                },
              },
              {
                Header: `${t("status") ?? "Status"}`,
                accessor: "active",
                status: "true",
                width: 30,
              },
              {
                Header: `${t("action") ?? "Action"}`,
                accessor: "action",
                width: 30,
              },
            ],
          },
        ]}
        row={["id", "number", "name"]}
        modalTitle={t("group_type") ?? "GROUP TYPE"}
      />
    </>
  );
};
export default withTranslation("pdp")(memo(ListContainer));
