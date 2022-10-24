import React, { memo, useEffect, useMemo, useState } from "react";
import { get, isEmpty, isNull, isNumber } from "lodash";
import { withTranslation } from "react-i18next";
import { Col, Row } from "react-grid-system";
import FormDemo from "../../../../../containers/Form/form-demo";
import Field from "../../../../../containers/Form/field";
import Flex from "../../../../../components/elements/flex";
import Button from "../../../../../components/elements/button";
import RoomScheme from "../../../../../schema/RoomScheme";
import GridView from "../../../../../containers/GridView/GridView";
import { getSelectOptionsListFromListData } from "../../../../../utils";
import { connect } from "react-redux";
import ActionsApi from "../../../../../services/api/actions";

const ModalBody = memo(({ addOrEdit, cancel, item, btnText = "Add", getAllOptions, building, getData, roomType, floor, t }) => {
  const [ids, setIds] = useState({ buildingId: "", floorId: "" });

  const roomTypeOptions = useMemo(() => getSelectOptionsListFromListData(roomType), [roomType]);

  useEffect(() => {
    if (isEmpty(floor) && !isEmpty(String(get(ids, "buildingId", "")))) {
      getData({
        url: "branch/v1/floor/get-all",
        storeName: "floor",
        cb: {
          success: (res) => {
            // let temp = get(res, "data", []);
            // if (!isEmpty(temp)) setOptions(getSelectOptionsListFromData(temp, 'id', 'name'));
          },
        },
      });
    }
    if (isEmpty(roomType) && isNumber(get(ids, "buildingId", "")) && isNumber(get(ids, "floorId", ""))) {
      getAllOptions({
        url: `branch/v1/room/get-types-and-floors/${get(ids, "buildingId", "")}`,
        storeName: "room-type",
        cb: {
          success: (res) => {
            // let temp = get(res, "data", []);
            // if (!isEmpty(temp)) setOptions(getSelectOptionsListFromData(temp, 'id', 'name'));
          },
        },
      });
    }
  }, [ids]);

  return (
    <FormDemo
      formRequest={(data) => {
        addOrEdit(get(item, "id", null), data);
      }}
    >
      <Row>
        <Col xs={12} className={"mb-15"}>
          <Field
            type={"input"}
            defaultValue={get(item, "name")}
            name={"name"}
            label={t("room_name") ?? "ROOM NAME"}
            params={{ required: true }}
          />
          <Field
            type={"input"}
            defaultValue={get(item, "count")}
            name={"count"}
            label={t("count") ?? "Count"}
            params={{ required: true }}
            property={{ type: "number" }}
          />
          <Field
            type={"custom-select"}
            defaultValue={get(item, "buildingId", " ")}
            name={"buildingId"}
            label={t("building_name") ?? "BUILDING NAME"}
            params={{ required: true }}
            options={building}
            onChange={(e) => !isNull(e) && setIds((s) => ({ ...s, buildingId: e }))}
            valueKey={"id"}
            labelKey={"name"}
          />
          <Field
            type={"custom-select"}
            defaultValue={get(item, "floorId", " ")}
            name={"floorId"}
            label={t("floor_name") ?? "FLOOR NAME"}
            params={{ required: true }}
            options={floor}
            onChange={(e) => !isNull(e) && setIds((s) => ({ ...s, floorId: e }))}
            valueKey={"id"}
            labelKey={"name"}
          />
          <Field
            type={"custom-select"}
            defaultValue={get(item, "type", " ")}
            name={"type"}
            label={t("type") ?? "Type"}
            params={{ required: true }}
            options={roomTypeOptions}
          />
        </Col>
        <Col xs={12}>
          <Flex justify={"flex-end"} align={"center"}>
            <Button outlineDanger className="cancelBtn" onCLick={cancel}>
              {t("cancel") ?? "Cancel"}
            </Button>
            <Button success className="addBtn" type={"submit"}>
              {btnText}
            </Button>
          </Flex>
        </Col>
      </Row>
    </FormDemo>
  );
});

const RoomContainer = ({ getData, building, roomType, floor, t }) => {
  useEffect(() => {
    if (isEmpty(building)) {
      getData({
        url: "branch/v1/building/get-all",
        storeName: "building",
        cb: {
          success: (res) => {},
        },
      });
    }
  }, []);
  console.log(building, roomType, floor);
  return (
    <>
      <GridView
        url={{
          list: "branch/v1/room/get-all",
          one: "branch/v1/room/get",
          add: "branch/v1/room/add",
          update: "branch/v1/room/edit",
          delete: "branch/v1/room/delete",
        }}
        storeName="room"
        entityName="room"
        scheme={RoomScheme}
        params={{}}
        hasModal={{ create: true, update: true, delete: true }}
        ModalBody={ModalBody}
        dataForModal={{
          building,
          getData,
          roomType,
          floor,
          t,
        }}
        select
        disabledOnClose
        searchFields={[
          {
            name: "name",
            id: "1",
            type: "name",
            customField: "name",
            searchable: true,
          },
          {
            name: "Type",
            id: "2",
            type: "type",
            customField: "type",
            searchable: true,
          },
          {
            name: "Floor Name",
            id: "3",
            type: "floorName",
            customField: "floorName",
            searchable: true,
          },
          {
            name: "Building Name",
            id: "4",
            type: "buildingName",
            customField: "buildingName",
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
                width: 60,
              },
              {
                Header: `${t("title") ?? "Title"}`,
                accessor: "name",
              },
              {
                Header: `${t("count") ?? "Count"}`,
                accessor: "count",
              },
              {
                Header: `${t("type") ?? "Type"}`,
                accessor: "type",
              },
              {
                Header: `${t("floor_name") ?? "Floor Name"}`,
                accessor: "floorName",
              },
              {
                Header: `${t("building_name") ?? "Building Name"}`,
                accessor: "buildingName",
              },
              {
                Header: `${t("action") ?? "Action"}`,
                accessor: "action",
              },
            ],
          },
        ]}
        row={["id", "number", "name"]}
        modalTitle={t("room") ?? "ROOM"}
      />
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    building: get(state, `api.building.data.result.data`, []),
    floor: get(state, `api.floor.data.result.data`, []),
    roomType: get(state, `api.room-type.data.result.data.typeList`, []),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: ({ storeName, url, cb }) => {
      dispatch({
        type: ActionsApi.GET_DATA.REQUEST,
        payload: { storeName, url, cb, method: "get" },
      });
    },
  };
};

export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(memo(RoomContainer)));
