import React, { useEffect } from "react";
import { get, head, isEmpty } from "lodash";
import { Col, Row } from "react-grid-system";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import LimitFileSizeScheme from "schema/LimitFileSizeScheme";
import Button from "../../../../components/elements/button";
import Flex from "../../../../components/elements/flex";
import Field from "../../../../containers/Form/field";
import FormDemo from "../../../../containers/Form/form-demo";
import GridView from "../../../../containers/GridView/GridView";
import ApiActions from "../../../../services/api/actions";
import { getSelectOptionsListFromData } from "../../../../utils";

const ModalBody = ({ addOrEdit, cancel, item, btnText = "Add", limitFile, openModal }) => {
  let temp = {};
  if (isEmpty(item) && openModal) temp = { resetData: { maxMb: "" } };
  let defaultValue =
    isEmpty(item) && openModal ? head(get(item, "optionDTO.values", 0)) : head(get(item, "optionDTO.values", " "));
  return (
    <FormDemo
      {...temp}
      formRequest={(data) => {
        addOrEdit(get(item, "id", null), data);
      }}
    >
      <Row>
        <Col xs={12} className={"mb-20"}>
          <Field
            type={"custom-select"}
            defaultValue={defaultValue}
            name={"contentType"}
            label={"Select type"}
            options={limitFile}
            params={{ required: true }}
            defaultHideAnimation={false}
          />
        </Col>
        <Col xs={12} className={"mb-20"}>
          <Field
            type={"input"}
            defaultValue={get(item, "maxMb")}
            name={"maxMb"}
            label={"TYPE limit file size"}
            params={{ required: true }}
          />
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
};

const ListContainer = ({ t, getFormData, limitFile, entities, ...rest }) => {
  useEffect(() => {
    getFormData();
  }, []);

  limitFile = getSelectOptionsListFromData(get(limitFile, "result.data.optionDTO.options", []), "name", "name");

  return (
    <GridView
      url={{
        list: "attachment/v1/limit-file-size/get-all",
        one: "attachment/v1/limit-file-size/get",
        add: "attachment/v1/limit-file-size/add",
        update: "attachment/v1/limit-file-size/edit",
        delete: "attachment/v1/limit-file-size/delete",
      }}
      storeName="limit-file-size-list"
      entityName="limit-file-size"
      scheme={LimitFileSizeScheme}
      params={{}}
      hasModal={{ create: true, update: true, delete: true }}
      ModalBody={ModalBody}
      dataForModal={{
        limitFile,
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
              Header: "Content Type",
              accessor: "contentType",
            },
            {
              Header: "MaxMb",
              accessor: "maxMb",
            },
            {
              Header: "Action",
              accessor: "action",
              width: 30,
            },
          ],
        },
      ]}
      row={["id", "maxMb", "contentType"]}
      modalTitle={"LIMIT FILE SIZE"}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    entities: get(state, "normalizer.entities", {}),
    limitFile: get(state, "api.limit-file-size-form-data.data", {}),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFormData: () => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          url: "attachment/v1/limit-file-size/get/1",
          method: "get",
          storeName: "limit-file-size-form-data",
        },
      });
    },
  };
};

export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(ListContainer));
