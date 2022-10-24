import Modal from "components/elements/modal";
import { get } from "lodash";
import React, { memo, useEffect, useMemo, useState } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import CustomTable from "../../../../components/customTable";
import ApiActions from "../../../../services/api/actions";

const Style = styled.div`
  background: #ffffff;
  box-shadow: 0 0 10px 2px rgba(12, 12, 12, 0.03);
  border-radius: 18px;
  padding: 30px 20px 20px;
  margin-top: 24px;
  position: relative;

  .title {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #777e91;
  }
  .add_action {
    padding: 3px 10px;
    border-radius: 5px;
    background: #e2f5e9;
    color: #45b36b;
    border: 1px solid #45b36b;
  }
  .td {
    overflow: hidden;
  }
`;

const GroupsPage = ({ formData, t, getDataOfLead }) => {
  useEffect(() => {
    getDataOfLead();
  }, []);

  const history = useHistory()
  const match = useRouteMatch()
  const id = match.params.id;

  const rowClick = (item) => {
    console.log(item.id);
    history.push(`/sales/sales/lead/edit/${id}/${item.id}`)
  };

  const [open, setOpen] = useState(false);
  console.log(formData);
  let columns = useMemo(
    () => [
      {
        Header: "Name",
        clickRow: rowClick,
        columns: [
          {
            Header: "#",
            accessor: "number",
            width: 100,
          },
          {
            Header: "Specialization",
            accessor: "specialization.name",
          },

          {
            Header: "Group",
            accessor: "name",
          },
          {
            Header: "Price",
            accessor: "price",
            customColumn: ({ cell: { value } }) => {
              value = new Intl.NumberFormat("fr-FR", {
                currency: "UZS",
              }).format(value);
              return value;
            },
          },
          {
            Header: "Days",
            accessor: "weekdays",
            customColumn: ({ cell: { value } }) => {
              value = value.join();
              return value;
            },
          },
          {
            Header: "Duration",
            accessor: "lessonDurationInMonth",
            customColumn: ({ cell: { value } }) => {
              value = `${value} Month`;
              return value;
            },
          },
          {
            Header: "Lesson",
            accessor: "lessonCount",
          },
          {
            Header: "REGISTRED",
            accessor: "registeredStudentCount",
          },
          {
            Header: "TOTAL NUMBER",
            accessor: "maximumNumberOfStudents",
          },
          {
            Header: "Started Time",
            accessor: "lessonStartTime",
            customColumn: ({ cell: { value } }) => {
              value = `${new Date(value).getHours()}:${new Date(value).getMinutes()}`;
              return value;
            },
          },
          {
            Header: "End Time",
            accessor: "lessonEndTime",
            customColumn: ({ cell: { value } }) => {
              value = `${new Date(value).getHours()}:${new Date(value).getMinutes()}`;
              return value;
            },
          },
          {
            Header: "Action",
            accessor: "action_add",
            customColumn: ({ cell: { value } }) => {
              return (
                <button onClick={() => setOpen((s) => !s)} className="add_action">
                  ADD
                </button>
              );
            },
          },
          {
            Header: "Group Type",
            accessor: "groupType.name",
          },
        ],
      },
    ],
    []
  );

  return (
    <Style>
      <CustomTable columns={columns} data={formData} />
      <Modal active={open} onClose={() => setOpen((s) => !s)}>
        hello world
      </Modal>
    </Style>
  );
};
const mapStateToProps = (state) => {
  return {
    formData: get(state, "api.education-group.data.result.data", []),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDataOfLead: () => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          url: "education/v1/group",
          method: "get",
          storeName: "education-group",
        },
      });
    },
  };
};
export default withTranslation("pdp")(memo(connect(mapStateToProps, mapDispatchToProps)(GroupsPage)));
