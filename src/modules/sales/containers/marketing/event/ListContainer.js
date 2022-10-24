import React, { useEffect } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { get } from "lodash";
import EventScheme from "schema/EventScheme";
import EventModalBody from "../../../../../components/addEvent/addEvent";
import GridView from "../../../../../containers/GridView/GridView";
import ApiActions from "../../../../../services/api/actions";
import { formatDate } from "utils";

// const ModalBody = ({ addOrEdit, cancel, item, event, openModal }) => {
// let temp = {};
// if (isEmpty(item) && openModal) temp = { resetData: {description: "", route: "", speakers: "", photoId: ""} }
//     return (
//         <FormDemo  {...temp} formRequest={(data) => {
//             addOrEdit(get(item, 'id', null), data)
//         }}>
//         </FormDemo>
//     )
// };

const ListContainer = ({ t, getFormData, event, entities, ...rest }) => {
  useEffect(() => {
    getFormData();
  }, []);

  return (
    <GridView
      url={{
        list: "sales/v1/event/private",
        one: "sales/v1/event/private",
        add: "sales/v1/event",
        update: "sales/v1/event",
        delete: "sales/v1/event",
      }}
      storeName="event-list"
      entityName="event"
      scheme={EventScheme}
      params={{}}
      disabledOnClose
      hasModal={{ create: true, update: true, delete: true }}
      ModalBody={EventModalBody}
      dataForModal={{
        event,
      }}
      searchFields={[
        {
          name: "Event Name",
          id: "1",
          type: "title",
          customField: "title",
          searchable: true,
        },
        {
          name: "Place Name",
          id: "3",
          type: "address",
          customField: "address",
          searchable: true,
        },
        {
          name: "Price",
          id: "4",
          type: "price",
          customField: "price",
          searchable: true,
        },
        {
          name: "Route",
          id: "5",
          type: "route",
          customField: "route",
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
              Header: `${t("event_name") ?? "EVENT NAME"}`,
              accessor: "title",
            },
            {
              Header: `${t("speaker") ?? "SPEAKER"}`,
              accessor: `speakers`,
              customColumn: ({ cell }) => {
                return cell.value.map(({ fullName }) => fullName);
              },
            },
            {
              Header: `${t("date") ?? "DATE"}`,
              accessor: "date",
              customColumn: ({ cell }) => {
                return formatDate(new Date(get(cell, "value", 0)), "dd/MM/yyyy");
              },
            },
            {
              Header: `${t("place") ?? "PLACE"}`,
              accessor: "address",
            },
            {
              Header: `${t("price") ?? "PRICE"}`,
              accessor: "price",
            },
            {
              Header: `${t("route") ?? "ROUTE"}`,
              accessor: "route",
            },
            {
              Header: `${t("duration") ?? "DURATION"}`,
              accessor: "announcementTime",
              customColumn: ({ cell }) => {
                return formatDate(new Date(get(cell, "value", 0)), "dd/MM/yyyy");
              },
            },
            {
              Header: `${t("action") ?? "Action"}`,
              accessor: "action",
              width: 30,
            },
          ],
        },
      ]}
      row={["id", "title", "speakers.fullName", "date", "address", "price", "route", "announcementTime"]}
      modalTitle={t("event") ?? "EVENT"}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    entities: get(state, "normalizer.entities", {}),
    event: get(state, "api.event-form-data.data", {}),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFormData: () => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          url: "sales/v1/event/form",
          method: "get",
          storeName: "event-form-data",
        },
      });
    },
  };
};

export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(ListContainer));
