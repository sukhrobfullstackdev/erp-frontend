import React from "react";
import { get } from "lodash";
import GridView from "../../../../containers/GridView/GridView";
import FormDemo from "../../../../containers/Form/form-demo";
import { Col, Row } from "react-grid-system";
import { connect } from "react-redux";
import Field from "../../../../containers/Form/field";
import Flex from "../../../../components/elements/flex";
import Button from "../../../../components/elements/button";
import PhoneNumberTypeScheme from "../../../../schema/PhoneNumberTypeScheme";

const ListContainer = ({ getDepartmentList, departments, entities, ...rest }) => {
  const ModalBody = ({ addOrEdit, cancel, item, btnText = "Add" }) => (
    <FormDemo
      formRequest={(data) => {
        addOrEdit(get(item, "id", null), data);
      }}
    >
      <Row>
        <Col xs={12} className={"mb-20"}>
          <Field type={"input"} defaultValue={get(item, "name")} name={"name"} label={"TYPE NAME"} params={{ required: true }} />
        </Col>
        <Col xs={12}>
          <Flex justify={"flex-end"} align={"center"}>
            <Button className="cancelBtn" outlineDanger onCLick={cancel}>
              Cancel
            </Button>
            <Button className="addBtn" success type={"submit"}>
              {btnText}
            </Button>
          </Flex>
        </Col>
      </Row>
    </FormDemo>
  );

  return (
    <>
      <GridView
        url={{
          list: "staff/v1/phone-number-type/get",
          one: "staff/v1/phone-number-type/get",
          add: "staff/v1/phone-number-type/add",
          update: "staff/v1/phone-number-type/edit",
          delete: "staff/v1/phone-number-type/delete",
        }}
        storeName="phone-number-type-list"
        entityName="phone-number-type"
        scheme={PhoneNumberTypeScheme}
        params={{}}
        disabledOnClose
        hasModal={{ create: true, update: true, delete: true }}
        ModalBody={ModalBody}
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
                Header: "Action",
                accessor: "action",
                width: 150,
              },
            ],
          },
        ]}
        row={["id", "number", "name"]}
        modalTitle={"PHONE NUMBER TYPE"}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
