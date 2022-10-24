import React, { useState } from "react";
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";
import styled, { css } from "styled-components";
import { Style } from "./customFieldStyle";
import CustomFieldModal from "./customFieldModal";
import { connect } from "react-redux";
import ActionsApi from "../../../../../services/api/actions";

// const TabContextmenuStyle = styled.div`
//     .react-contextmenu {
//       min-width: 155px;
//       background: #fcfcfd;
//       border: 1px solid #e6e8ec;
//       border-radius: 4px;
//       padding: 9px 6px;
//       z-index: 99999;

//       &-item {
//         font-weight: 500;
//         font-size: 12px;
//         line-height: 18px;
//         color: #353945;
//         padding: 5px 8px;
//         transition: 0.5s ease;
//         border-radius: 2px;
//         cursor: pointer;
//         &:hover {
//           background: #f4f5f6;
//         }
//       }
//     }
//   .not-allowed {
//     cursor: not-allowed;
//   }
//   `;

const CustomField = ({ children, studentAttendanceId, id, modalRequest }) => {
  const body = (
    <>
      <CustomFieldModal
        customFieldUrl={"education/v1/student-attendance/add-custom-field"}
        getUrl={"education/v1/student-attendance/custom-fields/"}
        url={"education/v1/student-attendance/add-custom-field-value-list/"}
        ids={studentAttendanceId}
        onClose={() =>
          modalRequest({
            position: false,
            props: { onCloseDisabled: false },
            body: "",
          })
        }
      />
    </>
  );

  const handleClick = () => {
    {
      studentAttendanceId !== "" &&
        modalRequest({
          position: true,
          props: { onCloseDisabled: false, Style },
          body,
        });
    }
  };

  // let randomId = btoa(Math.random().toString()).substring(0, 16);

  return (
    <>
      <ContextMenuTrigger id={id}>{children}</ContextMenuTrigger>
      <ContextMenu id={id}>
        <MenuItem data={{ type: "close" }}>Action 1</MenuItem>
        <MenuItem data={{ type: "close other" }}>Action 2</MenuItem>
        <MenuItem data={{ type: "close all" }}>Action 2</MenuItem>
        <MenuItem data={{ type: "close left" }} className={studentAttendanceId === "" ? "not-allowed" : ""} onClick={handleClick}>
          Custom Field
        </MenuItem>
      </ContextMenu>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    modalRequest: ({ position, body, props }) => {
      dispatch({
        type: ActionsApi.GLOBAL_MODAL.REQUEST,
        payload: { position, body, props },
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(React.memo(CustomField));
