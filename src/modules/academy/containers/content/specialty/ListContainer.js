import React from "react";
import { withTranslation } from "react-i18next";
import SpecializationScheme from "../../../../../schema/SpecializationScheme";
import GridView from "../../../../../containers/GridView/GridView";
import ComponentHead from "./components/ComponentHead";
import ComponentBody from "./components/ComponentBody";

const ListContainer = ({ match, t, ...rest }) => {
  return (
    <>
      <GridView
        url={{
          list: "academic-content/v1/specialization/get-all-specialization-with-course",
          one: "staff/v1/department/get/",
          add: "staff/v1/department/add",
          update: "staff/v1/department/edit",
          delete: "academic-content/v1/specialization/delete-specialization",
        }}
        storeName="specialization-list"
        entityName="specialization"
        scheme={SpecializationScheme}
        params={{}}
        hasModal={{ create: false, update: false, delete: true }}
        redirect={{
          create: "",
          update: "/academic/academic-content/specialization/edit",
        }}
        ComponentHead={ComponentHead}
        ComponentBody={ComponentBody}
        searchFields={[
          {
            name: "Name",
            id: "1",
            type: "name",
            customField: "name",
            searchable: true,
          },
          {
            name: "Description",
            id: "2",
            type: "description",
            customField: "description",
            searchable: true,
          },
          {
            name: "Street Name",
            id: "3",
            type: "streetName",
            customField: "streetName",
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
                Header: `${t("title") ?? "Title"}`,
                accessor: "name",
              },
              {
                Header: `${t("description") ?? "Description"}`,
                accessor: "description",
              },
              {
                Header: `${t("info") ?? "Info"}`,
                accessor: "degree",
                width: 150,
                disabledByData: true,
              },
              {
                Header: `${t("status") ?? "Status"}`,
                accessor: "active",
                status: "true",
                width: 100,
              },
              {
                Header: `${t("action") ?? "Action"}`,
                accessor: "action",
                width: 100,
              },
            ],
          },
        ]}
        row={["id", "number", "name", "description", "degree"]}
        modalTitle={t("specializtion") ?? "SPECIALIZATION"}
      />
    </>
  );
};

export default withTranslation("pdp")(ListContainer);
