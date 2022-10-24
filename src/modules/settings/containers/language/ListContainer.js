import React, { memo } from "react";
import { get } from "lodash";
import GridView from "../../../../containers/GridView/GridView";
import FormDemo from "../../../../containers/Form/form-demo";
import { Col, Row } from "react-grid-system";
import Field from "../../../../containers/Form/field";
import Flex from "../../../../components/elements/flex";
import Button from "../../../../components/elements/button";
import Icon from "../../../../components/elements/icon";
import LanguageScheme from "../../../../schema/LanguageScheme";

const ModalBody = ({ addOrEdit, cancel, item, btnText = "Add" }) => (
  <FormDemo
    formRequest={(data) => {
      addOrEdit(get(item, "id", null), data);
    }}
  >
    <Row>
      <Col xs={12} className={"mb-15"}>
        <Field type={"input"} defaultValue={get(item, "name")} name={"name"} label={"TYPE NAME"} params={{ required: true }} />
      </Col>
      <Col xs={12} className={"mb-15"}>
        <Field type={"input"} defaultValue={get(item, "name")} name={"code"} label={"TYPE CODE"} params={{ required: true }} />
      </Col>
      <Col xs={12}>
        <Flex justify={"flex-end"} align={"center"}>
          <Field
            defaultValue={get(item, "active")}
            type={"checkbox"}
            inBtn
            name={"active"}
            label={
              <>
                {" "}
                Active <Icon icon="icon-question" className="questionIcon" />
              </>
            }
          />
          <Button outlineDanger className="cancelBtn" onCLick={cancel}>
            Cancel
          </Button>
          <Button success className="addBtn" type={"submit"}>
            {btnText}
          </Button>
        </Flex>
      </Col>
    </Row>
  </FormDemo>
);

const ListContainer = ({ ...rest }) => {
  return (
    <>
      <GridView
        url={{
          list: "auth/v1/language/list",
          one: "auth/v1/language",
          add: "auth/v1/language",
          update: "auth/v1/language",
          delete: "auth/v1/language",
        }}
        storeName="language-list"
        entityName="language"
        scheme={LanguageScheme}
        params={{}}
        disabledOnClose
        hasModal={{ create: true, update: true, delete: true }}
        ModalBody={ModalBody}
        searchFields={[
          {
            name: "Title",
            id: "1",
            type: "name",
            customField: "name",
            searchable: true,
          },
          {
            name: "Code",
            id: "2",
            type: "code",
            customField: "code",
            searchable: true,
          },
        ]}
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
                Header: "Title",
                accessor: "name",
              },
              {
                Header: "Code",
                accessor: "code",
              },
              {
                Header: "Status",
                accessor: "active",
                status: "true",
              },
              {
                Header: "Action",
                accessor: "action",
                width: 150,
              },
            ],
          },
        ]}
        row={["id", "number", "name", "code"]}
        modalTitle={"Language"}
      />
    </>
  );
};

export default memo(ListContainer);
